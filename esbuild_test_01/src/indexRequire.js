const { emitAnnConsoleLog, emitAnnConsoleLog2 } = require('./libAnn.js');
const { emitBobConsoleLog } = require('./libBob.js')
const { CesarClass } = require('./libCesar.js')

emitAnnConsoleLog();
emitAnnConsoleLog2();
emitBobConsoleLog();
const cesar = new CesarClass()
cesar.doAnnStuff()