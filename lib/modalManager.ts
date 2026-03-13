import { create } from "zustand";

type ModalType = "confirm" | "success" | "error" | "info" | "loading";

type ModalState = {
  type: ModalType | null;
  props?: any;

  show: (type: ModalType, props?: any) => void;
  hide: () => void;
};

export const useModalManager = create<ModalState>((set) => ({
  type: null,
  props: undefined,

  show: (type, props) =>
    set({
      type,
      props,
    }),

  hide: () =>
    set({
      type: null,
      props: undefined,
    }),
}));
