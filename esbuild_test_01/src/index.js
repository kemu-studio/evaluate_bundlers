import { emitAnnConsoleLog, emitAnnConsoleLog2 } from './libAnn.js';
import { emitBobConsoleLog } from './libBob.js';
import { CesarClass } from './libCesar.js';
emitAnnConsoleLog();
emitAnnConsoleLog2();
emitBobConsoleLog();
const cesar = new CesarClass()
cesar.doAnnStuff()