import useTokenStore from "@/store";
import { createContext, useCallback, useEffect, useState } from "react";

const authContext = createContext();

const AuthProvider = ({ children }) => {
  const [sellerRegisterInfo, setSellerRegisterInfo] = useState(null);
  const [sellerInfo, setSellerInfo] = useState(null);
  const [sellerId, setSellerId] = useState(null);
  const [loadingState, setLoadingState] = useState(true);
  const token = useTokenStore((state) => state.token);
  const [updateState, setUpdateState] = useState(false)

  useEffect(() => {
    const getIdByToken = async () => {
      if (!token) {
        return;
      } else {
        try {
          setLoadingState(true);
          const response = await fetch(`http://localhost:8080/seller/token`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          });
          const result = await response.json();
          setSellerId(result.seller_id);
          setLoadingState(false);
        } catch (err) {
          console.error(err);
        }
      }
    };
    getIdByToken();
  }, [token]);

  useEffect(() => {
    const getSellerInfo = async () => {
      if (sellerId) {
        try {
          setLoadingState(true);
          const response = await fetch(
            `http://localhost:8080/seller/store-info/${sellerId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const result = await response.json();
          console.log(result);
          setSellerInfo(result);
        } catch (err) {
          console.error(err);
        } finally {
          setLoadingState(false);
        }
      }
    };
    getSellerInfo();
  }, [sellerId]);

  return (
    <authContext.Provider
      value={{
        sellerRegisterInfo,
        setSellerRegisterInfo,
        sellerId,
        sellerInfo,
        loadingState,
        setLoadingState,
        updateState,
        setUpdateState,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export { authContext, AuthProvider };
