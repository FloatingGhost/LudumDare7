var beatProc = function(){return{
  // The intervals at which we expect to recieve clicks
  expectedTimes: [],
  // What we actually got
  actualTimes: [],
  // When the timer was started
  startTime: 0,
  // When the timer should stop
  stopTime: 0,

  // Set the expected times
  setExpectedTimes: function(times) {
    this.expectedTimes = times;
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
  },

  // Figure out if we should stop now
  doesStop: function() {
    return (Date.now() >= this.stopTime);
  },

  // Try to figure out if beats were missed
  // Vulnerable to spam clicking, but hey
  // Idea: Start with the actual clicks
  //       For each expected time, find the click
  //       it matches most closely.
  alignClicks: function(expectedTimes) {
    // This will always be the difference in the number of clicks
    var dropped     = Math.abs(expectedTimes.length-this.actualTimes.length);
    var variance    = 0;
    for (var i in this.actualTimes) {
      var actualTime = this.actualTimes[i];
      var min = -1;
      // For each expected time
      for (var j in expectedTimes) {
        // Get the absolute difference to the actual time
        var expectedTime = expectedTimes[j];
        var diff = Math.abs(actualTime-expectedTime);

        // If it's smaller, save it
        if (diff < Math.abs(min-actualTime)) {
          min = expectedTime;
        } 
      } 

      if (min != -1) {
        console.log("Mapping ",actualTime," to ",min);
        // Remove the minimum value so we can't map it twice    
        expectedTimes.pop(min);
        variance += Math.abs(min-actualTime);
      }
    }  
  
    return { variance : variance, dropped: dropped }
  },

  // Figure out how far off the user's clicks were
  processClicks: function() {
    // Use the delays and the start time to find out the 
    // timestamp when the user should have clicked
    var adjustedExpectedTimes = [];
    var adjust = 0;
    for (var i in this.expectedTimes) {
      var time = this.expectedTimes[i];
      adjustedExpectedTimes.push(this.startTime + time + adjust);
      adjust += time;
    }
    console.log(this.alignClicks(adjustedExpectedTimes));
  },
}}
