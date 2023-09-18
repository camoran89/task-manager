import { ButtonBase } from "./button-base";

export interface Modalbase {
  header?: string;
  body: string;
  footer?: string;
  controls?: Array<ButtonBase>;
}
