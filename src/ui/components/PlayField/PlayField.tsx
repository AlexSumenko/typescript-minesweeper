import { FC, ReactElement } from 'react';
import { connect } from 'react-redux';
import { IPlayingCell, PlayFieldArray } from '../../../models/minesweeper';
import PlayingCell from '../PlayingCell/PlayingCell';

import './PlayField.scss';

interface PlayFieldProps {
  playFieldProp: PlayFieldArray;
  playFieldSize: number;
}

const PlayField: FC<PlayFieldProps | null> = ({
  playFieldProp,
  playFieldSize,
}): ReactElement => {
  const playField = (
    <div
      className="play-field"
      style={{
        gridTemplateColumns: `repeat(${playFieldSize}, auto)`,
        gridTemplateRows: `repeat(${playFieldSize}, auto)`,
      }}
    >
      {playFieldProp && playFieldProp.length > 0
        ? playFieldProp.map((rowEl: IPlayingCell[]) =>
            rowEl.map((el: IPlayingCell) => (
              <PlayingCell
                key={el.x.toString() + el.y.toString()}
                number={el.x.toString() + el.y.toString()}
              />
            ))
          )
        : null}
    </div>
  );

  return <>{playField}</>;
};

const mapStateToProps = (state: any) => {
  return {
    playFieldProp: state.msw.playField,
    playFieldSize: state.msw.playFieldSize,
  };
};

export default connect(mapStateToProps)(PlayField);
