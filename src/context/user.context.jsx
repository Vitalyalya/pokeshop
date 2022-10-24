import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../components/utils/firebase.util";

export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
  timePassed: false,
  setTimePassed: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [timePassed, setTimePassed] = useState(false);
  const value = { currentUser, setCurrentUser, timePassed, setTimePassed };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
