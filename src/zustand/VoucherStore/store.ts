import { create } from "zustand";

interface VoucherState {
  voucher: any;
  setVoucher: (voucher: any) => void;
  gettingVoucher: boolean;
  setGettingVoucher: (by: boolean) => void;
}

export const useVoucherStore = create<VoucherState>()((set) => ({
  voucher: null,
  setVoucher: (voucher) => set((state) => ({ voucher: voucher })),
  gettingVoucher: false,
  setGettingVoucher: (by) => set((state) => ({ gettingVoucher: by })),
}));
