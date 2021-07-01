import { IPlayingCell, PlayFieldArray } from './minesweeper';

type MinePosition = [number, number];

class MinesweeperField {
  public playField: PlayFieldArray = [];
  private minePositions: MinePosition[] = [];
  private playFieldSize: number;

  constructor(playFieldSize: number) {
    this.playFieldSize = playFieldSize;
    this.constructPlayField();
  }

  private constructPlayField = (): void => {
    this.generatePlayingFieldSkeleton();
    this.generateMines();
    this.countAdjacentMines();
  };

  private generatePlayingFieldSkeleton = (): void => {
    for (let x = 0; x < this.playFieldSize; x++) {
      let row: IPlayingCell[] = [];
      for (let y = 0; y < this.playFieldSize; y++) {
        row.push({ value: null, isOpened: false });
      }
      this.playField.push(row);
      row = [];
    }
  };

  private generateMines = (): void => {
    let x: number;
    let y: number;
    while (!this.isAllMinesGenerated()) {
      [x, y] = this.generateRandomPosition();
      if (!this.isExistingMinePosition([x, y])) {
        this.playField[x][y].value = 'mine';
        this.minePositions.push([x, y]);
      }
    }
  };

  private isAllMinesGenerated = (): boolean => {
    return this.minePositions.length === this.playFieldSize ? true : false;
  };

  private isExistingMinePosition = (minePosition: MinePosition): boolean => {
    return !!this.minePositions.find(
      (minePos: MinePosition) =>
        minePos[0] === minePosition[0] && minePos[1] === minePosition[1]
    );
  };

  private generateRandomPosition = (): MinePosition => {
    return [
      Math.floor(Math.random() * this.playFieldSize),
      Math.floor(Math.random() * this.playFieldSize),
    ];
  };

  private countAdjacentMines = (): void => {
    for (const minePosition of this.minePositions) {
      this.incrementAdjacentCounts(minePosition);
    }
  };

  private incrementAdjacentCounts = (minePosition: MinePosition): void => {
    const [x, y]: MinePosition = minePosition;
    if (x !== 0 && y !== 0 && this.playField[x - 1][y - 1].value !== 'mine') {
      (this.playField[x - 1][y - 1].value as number)++;
    }
    if (x !== 0 && this.playField[x - 1][y].value !== 'mine') {
      (this.playField[x - 1][y].value as number)++;
    }
    if (
      x !== 0 &&
      y !== this.playFieldSize - 1 &&
      this.playField[x - 1][y + 1].value !== 'mine'
    ) {
      (this.playField[x - 1][y + 1].value as number)++;
    }
    if (y !== 0 && this.playField[x][y - 1].value !== 'mine') {
      (this.playField[x][y - 1].value as number)++;
    }
    if (
      y !== this.playFieldSize - 1 &&
      this.playField[x][y + 1].value !== 'mine'
    ) {
      (this.playField[x][y + 1].value as number)++;
    }
    if (
      x !== this.playFieldSize - 1 &&
      y !== 0 &&
      this.playField[x + 1][y - 1].value !== 'mine'
    ) {
      (this.playField[x + 1][y - 1].value as number)++;
    }
    if (
      x !== this.playFieldSize - 1 &&
      this.playField[x + 1][y].value !== 'mine'
    ) {
      (this.playField[x + 1][y].value as number)++;
    }
    if (
      x !== this.playFieldSize - 1 &&
      y !== this.playFieldSize - 1 &&
      this.playField[x + 1][y + 1].value !== 'mine'
    ) {
      (this.playField[x + 1][y + 1].value as number)++;
    }
  };
}

export default MinesweeperField;