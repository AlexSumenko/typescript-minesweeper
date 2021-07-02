import { FC, ReactElement } from 'react';
import { connect } from 'react-redux';
import {
  CellPosition,
  GameState,
  GameStates,
  IPlayingCell,
  PlayFieldArray,
} from '../../../models/minesweeper';
import {
  IAppState,
  ISetCellOpenAction,
  IChangeGameStateAction,
} from '../../../models/storeActions';
import { setCellOpen, changeGameState } from '../../../store/actions';
import PlayingCell from '../PlayingCell/PlayingCell';

import './PlayField.scss';

interface PlayFieldProps {
  playFieldProp: PlayFieldArray;
  playFieldSize: number;
  gameState: GameState;
  setCellOpen: ([x, y]: CellPosition) => ISetCellOpenAction;
  startGame: (gameState: GameState) => IChangeGameStateAction;
}

const PlayField: FC<PlayFieldProps | null> = ({
  playFieldProp,
  playFieldSize,
  gameState,
  setCellOpen,
  startGame,
}): ReactElement => {
  const onCellClick = ([x, y]: CellPosition): void => {
    if (
      gameState === GameStates.NOT_STARTED ||
      gameState === GameStates.PAUSED
    ) {
      startGame(GameStates.IN_PROGRESS);
    }
    openSafeCells([x, y]);
  };

  const openSafeCells = ([x, y]: CellPosition): void => {
    console.log([x, y]);
    if (playFieldProp[x][y].isOpened) {
      return;
    }
    setCellOpen([x, y]);
    if (playFieldProp[x][y].value !== null) {
      return;
    }
    if (
      x !== 0 &&
      y !== 0 &&
      playFieldProp[x - 1][y - 1].value !== 'mine' &&
      !playFieldProp[x - 1][y - 1].value
    ) {
      // setCellOpen([x - 1, y - 1]);
      openSafeCells([x - 1, y - 1]);
    }
    // if (
    //   x !== 0 &&
    //   playFieldProp[x - 1][y].value !== 'mine' &&
    //   !playFieldProp[x - 1][y].value
    // ) {
    //   // setCellOpen([x - 1, y]);
    //   openSafeCells([x - 1, y]);
    // }
    // if (
    //   x !== 0 &&
    //   y !== playFieldSize - 1 &&
    //   playFieldProp[x - 1][y + 1].value !== 'mine' &&
    //   !playFieldProp[x - 1][y + 1].value
    // ) {
    //   // setCellOpen([x - 1, y + 1]);
    //   openSafeCells([x - 1, y + 1]);
    // }
    // if (
    //   y !== 0 &&
    //   playFieldProp[x][y - 1].value !== 'mine' &&
    //   !playFieldProp[x][y - 1].value
    // ) {
    //   // setCellOpen([x, y - 1]);
    //   openSafeCells([x, y - 1]);
    // }
    // if (
    //   y !== playFieldSize - 1 &&
    //   playFieldProp[x][y + 1].value !== 'mine' &&
    //   !playFieldProp[x][y + 1].value
    // ) {
    //   // setCellOpen([x, y + 1]);
    //   openSafeCells([x, y + 1]);
    // }
    // if (
    //   x !== playFieldSize - 1 &&
    //   y !== 0 &&
    //   playFieldProp[x + 1][y - 1].value !== 'mine' &&
    //   !playFieldProp[x + 1][y - 1].value
    // ) {
    //   // setCellOpen([x + 1, y - 1]);
    //   openSafeCells([x + 1, y - 1]);
    // }
    // if (
    //   x !== playFieldSize - 1 &&
    //   playFieldProp[x + 1][y].value !== 'mine' &&
    //   !playFieldProp[x + 1][y].value
    // ) {
    //   // setCellOpen([x + 1, y]);
    //   openSafeCells([x + 1, y]);
    // }
    // if (
    //   x !== playFieldSize - 1 &&
    //   y !== playFieldSize - 1 &&
    //   playFieldProp[x + 1][y + 1].value !== 'mine' &&
    //   !playFieldProp[x + 1][y + 1].value
    // ) {
    //   // setCellOpen([x + 1, y + 1]);
    //   openSafeCells([x + 1, y + 1]);
    // }
  };

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
                opened={el.isOpened}
                clicked={() => onCellClick([rowElId, elId])}
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
    gameState: state.msw.gameState,
  };
};

const dispatchStateToProps = (dispatch: any) => {
  return {
    setCellOpen: ([x, y]: CellPosition) => dispatch(setCellOpen([x, y])),
    startGame: (gameState: GameStates) => dispatch(changeGameState(gameState)),
  };
};

export default connect(mapStateToProps, dispatchStateToProps)(PlayField);
