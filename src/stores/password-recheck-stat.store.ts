import { create } from "zustand";

interface PasswordReCheckStore {
  isVerified: boolean;

  verify: () => void;
  resetVerify: () => void;
}

const useStore = create<PasswordReCheckStore>((set) => ({
  isVerified: false,

  verify: () => set ({ isVerified: true }),
  resetVerify: () => set ({ isVerified: false })
}));

export default useStore;