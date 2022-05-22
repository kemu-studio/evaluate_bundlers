import { emitAnnConsoleLog } from './libAnn'

export function emitBobConsoleLog() {
  console.log('The libBob::emitBobConsoleLog()...')
  console.log('The libBob::emitBobConsoleLog()...')
  console.log('The libBob::emitBobConsoleLog()...')
  console.log('The libBob::emitBobConsoleLog()...')
  console.log('The libBob::emitBobConsoleLog()...')
  console.log('The libBob::emitBobConsoleLog()...')
  console.log('The libBob::emitBobConsoleLog()...')
  console.log('The libBob::emitBobConsoleLog()...')
}

export function bobCallAnnTestConsoleLog() {
  emitAnnConsoleLog()
  emitAnnConsoleLog2()
}
