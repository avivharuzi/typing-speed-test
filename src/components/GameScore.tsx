import Button from './Button';
import GameScoreInfo from './GameScoreInfo';

export interface GameScoreProps {
  timeLeft: number;
  onRestart: () => void;
}

const GameScore = ({ timeLeft, onRestart }: GameScoreProps) => {
  return (
    <div className="border-b-2 p-3">
      <div className="flex justify-center items-center gap-4">
        <GameScoreInfo label="Time left">{timeLeft}</GameScoreInfo>
        <Button onClick={onRestart}>Restart</Button>
      </div>
    </div>
  );
};

export default GameScore;
