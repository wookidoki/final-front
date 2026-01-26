import { create } from "zustand";

const useModalStore = create((set) => ({
  // 현재 열린 모달들 (여러 개 동시 열림 가능)
  openModals: [],

  // 모달 열기
  openModal: (modalType, modalProps = {}) =>
    set((state) => ({
      openModals: [...state.openModals, { type: modalType, props: modalProps, id: Date.now() }],
    })),

  // 모달 닫기
  closeModal: (modalId) =>
    set((state) => ({
      openModals: state.openModals.filter((modal) => modal.id !== modalId),
    })),

  // 특정 타입의 모달 닫기
  closeModalByType: (modalType) =>
    set((state) => ({
      openModals: state.openModals.filter((modal) => modal.type !== modalType),
    })),

  // 모든 모달 닫기
  closeAllModals: () => set({ openModals: [] }),
}));

export default useModalStore;
