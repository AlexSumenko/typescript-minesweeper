import {
  CellPosition,
  GuessedCellValue,
  IGameCell,
  MINE,
  GameFieldArray,
  QUESTION_MARK,
} from '../models/minesweeper';

export const timeFormatter = (value: number): string => {
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${formattedMinutes}:${formattedSeconds}`;
};

export const deepCloneGameFieldArray = (
  gameField: GameFieldArray
): GameFieldArray => {
  return gameField.map((row: IGameCell[]): IGameCell[] =>
    row.map((rowEl: IGameCell): IGameCell => {
      return { ...rowEl };
    })
  );
};

export const openMineCells = (gameField: GameFieldArray): GameFieldArray => {
  return gameField.map((row: IGameCell[]): IGameCell[] =>
    row.map(
      (rowEl: IGameCell): IGameCell =>
        rowEl.value === MINE ? { ...rowEl, isOpened: true } : { ...rowEl }
    )
  );
};

export const countClosedCells = (gameField: GameFieldArray): number => {
  return gameField.reduce(
    (totalCount: number, row: IGameCell[]) =>
      row.reduce(
        (rowCount: number, rowEl: IGameCell) =>
          rowCount + Number(!rowEl.isOpened),
        0
      ) + totalCount,
    0
  );
};

export const handleGuessedValueChange = (
  currentValue: GuessedCellValue,
  minesLeft: number
): [GuessedCellValue, number] => {
  switch (currentValue) {
    case null:
      return [MINE, minesLeft - 1];
    case MINE:
      return [QUESTION_MARK, minesLeft];
    case QUESTION_MARK:
      return [null, minesLeft + 1];
    default:
      return [null, minesLeft];
  }
};

export const openSafeCells = (
  [x, y]: CellPosition,
  initialgameField: GameFieldArray,
  gameFieldSize: number
): GameFieldArray => {
  const gameField: GameFieldArray = deepCloneGameFieldArray(initialgameField);

  const traversegameField = ([x, y]: CellPosition): void => {
    if (gameField[x][y].isOpened) {
      return;
    }

    gameField[x][y].isOpened = true;

    if (gameField[x][y].value !== null) {
      return;
    }

    if (
      x !== 0 &&
      y !== 0 &&
      gameField[x - 1][y - 1].value !== MINE &&
      !gameField[x - 1][y - 1].isOpened
    ) {
      traversegameField([x - 1, y - 1]);
    }
    if (
      x !== 0 &&
      gameField[x - 1][y].value !== MINE &&
      !gameField[x - 1][y].isOpened
    ) {
      traversegameField([x - 1, y]);
    }
    if (
      x !== 0 &&
      y !== gameFieldSize - 1 &&
      gameField[x - 1][y + 1].value !== MINE &&
      !gameField[x - 1][y + 1].isOpened
    ) {
      traversegameField([x - 1, y + 1]);
    }
    if (
      y !== 0 &&
      gameField[x][y - 1].value !== MINE &&
      !gameField[x][y - 1].isOpened
    ) {
      traversegameField([x, y - 1]);
    }
    if (
      y !== gameFieldSize - 1 &&
      gameField[x][y + 1].value !== MINE &&
      !gameField[x][y + 1].isOpened
    ) {
      traversegameField([x, y + 1]);
    }
    if (
      x !== gameFieldSize - 1 &&
      y !== 0 &&
      gameField[x + 1][y - 1].value !== MINE &&
      !gameField[x + 1][y - 1].isOpened
    ) {
      traversegameField([x + 1, y - 1]);
    }
    if (
      x !== gameFieldSize - 1 &&
      gameField[x + 1][y].value !== MINE &&
      !gameField[x + 1][y].isOpened
    ) {
      traversegameField([x + 1, y]);
    }
    if (
      x !== gameFieldSize - 1 &&
      y !== gameFieldSize - 1 &&
      gameField[x + 1][y + 1].value !== MINE &&
      !gameField[x + 1][y + 1].isOpened
    ) {
      traversegameField([x + 1, y + 1]);
    }
  };

  traversegameField([x, y]);

  return gameField;
};
