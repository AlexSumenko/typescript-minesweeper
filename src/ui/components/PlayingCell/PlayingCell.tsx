import { FC, ReactElement } from 'react';

import './PlayingCell.scss';

interface PlayingCellProps {
  number: string;
}

const PlayingCell: FC<PlayingCellProps> = ({ number }): ReactElement => {
  return <div className="playing-cell">{number}</div>;
};

export default PlayingCell;
