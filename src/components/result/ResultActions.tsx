import { useRef, useState } from "react";
import type { Profile } from "../../types/quiz";
import { shareResult } from "../../utils/shareResult";
import { Button } from "../ui/Button";

export function ResultActions({
  profile,
  onRestart,
}: {
  profile: Profile;
  onRestart: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const working = useRef(false);
  const [feedback, setFeedback] = useState("");
  const [manualText, setManualText] = useState("");
  async function share() {
    if (working.current) return;
    working.current = true;
    setBusy(true);
    setManualText("");
    try {
      const result = await shareResult(profile);
      setFeedback(
        {
          shared: "Opção de compartilhamento enviada ao seu dispositivo.",
          copied: "Mensagem copiada. Cole onde você quiser compartilhar.",
          cancelled: "Compartilhamento cancelado.",
          manual:
            "Não foi possível compartilhar ou copiar automaticamente. Selecione e copie a mensagem abaixo.",
        }[result.status],
      );
      if (result.status === "manual") setManualText(result.text);
    } finally {
      working.current = false;
      setBusy(false);
    }
  }
  return (
    <section className="result-actions" aria-labelledby="result-actions-title">
      <h2 id="result-actions-title">Sua descoberta continua</h2>
      <div className="session-buttons">
        <Button onClick={() => void share()} disabled={busy} aria-busy={busy}>
          COMPARTILHAR RESULTADO
        </Button>
        <Button variant="secondary" onClick={onRestart} disabled={busy}>
          REFAZER QUIZ
        </Button>
      </div>
      <p role="status">{feedback}</p>
      {manualText && (
        <label className="share-manual">
          Mensagem pública
          <textarea
            readOnly
            value={manualText}
            onFocus={(event) => event.currentTarget.select()}
            rows={5}
          />
        </label>
      )}
    </section>
  );
}
