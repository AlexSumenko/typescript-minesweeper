import { FC, ReactElement } from 'react';

import './GameControl.scss';

interface GameControlProps {
  value: string;
  clicked: () => void;
}

const GameControl: FC<GameControlProps> = ({
  value,
  clicked,
}): ReactElement => {
  return (
    <button className="game-board__game-control big" onClick={clicked}>
      <span>{value}</span>
    </button>
  );
};

export default GameControl;
