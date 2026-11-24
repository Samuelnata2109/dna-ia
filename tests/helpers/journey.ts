import { questions } from "../../src/data/questions";
import { createSession, recordAnswer } from "../../src/engine/session";
import type { StoredJourney } from "../../src/storage/sessionStorage";

export function journeyFixture(answered = 2, complete = false): StoredJourney {
  let session = createSession("Fênix", () => 0.4);
  for (const question of questions.slice(0, answered))
    session = recordAnswer(session, question.id, question.options[0].id);
  return {
    storageVersion: 1,
    session,
    passedMilestones: Math.min(2, Math.floor(answered / 5)) as 0 | 1 | 2,
    navigation: complete
      ? { kind: "complete" }
      : { kind: "question", index: Math.min(answered, 14) },
  };
}
