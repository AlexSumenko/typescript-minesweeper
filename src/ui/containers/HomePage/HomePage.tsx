import { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '../../components/MenuItem/MenuItem';

import { Routes } from '../../../models/minesweeper';

const HomePage: FC = (): ReactElement => {
  return (
    <>
      <Link to={Routes.GameBoard}>
        <MenuItem heading="Start game" />
      </Link>
      <Link to={Routes.LeaderBoard}>
        <MenuItem heading="Leaderboard" />
      </Link>
      <MenuItem heading="Language" />
    </>
  );
};

export default HomePage;
