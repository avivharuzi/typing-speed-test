import { PropsWithChildren } from 'react';

export interface GameScoreInfoProps extends PropsWithChildren {
  label: string;
}

const GameScoreInfo = ({ label, children }: GameScoreInfoProps) => {
  return (
    <div className="text-lg">
      <span>
        {label}: <span className="font-bold">{children}</span>
      </span>
    </div>
  );
};

export default GameScoreInfo;
