import React, { useState, createContext, useContext } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { useAuth } from "./AuthContext";

const AppContext = createContext();

export default function AppProvider({ children }) {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [isInviteMemberVisible, setIsInviteMemberVisible] = useState(false);
  const [curRoomId, setCurRoomId] = useState(null);

  const {
    user: { uid },
  } = useAuth();

  const roomsCondition = React.useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: uid,
    };
  }, [uid]);

  const rooms = useFirestore("rooms", roomsCondition);

  const curRoom = React.useMemo(
    () => rooms.find((room) => room.id === curRoomId) || {},
    [rooms, curRoomId]
  );

  const usersCondition = React.useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: curRoom.members,
    };
  }, [curRoom.members]);

  const members = useFirestore("users", usersCondition);

  const clearState = () => {
    setCurRoomId(null);
    setIsAddRoomVisible(false);
    setIsInviteMemberVisible(false);
  };

  return (
    <AppContext.Provider
      value={{
        rooms,
        members,
        setCurRoomId,
        curRoom,
        curRoomId,
        isAddRoomVisible,
        setIsAddRoomVisible,
        isInviteMemberVisible,
        setIsInviteMemberVisible,
        clearState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
