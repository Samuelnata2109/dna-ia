export const nicknameLimit = 24;

const segmenter = new Intl.Segmenter("pt-BR", { granularity: "grapheme" });

export function validateNickname(input: string) {
  const nickname = input.trim();
  const length = Array.from(segmenter.segment(nickname)).length;

  const error =
    length === 0
      ? "Escolha um nickname para começar."
      : length > nicknameLimit
        ? `Use até ${nicknameLimit} caracteres no nickname.`
        : undefined;

  return { nickname, length, error };
}
