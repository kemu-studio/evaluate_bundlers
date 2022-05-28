class TestApp {
  constructor() {
    this.tickIdx = 0
    this.timer = new K.Timer(this)
    this.timer.callEvery(1000)
  }

  onTimer() {
    this.tickIdx++
    document.getElementById('output').innerHTML = 'K.Timer test: ' + this.tickIdx
  }
}

const testApp = new TestApp()
