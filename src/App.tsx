import React, { FC } from 'react';
import Header from './ui/components/Header/Header';
import Footer from './ui/components/Footer/Footer';
import MenuItem from './ui/components/MenuItem/MenuItem';

import './App.scss';

const App: FC = () => {
  return (
    <div className="app">
      <Header />
      <div>
        <MenuItem heading="Start game" />
        <MenuItem heading="Leaderboard" />
        <MenuItem heading="Language" />
      </div>
      <Footer />
    </div>
  );
};

export default App;
