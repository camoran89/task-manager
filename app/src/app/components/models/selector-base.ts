import { InputBase } from "./input-base";
import { Object } from "./object";

export interface Selector extends InputBase {
  options?: Array<Object>
}
