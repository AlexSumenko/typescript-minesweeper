import { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '../../components/common/MenuItem/MenuItem';

import { Routes } from '../../../models/minesweeper';

const HomePage: FC = (): ReactElement => {
  return (
    <>
      <Link to={Routes.GAME_BOARD}>
        <MenuItem heading="Start game" />
      </Link>
      <Link to={Routes.LEADER_BOARD}>
        <MenuItem heading="Leaderboard (in progress)" />
      </Link>
      <MenuItem heading="Language (in progress)" />
    </>
  );
};

export default HomePage;
