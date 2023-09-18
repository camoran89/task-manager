import * as moment from 'moment';

export class Utils {
  public static containsNumbers(str: string): boolean {
    return /\d/.test(str);
  }

  public static hasPhoneSpecialCharacter(str: string): boolean {
    return /[- ]/.test(str);
  }

  public static hasLowercase(str: string): boolean {
    return str.toUpperCase() !== str;
  }

  public static hasUppercase(str: string): boolean {
    return str.toLowerCase() !== str;
  }

  public static hasSpecialCharacter(str: string): boolean {
    return /[@$!%*?&]/.test(str);
  }

  public static hasEmailFormat(str: string): boolean {
    let regex = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");
    return regex.test(str);
  }

  public static hasPhoneFormat(str: string): boolean {
    let regex = new RegExp("^[0-9]{3}[-\s\ ]?[0-9]{3}[-\s\ ]?[0-9]{4}$");
    return regex.test(str);
  }

  public static getMaxNumber(len: number): number {
    let strNum: string = "";
    for (let i = 0; i < len; i++) {
      strNum = strNum + "9";
    }
    return Number.parseFloat(strNum);
  }

  public static getMinNumber(len: number): number {
    let strNum: string = "1";
    for (let i = 0; i < len - 1; i++) {
      strNum = strNum + "0";
    }
    return Number.parseFloat(strNum);
  }

  public static hasDateFormat(strDate: string): boolean {
    return moment(strDate, 'MM/DD/YYYY', true).isValid() || 
    moment(strDate, 'M/DD/YYYY', true).isValid() ||
    moment(strDate, 'MM/D/YYYY', true).isValid() ||
    moment(strDate, 'M/D/YYYY', true).isValid();
  }
}