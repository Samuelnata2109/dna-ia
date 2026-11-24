import type { Level } from "../types/quiz";

export const levels = [
  {
    id: "level-01",
    label: "Explore",
    firstQuestion: 1,
    lastQuestion: 5,
    weight: 1,
  },
  {
    id: "level-02",
    label: "Challenge",
    firstQuestion: 6,
    lastQuestion: 10,
    weight: 2,
  },
  {
    id: "level-03",
    label: "Identity",
    firstQuestion: 11,
    lastQuestion: 15,
    weight: 3,
  },
] as const satisfies readonly Level[];
