(function(window) {


	//form variables
	var colorWheelForm 		= document.getElementById('color-wheel-form');
	var red 				= colorWheelForm.elements['red'];
	var blue 				= colorWheelForm.elements['blue'];
	var green 				= colorWheelForm.elements['green'];
	var alpha 				= colorWheelForm.elements['alpha'];
	var colorBox			= colorWheelForm.elements['color-box'];

	var redValue = 0;
	var blueValue = 0;
	var greenValue = 0;
	var alphaValue = 0;

	var invalidCount;
	


	/*********************************************************************************************************
	//Events 
	*********************************************************************************************************/	
	red.addEventListener('change', function(event) {

		redValue = red.value;
		console.log(redValue);
	});

	blue.addEventListener('change', function(event) {

		blueValue = blue.value;
		console.log(blueValue);
	});

	green.addEventListener('change', function(event) {

		greenValue = green.value;
		console.log(greenValue);
	});

	alpha.addEventListener('change', function(event) {

		alphaValue = alpha.value;

	});

	//click on the colorbox when done adjusting colors for validation
	colorBox.addEventListener('mouseup', function(event) {

		invalidCount = 0;

		var input = "rgb(" + redValue + "," + greenValue + "," + blueValue + ")";

		if(!validator.isRGB(input)) {

			input.className = 'invalid';
			invalidCount+=1;
		}

		if(invalidCount == 0) {

			colorWheelForm.className = "valid" 
			console.log(colorWheelForm.getAttribute("class"));
		};

	});



	/*********************************************************************************************************
	//Validation functions
	*********************************************************************************************************/	




})(window);