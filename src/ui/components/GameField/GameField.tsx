import { FC, ReactElement, useEffect } from 'react';
import { connect } from 'react-redux';
import GameCell from './GameCell/GameCell';
import MinesweeperField from '../../../utils/MinesweeperField';
import {
  CellPosition,
  GameState,
  GameStates,
  IGameCell,
  MINE,
  GameFieldArray,
} from '../../../models/minesweeper';
import {
  IAppState,
  IChangeGameStateAction,
  ISaveGameFieldToStoreAction,
} from '../../../models/store';
import {
  changeGameState,
  openMineCells,
  saveGameFieldToStore,
  setGuessedValue,
} from '../../../store/actions';
import {
  countClosedCells,
  deepCloneGameFieldArray,
  openSafeCells,
} from '../../../utils/helpers';

import './GameField.scss';

interface GameFieldProps {
  gameFieldProp: GameFieldArray;
  gameFieldSize: number;
  gameState: GameState;
  minesLeft: number;
  setGuessedValue: ([x, y]: CellPosition) => void;
  saveGameFieldToStore: (
    gameField: GameFieldArray,
    minesLeft: number
  ) => ISaveGameFieldToStoreAction;
  openMineCells: () => void;
  changeGameState: (gameState: GameState) => IChangeGameStateAction;
}

const GameField: FC<GameFieldProps | null> = ({
  gameFieldProp,
  gameFieldSize,
  gameState,
  minesLeft,
  saveGameFieldToStore,
  changeGameState,
  openMineCells,
  setGuessedValue,
}): ReactElement => {
  useEffect(() => {
    if (gameState !== GameStates.NOT_STARTED) {
      return;
    }
    const game = new MinesweeperField(gameFieldSize);
    const gameField = game.completedgameField;
    saveGameFieldToStore(gameField, 10);
  }, [gameState, gameFieldSize, saveGameFieldToStore]);

  const onCellLeftClick = ([x, y]: CellPosition): void => {
    if (gameFieldProp[x][y].value === MINE) {
      openMineCells();
      changeGameState(GameStates.LOST);
      return;
    }

    let newgameField: GameFieldArray = deepCloneGameFieldArray(gameFieldProp);

    if (gameState === GameStates.NOT_STARTED) {
      changeGameState(GameStates.IN_PROGRESS);
    }

    newgameField = openSafeCells([x, y], newgameField, gameFieldSize);
    saveGameFieldToStore(newgameField, minesLeft);

    const closedCells = countClosedCells(newgameField);

    if (closedCells === gameFieldSize) {
      changeGameState(GameStates.WON);
      openMineCells();
    }
  };

  const gameField = (
    <div
      className="game-field"
      style={{
        gridTemplateColumns: `repeat(${gameFieldSize}, ${
          320 / gameFieldSize
        }px)`,
        gridTemplateRows: `repeat(${gameFieldSize}, ${320 / gameFieldSize}px)`,
      }}
    >
      {gameFieldProp && gameFieldProp.length > 0
        ? gameFieldProp.map((rowEl: IGameCell[], rowElId: number) =>
            rowEl.map((el: IGameCell, elId: number) => (
              <GameCell
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

  return <>{gameField}</>;
};

const mapStateToProps = (state: IAppState) => {
  return {
    gameFieldProp: state.msw.gameField,
    gameFieldSize: state.msw.gameFieldSize,
    minesLeft: state.msw.minesLeft,
    gameState: state.msw.gameState,
  };
};

const dispatchStateToProps = (dispatch: any) => {
  return {
    saveGameFieldToStore: (gameField: GameFieldArray, minesLeft: number) =>
      dispatch(saveGameFieldToStore(gameField, minesLeft)),
    changeGameState: (gameState: GameState) =>
      dispatch(changeGameState(gameState)),
    openMineCells: () => dispatch(openMineCells()),
    setGuessedValue: ([x, y]: CellPosition) =>
      dispatch(setGuessedValue([x, y])),
  };
};

export default connect(mapStateToProps, dispatchStateToProps)(GameField);
