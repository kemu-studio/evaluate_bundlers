import { emitAnnConsoleLog, emitAnnConsoleLog2 } from './libAnn.js';
import { emitBobConsoleLog } from './libBob.js';
import { CesarClass, CesarClass_ThisShouldBeTreeShaked } from './libCesar.js';
CHUJX();
emitAnnConsoleLog();
emitAnnConsoleLog2();
emitBobConsoleLog();
const cesar = new CesarClass()
cesar.doAnnStuff()
const cesar2 = new CesarClass_ThisShouldBeTreeShaked()
cesar2.doAnnStuff()