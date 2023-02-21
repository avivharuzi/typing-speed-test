const AppHeader = () => {
  return (
    <header className="flex flex-col gap-8 items-center">
      <h1 className="text-4xl text-center font-bold">Typing Speed Test</h1>
      <p className="text-lg text-center w-full lg:w-1/2">
        How fast are your fingers? Do the one-minute typing test to find out!
        Press the space bar after each word. At the end, you'll get your typing
        speed in CPM and WPM. Good luck!
      </p>
    </header>
  );
};

export default AppHeader;
