import { emitAnnConsoleLog, emitAnnConsoleLog2 } from './libAnn.js';

export class CesarClass {
  doAnnStuff() {
    emitAnnConsoleLog()
    emitAnnConsoleLog2()
  }
}

export class CesarClass_ThisShouldBeTreeShaked {
  doAnnStuff() {
    emitAnnConsoleLog2()
    emitAnnConsoleLog()
  }
}