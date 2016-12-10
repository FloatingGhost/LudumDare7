var beatProc = function(){return{
  // The intervals at which we expect to recieve clicks
  bar: [],
  // What we actually got
  actualTimes: [],
  // When the timer was started
  startTime: 0,
  // When the timer should stop
  stopTime: 0,
  // The amount of leeway you get
  tolerance: 250,
  // This is a shit
  DONTEVENTRYIT: [],
  // Seconds per beat
  bps: 0,
  // The actual millis for the beat
  expectedTimes: [],

  millisPerBeat: 428,
  // Set the expected times
  setBar: function(times) {
    console.log("EXPECTED ", times);
    this.bar = times;
  },

  setBPS: function(i) {
    this.bps = i; 
  },

  getBar: function() {
    return this.bar;
  },

  // Set the actual times
  setActualTimes: function(times) {
    this.actualTimes = times;
  },
 
  // Start the timer
  start: function() {
    var sum = 0;
    this.bar.forEach(
      (i) => { sum += i }
    );
    this.timeForABar = this.millisPerBeat * 8;
    this.startTime = Date.now();
    this.stopTime  = this.startTime + 2*this.timeForABar;
    console.log("EINE KLEINE BAR", this.timeForABar);
    this.expectedTimes = [];
    console.log("Mapping ", this.bar);
    for (var beat in this.bar) {
      var v = this.bar[beat];
      var beatStartsAt = this.startTime + (beat * this.millisPerBeat);
      switch (v) {
        case 0:
          break;
        case 1:
          this.expectedTimes.push(beatStartsAt);
          break;
        case 2:
          this.expectedTimes.push(beatStartsAt);
          this.expectedTimes.push(beatStartsAt + (this.millisPerBeat / 2));
          break;
        default:
          console.log("The fuck is beat value ", v);
      }
    }
    console.log(this.expectedTimes);
  },
 
  // Register a click
  registerClick: function() {
    this.actualTimes.push(Date.now());
    return this.processClicks();
  },

  // Figure out if we should stop now
  doesStop: function() {
    return (Date.now() >= this.stopTime);
  },

  // Figure out how far off the user's clicks were
  processClicks: function() {
    for (var i in this.expectedTimes) {
      if (Math.abs(this.expectedTimes[i]-Date.now()) <= this.tolerance)
        return true;
    }
    return false;
  }
}}
