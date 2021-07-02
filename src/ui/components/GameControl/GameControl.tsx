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
    <button className="game-board__game-control" onClick={clicked}>
      <span className="game-board__game-control__play-pause">{value}</span>
    </button>
  );
};

export default GameControl;
