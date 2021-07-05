import { IGameCell, MINE, GameFieldArray } from '../models/minesweeper';
import { CellPosition } from '../models/minesweeper';

class MinesweeperField {
  private gameField: GameFieldArray = [];
  private minePositions: CellPosition[] = [];
  private gameFieldSize: number;

  constructor(gameFieldSize: number) {
    this.gameFieldSize = gameFieldSize;
    this.constructGameField();
  }

  get completedGameField() {
    return this.gameField;
  }

  private constructGameField = (): void => {
    this.generateGameFieldSkeleton();
    this.generateMines();
    this.countAdjacentMines();
  };

  private generateGameFieldSkeleton = (): void => {
    for (let x = 0; x < this.gameFieldSize; x++) {
      let row: IGameCell[] = [];
      for (let y = 0; y < this.gameFieldSize; y++) {
        row.push({ value: null, isOpened: false, guessedValue: null });
      }
      this.gameField.push(row);
      row = [];
    }
  };

  private generateMines = (): void => {
    let x: number;
    let y: number;
    while (!this.isAllMinesGenerated()) {
      [x, y] = this.generateRandomPosition();
      if (!this.isExistingMinePosition([x, y])) {
        this.gameField[x][y].value = MINE;
        this.minePositions.push([x, y]);
      }
    }
  };

  private isAllMinesGenerated = (): boolean => {
    return this.minePositions.length === this.gameFieldSize ? true : false;
  };

  private isExistingMinePosition = (minePosition: CellPosition): boolean => {
    return !!this.minePositions.find(
      (minePos: CellPosition) =>
        minePos[0] === minePosition[0] && minePos[1] === minePosition[1]
    );
  };

  private generateRandomPosition = (): CellPosition => {
    return [
      Math.floor(Math.random() * this.gameFieldSize),
      Math.floor(Math.random() * this.gameFieldSize),
    ];
  };

  private countAdjacentMines = (): void => {
    for (const minePosition of this.minePositions) {
      this.incrementAdjacentCounts(minePosition);
    }
  };

  private incrementAdjacentCounts = (minePosition: CellPosition): void => {
    const [x, y]: CellPosition = minePosition;
    if (x !== 0 && y !== 0 && this.gameField[x - 1][y - 1].value !== MINE) {
      (this.gameField[x - 1][y - 1].value as number)++;
    }
    if (x !== 0 && this.gameField[x - 1][y].value !== MINE) {
      (this.gameField[x - 1][y].value as number)++;
    }
    if (
      x !== 0 &&
      y !== this.gameFieldSize - 1 &&
      this.gameField[x - 1][y + 1].value !== MINE
    ) {
      (this.gameField[x - 1][y + 1].value as number)++;
    }
    if (y !== 0 && this.gameField[x][y - 1].value !== MINE) {
      (this.gameField[x][y - 1].value as number)++;
    }
    if (
      y !== this.gameFieldSize - 1 &&
      this.gameField[x][y + 1].value !== MINE
    ) {
      (this.gameField[x][y + 1].value as number)++;
    }
    if (
      x !== this.gameFieldSize - 1 &&
      y !== 0 &&
      this.gameField[x + 1][y - 1].value !== MINE
    ) {
      (this.gameField[x + 1][y - 1].value as number)++;
    }
    if (
      x !== this.gameFieldSize - 1 &&
      this.gameField[x + 1][y].value !== MINE
    ) {
      (this.gameField[x + 1][y].value as number)++;
    }
    if (
      x !== this.gameFieldSize - 1 &&
      y !== this.gameFieldSize - 1 &&
      this.gameField[x + 1][y + 1].value !== MINE
    ) {
      (this.gameField[x + 1][y + 1].value as number)++;
    }
  };
}

export default MinesweeperField;
