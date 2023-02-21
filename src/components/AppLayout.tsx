import { PropsWithChildren } from 'react';

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="container mx-auto">
      <div className="bg-gray-100 h-screen p-10 flex flex-col gap-8">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
