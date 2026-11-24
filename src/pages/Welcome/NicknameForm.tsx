import { useCallback, useRef, useState } from "react";
import type { FormEvent } from "react";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { nicknameLimit, validateNickname } from "../../utils/nickname";

type NicknameFormProps = {
  initialNickname: string;
  onStart: (nickname: string) => void;
  focusOnMount?: boolean;
};

export function NicknameForm({
  initialNickname,
  onStart,
  focusOnMount = false,
}: NicknameFormProps) {
  const [input, setInput] = useState(initialNickname);
  const [touched, setTouched] = useState(false);
  const started = useRef(false);
  const fieldRef = useCallback(
    (field: HTMLInputElement | null) => {
      if (initialNickname || focusOnMount)
        field?.focus({ preventScroll: true });
    },
    [initialNickname, focusOnMount],
  );
  const { nickname, length, error } = validateNickname(input);
  const visibleError = touched || length > nicknameLimit ? error : undefined;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setTouched(true);
    if (error || started.current) return;
    started.current = true;
    onStart(nickname);
  }

  return (
    <form className="welcome-entry" onSubmit={handleSubmit} noValidate>
      <Input
        ref={fieldRef}
        label="Seu nickname"
        name="nickname"
        placeholder="Ex.: Pixel ou Lú"
        value={input}
        autoComplete="off"
        autoCapitalize="none"
        spellCheck={false}
        enterKeyHint="go"
        required
        onChange={(event) => setInput(event.currentTarget.value)}
        onBlur={() => {
          setTouched(true);
          setInput(nickname);
        }}
        hint={`Até ${nicknameLimit} caracteres. Use um apelido.`}
        error={visibleError}
      />
      <span className="welcome-sr-only" role="status">
        {visibleError}
      </span>
      <Button
        className="welcome-start"
        type="submit"
        size="lg"
        disabled={Boolean(error)}
      >
        START <span aria-hidden="true" className="welcome-arrow" />
      </Button>
    </form>
  );
}
