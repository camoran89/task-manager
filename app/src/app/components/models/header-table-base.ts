export interface HeaderTableBase<T> {
  column: string;
  name: string;
  cell: (value: T) => string;
}
