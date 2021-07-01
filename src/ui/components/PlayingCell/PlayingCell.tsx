import { FC, ReactElement, useState } from 'react';
import { PlayingCellValue } from '../../../models/minesweeper';

import './PlayingCell.scss';

interface PlayingCellProps {
  value: PlayingCellValue;
}

const PlayingCell: FC<PlayingCellProps> = ({ value }): ReactElement => {
  const closedShadow = 'inset -6px -8px 5px -6px #000000';
  const openedShadow = 'inset 6px 9px 5px -6px #000000';

  const [cellOpen, setCellOpen] = useState(false);

  const onCellClick = () => {
    setCellOpen(true);
  };

  return (
    <div
      className="playing-cell"
      style={{ boxShadow: `${cellOpen ? openedShadow : closedShadow}` }}
      onClick={onCellClick}
    >
      <span>{cellOpen && value}</span>
    </div>
  );
};

export default PlayingCell;
