import type { Profile } from "../types/quiz";

export const QUIZ_URL = "https://samuelnata2109.github.io/dna-ia/";
type ShareProfile = Pick<Profile, "codename" | "professionalName">;
type ShareServices = {
  share?: (data: ShareData) => Promise<void>;
  writeText?: (text: string) => Promise<void>;
};
export function shareMessage(profile: ShareProfile) {
  return `Descobri meu DNA tecnológico! Meu perfil é ${profile.codename} — ${profile.professionalName}. Descubra o seu também!`;
}
export async function shareResult(
  profile: ShareProfile,
  services?: ShareServices,
) {
  const text = `${shareMessage(profile)} ${QUIZ_URL}`;
  let api: ShareServices;
  try {
    api = services ?? {
      share: navigator.share?.bind(navigator),
      writeText: navigator.clipboard?.writeText?.bind(navigator.clipboard),
    };
  } catch {
    return { status: "manual" as const, text };
  }
  if (api.share) {
    try {
      await api.share({
        title: "Meu DNA:IA",
        text: shareMessage(profile),
        url: QUIZ_URL,
      });
      return { status: "shared" as const, text };
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError")
        return { status: "cancelled" as const, text };
      return { status: "manual" as const, text };
    }
  }
  if (api.writeText) {
    try {
      await api.writeText(text);
      return { status: "copied" as const, text };
    } catch {
      /* Offer selectable text below. */
    }
  }
  return { status: "manual" as const, text };
}
