import { FC, ReactElement, useEffect } from 'react';
import { connect } from 'react-redux';
import PlayingCell from './PlayingCell/PlayingCell';
import MinesweeperField from '../../../utils/MinesweeperField';
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
  setGuessedValue,
} from '../../../store/actions';
import {
  countClosedCells,
  deepClonePlayFieldArray,
  openSafeCells,
} from '../../../utils/helpers';

import './PlayField.scss';

interface PlayFieldProps {
  playFieldProp: PlayFieldArray;
  playFieldSize: number;
  gameState: GameState;
  minesLeft: number;
  setGuessedValue: ([x, y]: CellPosition) => void;
  savePlayingFieldToStore: (
    playField: PlayFieldArray,
    minesLeft: number
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
  setGuessedValue,
}): ReactElement => {
  useEffect(() => {
    if (gameState !== GameStates.NOT_STARTED) {
      return;
    }
    const game = new MinesweeperField(playFieldSize);
    const playField = game.completedPlayField;
    savePlayingFieldToStore(playField, 10);
  }, [gameState, playFieldSize, savePlayingFieldToStore]);

  const onCellLeftClick = ([x, y]: CellPosition): void => {
    if (playFieldProp[x][y].value === MINE) {
      openMineCells();
      changeGameState(GameStates.LOST);
      return;
    }

    let newPlayField: PlayFieldArray = deepClonePlayFieldArray(playFieldProp);

    if (gameState === GameStates.NOT_STARTED) {
      changeGameState(GameStates.IN_PROGRESS);
    }

    newPlayField = openSafeCells([x, y], newPlayField, playFieldSize);
    savePlayingFieldToStore(newPlayField, minesLeft);

    const closedCells = countClosedCells(newPlayField);

    if (closedCells === playFieldSize) {
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
                guessedValue={el.guessedValue}
                leftClicked={() => onCellLeftClick([rowElId, elId])}
                rightClicked={() => setGuessedValue([rowElId, elId])}
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
    savePlayingFieldToStore: (playField: PlayFieldArray, minesLeft: number) =>
      dispatch(savePlayingFieldToStore(playField, minesLeft)),
    changeGameState: (gameState: GameState) =>
      dispatch(changeGameState(gameState)),
    openMineCells: () => dispatch(openMineCells()),
    setGuessedValue: ([x, y]: CellPosition) =>
      dispatch(setGuessedValue([x, y])),
  };
};

export default connect(mapStateToProps, dispatchStateToProps)(PlayField);
