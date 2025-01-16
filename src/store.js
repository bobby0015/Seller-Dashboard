import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useTokenStore = create(
  devtools((set) => ({
    token: "",
    setToken: (data) => set(() => ({ token: data })),
  }))
);

export default useTokenStore;