import { IPlayingCell, PlayFieldArray } from '../models/minesweeper';

export const generatePlayingFieldSkeleton = (
  fieldSize: number
): PlayFieldArray => {
  const playField: PlayFieldArray = [];

  for (let x = 0; x < fieldSize; x++) {
    let row: IPlayingCell[] = [];
    for (let y = 0; y < fieldSize; y++) {
      row.push({ x, y, value: null, isOpened: false });
    }
    playField.push(row);
    row = [];
  }

  return playField;
};
