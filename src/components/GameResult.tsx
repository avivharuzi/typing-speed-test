import GameResultMistakeList, {
  GameResultMistake,
} from './GameResultMistakeList';

export interface GameResultProps {
  cpm: number;
  wpm: number;
  overallCPM: number;
  mistakes: GameResultMistake[];
  totalWords: number;
}

const GameResult = ({
  cpm,
  wpm,
  overallCPM,
  mistakes,
  totalWords,
}: GameResultProps) => {
  return (
    <div className="p-8 flex flex-col items-center gap-8 text-xl text-gray-700">
      <h2 className="text-2xl">
        Your score: <b>{cpm}</b> CPM (that is <b>{wpm}</b> WPM)
      </h2>
      <p className="text-center">
        In reality, you typed <b>{overallCPM}</b> CPM, but you made{' '}
        <b>{mistakes.length}</b> mistakes (out of <b>{totalWords}</b> words),
        which were not counted in the corrected scores.
      </p>
      <p>Your mistakes were:</p>
      <GameResultMistakeList mistakes={mistakes} />
    </div>
  );
};

export default GameResult;
