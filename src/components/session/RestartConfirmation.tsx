import { useEffect, useRef } from "react";
import { Button } from "../ui/Button";

export function RestartConfirmation({
  onConfirm,
  onCancel,
  message,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  message: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const cancel = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const previous = document.activeElement;
    const element = dialog.current!;
    element.showModal();
    cancel.current?.focus();
    return () => {
      element.close();
      if (previous instanceof HTMLElement && previous.isConnected)
        previous.focus();
    };
  }, []);
  return (
    <dialog
      ref={dialog}
      className="session-dialog"
      aria-labelledby="restart-title"
      aria-describedby="restart-description"
      onCancel={(event) => {
        event.preventDefault();
        onCancel();
      }}
    >
      <h2 id="restart-title">Começar uma nova jornada?</h2>
      <p id="restart-description">
        Seu progresso anterior será apagado deste dispositivo. Essa ação não
        pode ser desfeita.
      </p>
      <div className="session-buttons">
        <Button ref={cancel} variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button onClick={onConfirm}>APAGAR E RECOMEÇAR</Button>
      </div>
      {message && <p role="alert">{message}</p>}
    </dialog>
  );
}
