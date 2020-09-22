export interface BoardElement {
  row: number;
  column: number;
  opened: boolean;
  mined: boolean;
  flagged: boolean;
  exploded: boolean;
  nearMines: number;
}
