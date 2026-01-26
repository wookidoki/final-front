import React, { lazy, Suspense } from "react";
import useModalStore from "../../store/useModalStore";

// 모달 컴포넌트들 lazy loading
const NotificationModal = lazy(() => import("./NotificationModal"));
const SongDetailModal = lazy(() => import("./SongDetailModal"));
const LoginModal = lazy(() => import("./LoginModal"));
const SignupModal = lazy(() => import("./SignupModal"));
const NoticeDetailModal = lazy(() => import("./NoticeDetailModal"));
const ShortsDetailModal = lazy(() => import("./ShortsDetailModal"));
const UniverseDetailModal = lazy(() => import("./UniverseDetailModal"));

// 모달 로딩 중 fallback 컴포넌트
const ModalLoadingFallback = () => <div style={{ display: "none" }} />;

const ModalManager = () => {
  const { openModals, closeModal, closeModalByType, openModal } = useModalStore();

  const renderModal = (modal) => {
    const { type, props, id } = modal;

    const handleClose = () => closeModal(id);

    let ModalComponent = null;
    let additionalProps = {};

    switch (type) {
      case "notification":
        ModalComponent = NotificationModal;
        break;

      case "songDetail":
        ModalComponent = SongDetailModal;
        break;

      case "login":
        ModalComponent = LoginModal;
        additionalProps.onSwitchToSignup = () => {
          handleClose();
          openModal("signup");
        };
        break;

      case "signup":
        ModalComponent = SignupModal;
        additionalProps.onSwitchToLogin = () => {
          handleClose();
          openModal("login");
        };
        break;

      case "noticeDetail":
        ModalComponent = NoticeDetailModal;
        break;

      case "shortsDetail":
        ModalComponent = ShortsDetailModal;
        break;

      case "universeDetail":
        ModalComponent = UniverseDetailModal;
        break;

      default:
        return null;
    }

    return (
      <Suspense key={id} fallback={<ModalLoadingFallback />}>
        <ModalComponent onClose={handleClose} {...additionalProps} {...props} />
      </Suspense>
    );
  };

  return <>{openModals.map((modal) => renderModal(modal))}</>;
};

export default ModalManager;
