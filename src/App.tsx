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
          <Route path={Routes.HomePage} exact component={HomePage} />
          <Route path={Routes.GameBoard} exact component={GameBoard} />
          <Route path={Routes.LeaderBoard} exact component={LeaderBoard} />
          <Redirect to={Routes.HomePage} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
};

export default App;
