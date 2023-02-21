export interface GameResultMistake {
  text: string;
  value: string;
}

export interface GameResultMistakeListProps {
  mistakes: GameResultMistake[];
}

const GameResultMistakeList = ({ mistakes }: GameResultMistakeListProps) => {
  return (
    <ul className="list-disc">
      {mistakes.map((mistake, index) => (
        <li key={index}>
          Instead of "<b>{mistake.text}</b>", you typed "<b>{mistake.value}</b>
          ".
        </li>
      ))}
    </ul>
  );
};

export default GameResultMistakeList;
