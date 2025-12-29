import { Choice } from '../story/types';

interface ChoiceButtonProps {
  choice: Choice;
  index: number;
  onClick: () => void;
}

export const ChoiceButton = ({ choice, index, onClick }: ChoiceButtonProps) => {
  return (
    <button
      className="choice-button"
      onClick={onClick}
      data-choice-index={index}
    >
      <span className="choice-number">{index + 1}</span>
      <span className="choice-label">{choice.label}</span>
    </button>
  );
};








