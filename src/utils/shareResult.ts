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
  const message = shareMessage(profile);
  const text = `${message} ${QUIZ_URL}`;
  try {
    const share = services ? services.share : navigator.share?.bind(navigator);
    if (share) {
      await share({ title: "Meu DNA:IA", text: message, url: QUIZ_URL });
      return { status: "shared" as const, text };
    }
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      return { status: "cancelled" as const, text };
    }
  }
  try {
    const clipboard = services ? undefined : navigator.clipboard;
    const writeText = services
      ? services.writeText
      : clipboard?.writeText?.bind(clipboard);
    if (writeText) {
      await writeText(text);
      return { status: "copied" as const, text };
    }
  } catch {
    // The browser can deny clipboard access after native sharing fails.
  }
  return { status: "manual" as const, text };
}
