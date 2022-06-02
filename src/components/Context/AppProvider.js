import React, { useContext, useMemo, useState } from "react";

import { AuthContext } from "./AuthProvider";
import useFireStore from "../../hooks/useFireStore";

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
  const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
  const [isInviteMemberModal, setIsInviteMemberModal] = useState(false);
  const [selectorRoomID, setSelectorRoomID] = useState("");

  const {
    user: { uid },
  } = useContext(AuthContext);

  const roomlist = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: "v5BUmMVwJ4YEAsJ2FH1QFQJNH9D3",
    };
  }, []);
  console.log("first", uid);
  const rooms = useFireStore("rooms", roomlist);

  const roomCurrent = useMemo(
    () => rooms.find((room) => room.id === selectorRoomID),

    [rooms, selectorRoomID]
  );

  const userCodition = useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: roomCurrent ? roomCurrent.members : [],
    };
  }, [roomCurrent]);

  const userInRoom = useFireStore("users", userCodition);
  console.log("userInRoom", userInRoom);

  return (
    <AppContext.Provider
      value={{
        rooms,
        roomCurrent,
        userInRoom,
        isAddRoomVisible,
        setIsAddRoomVisible,
        selectorRoomID,
        setSelectorRoomID,
        isInviteMemberModal,
        setIsInviteMemberModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
