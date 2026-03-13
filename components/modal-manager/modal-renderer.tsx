import { useModalManager } from "@/lib/modalManager";
import ConfirmModal from "./modals/confirm";
import ErrorModal from "./modals/error";
import InfoModal from "./modals/info";
import LoadingModal from "./modals/loading";
import SuccessModal from "./modals/success";

export default function ModalRenderer() {
  const { type, props, hide } = useModalManager();

  return (
    <>
      <ConfirmModal
        modalState={type === "confirm"}
        setModalState={() => hide()}
        {...props}
      />
      <SuccessModal
        modalState={type === "success"}
        setModalState={() => hide()}
        {...props}
      />
      <InfoModal
        modalState={type === "info"}
        setModalState={() => hide()}
        {...props}
      />
      <ErrorModal
        modalState={type === "error"}
        setModalState={() => hide()}
        {...props}
      />
      <LoadingModal
        modalState={type === "loading"}
        setModalState={() => hide()}
        {...props}
      />
    </>
  );
}
