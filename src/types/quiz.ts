export type ProfileId =
  "builder" | "detective" | "brain" | "creator" | "maker" | "guardian";

export type LevelId = "level-01" | "level-02" | "level-03";
export type OptionLetter = "A" | "B" | "C" | "D" | "E" | "F";
export type QuestionId = `q${string}`;
export type OptionId = `${QuestionId}-${Lowercase<OptionLetter>}`;

export type Option = {
  readonly id: OptionId;
  readonly letter: OptionLetter;
  readonly text: string;
  readonly profileId: ProfileId;
};

export type Question = {
  readonly id: QuestionId;
  readonly number: number;
  readonly levelId: LevelId;
  readonly weight: 1 | 2 | 3;
  readonly prompt: string;
  readonly imageDescription: string;
  readonly options: readonly Option[];
};

export type Profile = {
  readonly id: ProfileId;
  readonly codename: string;
  readonly professionalName: string;
  readonly description: string;
  readonly traits: readonly string[];
  readonly projectExamples: readonly string[];
  readonly graphicIdentity: readonly string[];
};

export type Level = {
  readonly id: LevelId;
  readonly label: string;
  readonly firstQuestion: number;
  readonly lastQuestion: number;
  readonly weight: 1 | 2 | 3;
};

export type QuizSession = {
  readonly version: 1;
  readonly nickname: string;
  readonly answers: Readonly<Record<string, string>>;
  readonly optionOrder: Readonly<Record<string, readonly string[]>>;
};

export type ProfileScores = Record<ProfileId, number>;
