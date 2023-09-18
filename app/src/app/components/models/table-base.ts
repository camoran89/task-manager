import { ButtonBase } from "./button-base";
import { HeaderTableBase } from "./header-table-base";
import { InputBase } from "./input-base";

export interface TableBase<T> extends InputBase {
  header: Array<HeaderTableBase<T>>;
  rows: Array<T>;
  rowControls: Array<ButtonBase>;
}