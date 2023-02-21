import { PropsWithChildren } from 'react';

const GameLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex justify-center">
      <div className="w-full lg:w-2/3">
        <div className="rounded-lg bg-white border-2">{children}</div>
      </div>
    </div>
  );
};

export default GameLayout;
