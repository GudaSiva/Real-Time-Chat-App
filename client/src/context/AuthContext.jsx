import { createContext, useState, useCallback, useMemo } from "react";
import PropTypes from 'prop-types';

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [registerInfo, setRegisterInfo] = useState({
    full_name: "",
    user_name: "",
    email: "",
    password: "",
    confirm_password: "",
    gender: "",
  });

  const updateRegisterInfo = useCallback((info) => {
    setRegisterInfo(info);
  }, []);

  const value = useMemo(() => ({
    registerInfo,
    updateRegisterInfo
  }), [registerInfo, updateRegisterInfo]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

AuthContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContextProvider };
