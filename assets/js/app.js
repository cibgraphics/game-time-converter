$(function() {
    
  $(function(){
    
    // Settings and Variables
    var $userbase = parseInt($('.base').val()),
        $userminute = parseInt($('.minutes').val()),
        $userseconds = parseInt($('.seconds').val());
    
    $('.base, .minutes, .seconds').on('change', function(){
      $userbase = parseInt($('.base').val());
      $userminute = parseInt($('.minutes').val()),
      $userseconds = parseInt($('.seconds').val());
      calculateTime($userbase, $userminute, $userseconds);
    });
    
    calculateTime($userbase, $userminute, $userseconds);
    
    // Convert Minutes to Milliseconds
    function minuteToMS(minute) {
      return Math.floor(minute*1000*60);
    }
    
    // Convert Seconds to Milliseconds  
    function secondsToMS(seconds) {
      return Math.floor(seconds*1000);
    }
    
    // Do some fancy Math to turn Milliseconds into redable human format.
    function calculateTime(base, minutes, seconds) {
      var $time = $('time'),
          msUserBase = minuteToMS($userbase),
          msUserMinute = minuteToMS($userminute),
          msUserSeconds = secondsToMS($userseconds),
          totalMS = msUserBase - (msUserMinute + msUserSeconds),
          minutes = Math.floor(totalMS / 60000),
          seconds = ((totalMS % 60000) / 1000).toFixed(0);
      
      // Export out Result
      $time.text(seconds == 60 ? (minutes+1) + ":00" : minutes + ":" + (seconds < 10 ? "0" : "") + seconds);
    }; 
  });
  
});