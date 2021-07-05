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
  IChangeGameStateAction,
  ISavePlayingFieldToStoreAction,
} from '../../../models/storeActions';
import {
  changeGameState,
  openMineCells,
  savePlayingFieldToStore,
} from '../../../store/actions';
import { deepClonePlayFieldArray, openSafeCells } from '../../../utils/helpers';
import PlayingCell from '../PlayingCell/PlayingCell';

import './PlayField.scss';

interface PlayFieldProps {
  playFieldProp: PlayFieldArray;
  playFieldSize: number;
  gameState: GameState;
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
  savePlayingFieldToStore,
  changeGameState,
  openMineCells,
}): ReactElement => {
  const onCellClick = ([x, y]: CellPosition): void => {
    if (playFieldProp[x][y].value === '\u2691') {
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
    if (playFieldSize * playFieldSize - 10 === openedCells) {
      changeGameState(GameStates.WON);
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
