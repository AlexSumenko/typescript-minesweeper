import { FC, ReactElement } from 'react';
import { connect } from 'react-redux';
import { CellPosition, PlayingCellValue } from '../../../models/minesweeper';
import { setCellOpen } from '../../../store/actions';

import './PlayingCell.scss';

interface PlayingCellProps {
  value: PlayingCellValue;
  opened: boolean;
  clicked: () => void;
}

const PlayingCell: FC<PlayingCellProps> = ({
  value,
  opened,
  clicked,
}): ReactElement => {
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
      className="playing-cell"
      style={{
        boxShadow: `${opened ? openedShadow : closedShadow}`,
        color: `${value === null ? colorMap['0'] : colorMap[value]}`,
        backgroundColor: `${opened && value === '\u2691' ? 'red' : 'white'}`,
      }}
      onClick={clicked}
    >
      <span>{opened && value}</span>
    </div>
  );
};

const dispatchStateToProps = (dispatch: any) => {
  return {
    setCellOpen: ([x, y]: CellPosition) => dispatch(setCellOpen([x, y])),
  };
};

export default connect(null, dispatchStateToProps)(PlayingCell);
