import AppHeader from './components/AppHeader';
import AppLayout from './components/AppLayout';
import Game from './components/Game';

const App = () => {
  return (
    <AppLayout>
      <AppHeader />
      <Game />
    </AppLayout>
  );
};

export default App;
