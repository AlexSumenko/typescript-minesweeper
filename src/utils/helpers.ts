import {
  CellPosition,
  GuessedCellValue,
  IPlayingCell,
  MINE,
  PlayFieldArray,
  QUESTION_MARK,
} from '../models/minesweeper';

export const timeFormatter = (value: number): string => {
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  return `${formattedMinutes}:${formattedSeconds}`;
};

export const deepClonePlayFieldArray = (
  playField: PlayFieldArray
): PlayFieldArray => {
  return playField.map((row: IPlayingCell[]): IPlayingCell[] =>
    row.map((rowEl: IPlayingCell): IPlayingCell => {
      return { ...rowEl };
    })
  );
};

export const openMineCells = (playField: PlayFieldArray): PlayFieldArray => {
  return playField.map((row: IPlayingCell[]): IPlayingCell[] =>
    row.map(
      (rowEl: IPlayingCell): IPlayingCell =>
        rowEl.value === MINE ? { ...rowEl, isOpened: true } : { ...rowEl }
    )
  );
};

export const countClosedCells = (playField: PlayFieldArray): number => {
  return playField.reduce(
    (totalCount: number, row: IPlayingCell[]) =>
      row.reduce(
        (rowCount: number, rowEl: IPlayingCell) =>
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
  initialPlayField: PlayFieldArray,
  playFieldSize: number
): PlayFieldArray => {
  const playField: PlayFieldArray = deepClonePlayFieldArray(initialPlayField);

  const traversePlayField = ([x, y]: CellPosition): void => {
    if (playField[x][y].isOpened) {
      return;
    }

    playField[x][y].isOpened = true;

    if (playField[x][y].value !== null) {
      return;
    }

    if (
      x !== 0 &&
      y !== 0 &&
      playField[x - 1][y - 1].value !== MINE &&
      !playField[x - 1][y - 1].isOpened
    ) {
      traversePlayField([x - 1, y - 1]);
    }
    if (
      x !== 0 &&
      playField[x - 1][y].value !== MINE &&
      !playField[x - 1][y].isOpened
    ) {
      traversePlayField([x - 1, y]);
    }
    if (
      x !== 0 &&
      y !== playFieldSize - 1 &&
      playField[x - 1][y + 1].value !== MINE &&
      !playField[x - 1][y + 1].isOpened
    ) {
      traversePlayField([x - 1, y + 1]);
    }
    if (
      y !== 0 &&
      playField[x][y - 1].value !== MINE &&
      !playField[x][y - 1].isOpened
    ) {
      traversePlayField([x, y - 1]);
    }
    if (
      y !== playFieldSize - 1 &&
      playField[x][y + 1].value !== MINE &&
      !playField[x][y + 1].isOpened
    ) {
      traversePlayField([x, y + 1]);
    }
    if (
      x !== playFieldSize - 1 &&
      y !== 0 &&
      playField[x + 1][y - 1].value !== MINE &&
      !playField[x + 1][y - 1].isOpened
    ) {
      traversePlayField([x + 1, y - 1]);
    }
    if (
      x !== playFieldSize - 1 &&
      playField[x + 1][y].value !== MINE &&
      !playField[x + 1][y].isOpened
    ) {
      traversePlayField([x + 1, y]);
    }
    if (
      x !== playFieldSize - 1 &&
      y !== playFieldSize - 1 &&
      playField[x + 1][y + 1].value !== MINE &&
      !playField[x + 1][y + 1].isOpened
    ) {
      traversePlayField([x + 1, y + 1]);
    }
  };

  traversePlayField([x, y]);

  return playField;
};
