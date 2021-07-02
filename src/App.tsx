import { FC, ReactElement } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './ui/components/Header/Header';
import HomePage from './ui/containers/HomePage/HomePage';
import Footer from './ui/components/Footer/Footer';
import LeaderBoard from './ui/containers/LeaderboardPage/LeaderboardPage';
import GameBoard from './ui/containers/GameBoardPage/GameBoardPage';

import { Routes } from './models/minesweeper';
import './App.scss';

const App: FC = (): ReactElement => {
  return (
    <div className="app">
      <Header />
      <main>
        <Switch>
          <Route path={Routes.HOME_PAGE} exact component={HomePage} />
          <Route path={Routes.GAME_BOARD} exact component={GameBoard} />
          <Route path={Routes.LEADER_BOARD} exact component={LeaderBoard} />
          <Redirect to={Routes.HOME_PAGE} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
};

export default App;
