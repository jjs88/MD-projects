(function (window) {

	

	//set variables
	var results = [];
	var numberPad = document.getElementsByClassName('btn-num');
	var operations = document.getElementsByClassName('action-click');
	var equals = document.getElementById('equals');
	var screenValue = document.getElementById('results');
	var clear = document.getElementById('clear');





	/***********************************************************
	/click events
	***********************************************************/

	//add click event for each number
	for(var i = 0; i <  numberPad.length; i++) {

		numberPad[i].addEventListener('click', function(event) {

			event.preventDefault();

			//add number to the screen
			screenValue.innerHTML += event.target.innerHTML;

			//push number to results array
			results.push(event.target.innerHTML);
		});
	};


	//click event for operation (+, -, *, /) 
	for(var i=0; i < operations.length; i++) {

		operations[i].addEventListener('click', function(event) {

			event.preventDefault();

			//clear the screen numbers
			screenValue.innerHTML = "";

			//push number to results array
			results.push(event.target.innerHTML);
		});
	};


	//equals click event
	equals.addEventListener('click', function(event) {

		screenValue.innerHTML = eval(results.join(''));

		//clear results array of current operation
		results = [];
	});

	//clear click event --> clear the screen 
	clear.addEventListener('click', function(event) {

		//clear the screen
		screenValue.innerHTML = "";
	});

})(window);




