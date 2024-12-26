import { create } from "zustand";

interface VoucherState {
  voucher: any;
  setVoucher: (voucher: any) => void;
  gettingVoucher: boolean;
  setGettingVoucher: (by: boolean) => void;
}

export const useVoucherStore = create<VoucherState>()((set) => ({
  voucher: null,
  setVoucher: (voucher) => set(() => ({ voucher: voucher })),
  gettingVoucher: false,
  setGettingVoucher: (by) => set(() => ({ gettingVoucher: by })),
}));
