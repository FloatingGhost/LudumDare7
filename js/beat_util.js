var beatProc = function(){return{
  // The intervals at which we expect to recieve clicks
  expectedTimes: [],
  // What we actually got
  actualTimes: [],
  // When the timer was started
  startTime: 0,
  // When the timer should stop
  stopTime: 0,
  // The amount of leeway you get
  tolerance: 500,

  // Set the expected times
  setExpectedTimes: function(times) {
    this.expectedTimes = times;
  },

  getExpectedTimes: function() {
    return this.expectedTimes;
  },

  // Set the actual times
  setActualTimes: function(times) {
    this.actualTimes = times;
  },
 
  // Start the timer
  start: function() {
    var sum = 0;
    this.expectedTimes.forEach(
      (i) => { sum += i }
    );
    this.startTime = Date.now();
    this.stopTime  = this.startTime + sum;
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
    // Use the delays and the start time to find out the 
    // timestamp when the user should have clicked
    var adjustedExpectedTimes = [];
    var adjust = 0
    var mapping = {};
    for (var i in this.expectedTimes) {
      var time = this.expectedTimes[i];
      adjustedExpectedTimes.push(this.startTime + adjust);
    
      mapping[time] = this.startTime + adjust; 
      adjust += time;
    }
    console.log(adjustedExpectedTimes, Date.now())
    for (var i in adjustedExpectedTimes) {
      if (Math.abs(Date.now() - adjustedExpectedTimes[i]) <= this.tolerance) {
        this.expectedTimes = this.expectedTimes.filter(
          (y)=>{return y != mapping[adjustedExpectedTimes[i]]}
        );
        return true;
      } 
      console.log(Math.abs(Date.now() - adjustedExpectedTimes[i]));
    }
    return false;
  },
}}
