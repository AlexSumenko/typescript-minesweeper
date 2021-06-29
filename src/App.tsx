import { FC, ReactElement } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Header from './ui/components/Header/Header';
import HomePage from './ui/containers/HomePage/HomePage';
import Footer from './ui/components/Footer/Footer';
import Leaderboard from './ui/containers/Leaderboard/Leaderboard';
import PlayingField from './ui/containers/PlayingField/PlayingField';

import './App.scss';

const App: FC = (): ReactElement => {
  return (
    <div className="app">
      <Header />
      <main>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/playing-field" exact component={PlayingField} />
          <Route path="/leaderboard" exact component={Leaderboard} />
          <Redirect to="/" />
        </Switch>
      </main>
      <Footer />
    </div>
  );
};

export default App;
