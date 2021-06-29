import { FC, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import MenuItem from '../../components/MenuItem/MenuItem';

const HomePage: FC = (): ReactElement => {
  return (
    <>
      <Link to="/playing-field">
        <MenuItem heading="Start game" />
      </Link>
      <Link to="/leaderboard">
        <MenuItem heading="Leaderboard" />
      </Link>
      <MenuItem heading="Language" />
    </>
  );
};

export default HomePage;
