import { createContext, useEffect, useState } from "react";

const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [sellerRegisterInfo, setSellerRegisterInfo] = useState(null);

  return (
    <authContext.Provider value={{ sellerRegisterInfo, setSellerRegisterInfo }}>
      {children}
    </authContext.Provider>
  );
};

export { authContext, AuthProvider };
