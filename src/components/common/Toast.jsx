import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from "react-icons/fa";
import { create } from "zustand";

// Toast Store
export const useToastStore = create((set) => ({
  toasts: [],
  addToast: (toast) =>
    set((state) => ({
      toasts: [
        ...state.toasts,
        {
          id: Date.now(),
          type: "info",
          duration: 3000,
          ...toast,
        },
      ],
    })),
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));

const slideIn = keyframes`
  from {
    transform: translateX(400px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(400px);
    opacity: 0;
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
`;

const ToastItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-left: 4px solid
    ${({ $type, theme }) => {
      switch ($type) {
        case "success":
          return theme.colors.success;
        case "error":
          return theme.colors.error;
        case "warning":
          return theme.colors.warning;
        default:
          return theme.colors.primary;
      }
    }};
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  animation: ${slideIn} 0.3s ease;

  &.exit {
    animation: ${slideOut} 0.3s ease;
  }
`;

const ToastIcon = styled.div`
  font-size: 1.5rem;
  color: ${({ $type, theme }) => {
    switch ($type) {
      case "success":
        return theme.colors.success;
      case "error":
        return theme.colors.error;
      case "warning":
        return theme.colors.warning;
      default:
        return theme.colors.primary;
    }
  }};
  flex-shrink: 0;
`;

const ToastContent = styled.div`
  flex: 1;
`;

const ToastTitle = styled.div`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 4px;
`;

const ToastMessage = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textSub};
  line-height: 1.4;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 1rem;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s;
  flex-shrink: 0;

  &:hover {
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.textMain};
  }
`;

const ToastComponent = ({ toast, onClose }) => {
  useEffect(() => {
    if (toast.duration) {
      const timer = setTimeout(() => {
        onClose(toast.id);
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return <FaCheckCircle />;
      case "error":
        return <FaExclamationCircle />;
      case "warning":
        return <FaExclamationCircle />;
      default:
        return <FaInfoCircle />;
    }
  };

  return (
    <ToastItem $type={toast.type}>
      <ToastIcon $type={toast.type}>{getIcon()}</ToastIcon>
      <ToastContent>
        {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
        <ToastMessage>{toast.message}</ToastMessage>
      </ToastContent>
      <CloseButton onClick={() => onClose(toast.id)}>
        <FaTimes />
      </CloseButton>
    </ToastItem>
  );
};

export const Toast = () => {
  const { toasts, removeToast } = useToastStore();

  return (
    <ToastContainer>
      {toasts.map((toast) => (
        <ToastComponent key={toast.id} toast={toast} onClose={removeToast} />
      ))}
    </ToastContainer>
  );
};

// Helper functions
export const toast = {
  success: (message, title = "성공") =>
    useToastStore.getState().addToast({ type: "success", title, message }),
  error: (message, title = "오류") =>
    useToastStore.getState().addToast({ type: "error", title, message }),
  warning: (message, title = "경고") =>
    useToastStore.getState().addToast({ type: "warning", title, message }),
  info: (message, title = "알림") =>
    useToastStore.getState().addToast({ type: "info", title, message }),
};

export default Toast;
