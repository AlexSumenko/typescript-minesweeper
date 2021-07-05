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
  IOpenMineCellsAction,
  ISaveGameFieldToStoreAction,
  ISetGuessedValueAction,
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

interface gameFields {
  gameField: GameFieldArray;
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

const GameField: FC<gameFields> = ({
  gameField,
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
    const newGameField = game.completedGameField;
    saveGameFieldToStore(newGameField, 10);
  }, [gameState, gameFieldSize, saveGameFieldToStore]);

  const onCellLeftClick = ([x, y]: CellPosition): void => {
    if (gameField[x][y].value === MINE) {
      openMineCells();
      changeGameState(GameStates.LOST);
      return;
    }

    let newGameField: GameFieldArray = deepCloneGameFieldArray(gameField);

    if (gameState === GameStates.NOT_STARTED) {
      changeGameState(GameStates.IN_PROGRESS);
    }

    newGameField = openSafeCells([x, y], newGameField, gameFieldSize);
    saveGameFieldToStore(newGameField, minesLeft);

    const closedCells = countClosedCells(newGameField);

    if (closedCells === gameFieldSize) {
      changeGameState(GameStates.WON);
      openMineCells();
    }
  };

  const gameFieldElement = (
    <div
      className="game-field"
      style={{
        gridTemplateColumns: `repeat(${gameFieldSize}, ${
          320 / gameFieldSize
        }px)`,
        gridTemplateRows: `repeat(${gameFieldSize}, ${320 / gameFieldSize}px)`,
      }}
    >
      {gameField && gameField.length > 0
        ? gameField.map((rowEl: IGameCell[], rowElId: number) =>
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

  return <>{gameFieldElement}</>;
};

const mapStateToProps = (state: IAppState) => {
  return {
    gameField: state.msw.gameField,
    gameFieldSize: state.msw.gameFieldSize,
    minesLeft: state.msw.minesLeft,
    gameState: state.msw.gameState,
  };
};

const dispatchStateToProps = (dispatch: any) => {
  return {
    saveGameFieldToStore: (
      gameField: GameFieldArray,
      minesLeft: number
    ): ISaveGameFieldToStoreAction =>
      dispatch(saveGameFieldToStore(gameField, minesLeft)),
    changeGameState: (gameState: GameState): IChangeGameStateAction =>
      dispatch(changeGameState(gameState)),
    openMineCells: (): IOpenMineCellsAction => dispatch(openMineCells()),
    setGuessedValue: ([x, y]: CellPosition): ISetGuessedValueAction =>
      dispatch(setGuessedValue([x, y])),
  };
};

export default connect(mapStateToProps, dispatchStateToProps)(GameField);
