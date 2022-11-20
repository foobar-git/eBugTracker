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

}
