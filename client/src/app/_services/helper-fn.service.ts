import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperFnService {

  constructor() { }

  async testFn_sleepTimer(s: number) {
    var t = s * 1000;
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    await sleep(t);
    console.log("paused for " + s + " seconds.");
  }

  getCurrentDateTime() {
    return new Date;
  }

  formatDateTime(dateTime: string) {  // slicing the dateTime variable for easier reading
    return this.getSimpleDate(dateTime) + "  " + this.getSimpleTime(dateTime);
  }

  getSimpleDate(dateTime: string) {
    return (dateTime).slice(0, 10);
  }

  getSimpleTime(dateTime: string) {
    return (dateTime).slice(11, 19);
  }

  validateFileType(requiredFileTypes: string[], file: any) {
    var arrayLength = requiredFileTypes.length;
    for (var i = 0; i < arrayLength; i++) {
        if (requiredFileTypes[i] == file.type) {
          return true;
        }
    };
    return false;
  }

  removeSpacesFromString(str: any) {
    let strArray: string[] = [];
    str = str.split("|");
    str.forEach( (element) => {
        let e = element.trim();
        strArray.push(e);
        //console.log(strArray);
    });
    return strArray;
  }

  getFieldsByString(data: any, byString: string) {
    return data.filter((field) => field.username === byString);
  }

  getFieldByString(data: any, byString: string, byFieldName: string) {
    let d = data.filter((field) => field.username === byString).map((field) => field[byFieldName]);
    return d.toString();
  }

  checkForDuplicates(array) {
    array = array.filter((item, index) => array.indexOf(item) != index);
    return [...new Set(array)];
  }

  removeDuplicates(array) {
    return array.filter((item, index) => array.indexOf(item) === index);
  }

  checkIfUserAlreadyAssigned(array) {
    let duplicates = this.checkForDuplicates(array);
    //console.log(duplicates);
    if (duplicates.length == 0) return false;
    else return true;
  }

}
