import { FC, ReactElement } from 'react';
import { connect } from 'react-redux';
import { IPlayingCell, PlayFieldArray } from '../../../models/minesweeper';
import { IAppState } from '../../../models/storeActions';
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
        gridTemplateColumns: `repeat(${playFieldSize}, ${
          320 / playFieldSize
        }px)`,
        gridTemplateRows: `repeat(${playFieldSize}, ${320 / playFieldSize}px)`,
      }}
    >
      {playFieldProp && playFieldProp.length > 0
        ? playFieldProp.map((rowEl: IPlayingCell[], rowElId: number) =>
            rowEl.map((el: IPlayingCell, elId: number) => (
              <PlayingCell
                key={rowElId.toString() + elId.toString()}
                value={el.value}
              />
            ))
          )
        : null}
    </div>
  );

  return <>{playField}</>;
};

const mapStateToProps = (state: IAppState) => {
  return {
    playFieldProp: state.msw.playField,
    playFieldSize: state.msw.playFieldSize,
  };
};

export default connect(mapStateToProps)(PlayField);
