import { FC, ReactElement, useEffect, useRef } from 'react';
import {
  GuessedCellValue,
  MINE,
  GameCellValue,
} from '../../../../models/minesweeper';

import './GameCell.scss';

interface GameCellProps {
  value: GameCellValue;
  guessedValue: GuessedCellValue;
  opened: boolean;
  leftClicked: () => void;
  rightClicked: () => void;
}

const GameCell: FC<GameCellProps> = ({
  value,
  guessedValue,
  opened,
  leftClicked,
  rightClicked,
}): ReactElement => {
  const cellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cellRef && cellRef.current) {
      const currentValue = cellRef.current;
      currentValue.addEventListener('contextmenu', onContextMenu);
      return () => {
        currentValue.removeEventListener('contextmenu', onContextMenu);
      };
    }
  });

  const onContextMenu = (e: Event): void => {
    e.preventDefault();
    if (opened) {
      return;
    }
    rightClicked();
  };

  const closedShadow = 'inset -6px -8px 5px -6px #000000';
  const openedShadow = 'inset 6px 9px 5px -6px #000000';
  const colorMap = {
    0: 'white',
    1: 'blue',
    2: 'green',
    3: 'red',
    4: 'purple',
    5: 'orange',
    6: 'brown',
    7: 'grey',
    8: 'darkred',
    '\u2691': 'black',
  };

  return (
    <div
      className="game-cell"
      style={{
        boxShadow: `${opened ? openedShadow : closedShadow}`,
        backgroundColor: `${opened && value === MINE ? 'red' : 'white'}`,
      }}
      onClick={leftClicked}
      ref={cellRef}
    >
      {opened ? (
        <span
          style={{
            color: `${value === null ? colorMap['0'] : colorMap[value]}`,
          }}
        >
          {value}
        </span>
      ) : (
        <span>{guessedValue}</span>
      )}
    </div>
  );
};

export default GameCell;
