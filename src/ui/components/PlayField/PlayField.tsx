import { FC, ReactElement, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  CellPosition,
  GameState,
  GameStates,
  IPlayingCell,
  MINE,
  PlayFieldArray,
} from '../../../models/minesweeper';
import {
  IAppState,
  IChangeGameStateAction,
  ISavePlayingFieldToStoreAction,
} from '../../../models/store';
import {
  changeGameState,
  openMineCells,
  savePlayingFieldToStore,
} from '../../../store/actions';
import { deepClonePlayFieldArray, openSafeCells } from '../../../utils/helpers';
import MinesweeperField from '../../../utils/MinesweeperField';
import PlayingCell from './PlayingCell/PlayingCell';

import './PlayField.scss';

interface PlayFieldProps {
  playFieldProp: PlayFieldArray;
  playFieldSize: number;
  gameState: GameState;
  minesLeft: number;
  savePlayingFieldToStore: (
    playField: PlayFieldArray
  ) => ISavePlayingFieldToStoreAction;
  openMineCells: () => void;
  changeGameState: (gameState: GameState) => IChangeGameStateAction;
}

const PlayField: FC<PlayFieldProps | null> = ({
  playFieldProp,
  playFieldSize,
  gameState,
  minesLeft,
  savePlayingFieldToStore,
  changeGameState,
  openMineCells,
}): ReactElement => {
  useEffect(() => {
    if (gameState !== GameStates.NOT_STARTED) {
      return;
    }
    const game = new MinesweeperField(playFieldSize);
    const playField = game.completedPlayField;
    savePlayingFieldToStore(playField);
  }, [gameState, playFieldSize, savePlayingFieldToStore]);

  const onCellClick = ([x, y]: CellPosition): void => {
    if (playFieldProp[x][y].value === MINE) {
      openMineCells();
      changeGameState(GameStates.LOST);
      return;
    }

    let newPlayField: PlayFieldArray = deepClonePlayFieldArray(playFieldProp);
    if (
      gameState === GameStates.NOT_STARTED ||
      gameState === GameStates.PAUSED
    ) {
      changeGameState(GameStates.IN_PROGRESS);
    }
    newPlayField = openSafeCells([x, y], newPlayField, playFieldSize);
    savePlayingFieldToStore(newPlayField);

    const openedCells = newPlayField.reduce(
      (totalCount: number, row: IPlayingCell[]) =>
        row.reduce(
          (rowCount: number, rowEl: IPlayingCell) =>
            rowCount + Number(rowEl.isOpened),
          0
        ) + totalCount,
      0
    );
    if (playFieldSize * playFieldSize - minesLeft === openedCells) {
      changeGameState(GameStates.WON);
      openMineCells();
    }
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
    minesLeft: state.msw.minesLeft,
    gameState: state.msw.gameState,
  };
};

const dispatchStateToProps = (dispatch: any) => {
  return {
    savePlayingFieldToStore: (playField: PlayFieldArray) =>
      dispatch(savePlayingFieldToStore(playField)),
    changeGameState: (gameState: GameState) =>
      dispatch(changeGameState(gameState)),
    openMineCells: () => dispatch(openMineCells()),
  };
};

export default connect(mapStateToProps, dispatchStateToProps)(PlayField);
