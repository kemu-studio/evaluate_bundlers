import { emitAnnConsoleLog } from './libAnn'

export function emitBobConsoleLog() {
  console.log('The libAnn::emitBobConsoleLog()...')
  console.log('The libAnn::emitBobConsoleLog()...')
  console.log('The libAnn::emitBobConsoleLog()...')
  console.log('The libAnn::emitBobConsoleLog()...')
  console.log('The libAnn::emitBobConsoleLog()...')
  console.log('The libAnn::emitBobConsoleLog()...')
  console.log('The libAnn::emitBobConsoleLog()...')
  console.log('The libAnn::emitBobConsoleLog()...')
}

export function bobCallAnnTestConsoleLog() {
  emitAnnConsoleLog()
  emitAnnConsoleLog2()
}
