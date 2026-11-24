import type { Option, Question } from "../../types/quiz";

export function QuestionCard({
  question,
  options,
  selectedId,
  onSelect,
}: {
  question: Question;
  options: readonly Option[];
  selectedId?: string;
  onSelect: (optionId: string) => void;
}) {
  const imageNumber = String(question.number).padStart(2, "0");
  return (
    <>
      <figure className="quiz-image">
        <img
          src={`${import.meta.env.BASE_URL}images/questions/question-${imageNumber}.webp`}
          width="1280"
          height="720"
          alt={question.imageDescription}
          loading={question.number === 1 ? "eager" : "lazy"}
          decoding="async"
        />
        <figcaption>ARQUIVO VISUAL / {imageNumber}</figcaption>
      </figure>
      <fieldset className="quiz-options">
        <legend>Escolha a opção que mais combina com você</legend>
        <div className="quiz-options__grid">
          {options.map((option, index) => (
            <label
              className="quiz-option"
              key={option.id}
              data-selected={selectedId === option.id}
            >
              <input
                type="radio"
                name={`answer-${question.id}`}
                value={option.id}
                checked={selectedId === option.id}
                onChange={() => onSelect(option.id)}
              />
              <span className="quiz-option__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="quiz-option__text">{option.text}</span>
              <span className="quiz-option__mark" aria-hidden="true">
                {selectedId === option.id ? "✓" : "+"}
              </span>
            </label>
          ))}
        </div>
      </fieldset>
    </>
  );
}
