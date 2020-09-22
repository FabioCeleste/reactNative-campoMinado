import {BoardElement} from './types';

function createBoard(rows: number, columns: number): BoardElement[][] {
  return Array(rows)
    .fill(0)
    .map((_, row) => {
      return Array(columns)
        .fill(0)
        .map((__, column) => {
          return {
            row,
            column,
            opened: false,
            mined: false,
            flagged: false,
            exploded: false,
            nearMines: 0,
          };
        });
    });
}

const spreadMines = (board: BoardElement[][], minesAmount: number) => {
  const rows = board.length;
  const columns = board[0].length;
  let minesPlanted = 0;
  while (minesPlanted < minesAmount) {
    const rowSel = parseInt((Math.random() * rows).toString(), 10);
    const columnSel = parseInt((Math.random() * columns).toString(), 10);

    if (!board[rowSel][columnSel].mined) {
      board[rowSel][columnSel].mined = true;
      minesPlanted++;
    }
  }
};

function createMinedBoard(rows: number, columns: number, minesAmount: number) {
  const board = createBoard(rows, columns);
  spreadMines(board, minesAmount);
  return board;
}

export function cloneBoard(board: BoardElement[][]) {
  return board.map((rows) => {
    return rows.map((field) => {
      return {...field};
    });
  });
}

export function getNeighbors(
  board: BoardElement[][],
  row: number,
  column: number,
) {
  const neighbors: BoardElement[] = [];
  const rows = [row - 1, row, row + 1];
  const columns = [column - 1, column, column + 1];
  rows.forEach((r) => {
    columns.forEach((c) => {
      const diferent = r !== row || c !== column;
      const validRow = r >= 0 && r < board.length;
      const validColumn = c >= 0 && c < board[0].length;
      if (diferent && validRow && validColumn) {
        neighbors.push(board[r][c]);
      }
    });
  });
  return neighbors;
}

export function safeNeighbors(
  board: BoardElement[][],
  row: number,
  column: number,
) {
  const safes = (result, neighbor: BoardElement) => result && !neighbor.mined;
  return getNeighbors(board, row, column).reduce(safes, true);
}

export function openField(
  board: BoardElement[][],
  row: number,
  column: number,
) {
  const field = board[row][column];
  if (!field.opened) {
    field.opened = true;
    if (field.mined) {
      field.exploded = true;
    } else if (safeNeighbors(board, row, column)) {
      getNeighbors(board, row, column).forEach((n) =>
        openField(board, n.row, n.column),
      );
    } else {
      const neighbors = getNeighbors(board, row, column);
      field.nearMines = neighbors.filter((n) => n.mined).length;
    }
  }
}

export function invertFlag(
  board: BoardElement[][],
  row: number,
  column: number,
) {
  const field = board[row][column];
  field.flagged = !field.flagged;
}

export function fields(board) {
  return [].concat(...board);
}
export function hadExplosion(board: BoardElement[][]) {
  return fields(board).filter((field) => field.exploded).length > 0;
}
const pendding = (field: BoardElement) =>
  (field.mined && !field.flagged) || (!field.mined && !field.opened);
export function wonGame(board: BoardElement[][]) {
  return fields(board).filter(pendding).length === 0;
}
export function showMines(board: BoardElement[][]) {
  fields(board)
    .filter((field) => field.mined)
    .forEach((field) => (field.opened = true));
}
export function flagUsed(board: BoardElement[][]) {
  return fields(board).filter((field) => field.flagged).length;
}

export default createMinedBoard;
