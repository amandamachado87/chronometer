

//chronometer
	var split = form.cronometro.value.split(':');
	var addZero, clearInt, startTime, updatedTime, difference, savedTime;
    	var paused = 0;
    	var running = 0;
	var numCount = split.map(function (el) {
		return parseInt(el);
	});

//start the chronometer
  	document.querySelector('#start').addEventListener('click', start);
	function start() {
     		if(!running){
      			startTime = new Date().getTime();
			//this.disabled = true;
			clearInt = setInterval(countTime, 1000);
      			paused = 0;
      			running = 1;
        
		}
 	 }
		
//pause the chronometer
 	function pauseTimer() {
      		$('#pause').show().fadeOut(500); //will hide the button PAUSE after clicked
  		if (!form.cronometro.value){ 
			// if timer never started, don't allow pause button to do anything
  		} else 
		if (!paused) {
     			var handle = setInterval(start, 5000);		
    			clearInterval(clearInt);
    			savedTime = difference; 
    			paused = 1;
    			running = 0;
  		} else {
		 	//start(); // if the timer was already paused, when somebody click pause again the time will restart.
      		}
	}

//will hide the button Start and show the content	
	function myFunction() { 
  		var x = document.getElementById("myDIV"); 
  		var y = document.getElementById("start");
		var z = document.getElementById("pause");
  		if (x.style.display === "block") {
    			x.style.display = "none";
  		} else {
    			x.style.display = "block"; //will show the content
			z.style.display = "block"; //will show the button PAUSE
    			y.style.display = "none"; //will hide the button START after clicked
  		}
	}

//starting the count
 	function countTime() {
		updatedTime = new Date().getTime();
  		if (savedTime){
    			form.cronometro.value = (updatedTime - startTime) + savedTime;
  		} else {
    			form.cronometro.value =  updatedTime - startTime;
  	}
  
		/* will restart the minutes and hours checking the position to zero first */	
		  numCount.map(function (el, i, array) {
		  	if (array[i - 1] > 0 && array[i] == 0 && !array[array.length - 1]) {
		  		array[i] = 60;
		  		return array[i - 1]--;
		  	}
		  });

			/* decrease the seconds, verifying if the previous position already count finished */
		  if (numCount[numCount.length - 1] <= 60 && numCount[numCount.length - 1] > 0) {
		  	numCount[numCount.length - 1]--;
		  }

			/* numbers in format 00 */
		  addZero = numCount.map(function (el, i) {
		  	return numCount[i] < 10 ? '0' + numCount[i] : numCount[i];
		  });
		  form.cronometro.value = addZero[0] + ":" + addZero[1] + ":" + addZero[2];

			/* Will reactive the button after verify the time and after it, will clean the setInterval. */
		  if (form.cronometro.value == '00:00:00') {
		  	clearInterval(clearInt);
        		$('#myAlert').show().fadeIn(5000); //show the frase alerting the end
        		$('#myDIV').show().fadeOut(500); //will hide the content after the end
   		 }
	}



