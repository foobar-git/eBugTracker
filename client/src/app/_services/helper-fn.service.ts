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

}
