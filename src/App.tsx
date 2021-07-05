import { FC, ReactElement } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './ui/components/common/Header/Header';
import HomePage from './ui/containers/HomePage/HomePage';
import Footer from './ui/components/common/Footer/Footer';
import LeaderBoardPage from './ui/containers/LeaderboardPage/LeaderboardPage';
import GameBoardPage from './ui/containers/GameBoardPage/GameBoardPage';
import { Routes } from './models/minesweeper';

import './App.scss';

const App: FC = (): ReactElement => {
  return (
    <div className="app">
      <Header />
      <main>
        <Switch>
          <Route path={Routes.HOME_PAGE} exact component={HomePage} />
          <Route path={Routes.GAME_BOARD} exact component={GameBoardPage} />
          <Route path={Routes.LEADER_BOARD} exact component={LeaderBoardPage} />
          <Redirect to={Routes.HOME_PAGE} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
};

export default App;
