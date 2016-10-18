(function(window) {

	//console.log("works");

	var questionForm = document.getElementById('question-form');
	var otherBox	 = questionForm.elements['otherBox'];
	var otherRadio	 = questionForm.elements['otherRadio'];

	var invalidCount;
	var currentVal;



	/*********************************************************************************************************
	//Events 
	*********************************************************************************************************/	
	questionForm.addEventListener('submit', function(event) {


		event.preventDefault();


		invalidCount = 0;
		currentVal = "";


		checkRadioButtons(questionForm);

		//no radio button is checked... check the "other" radio button and box for input
		if(currentVal == "" && otherRadio.checked == true && !validator.isEmpty(otherBox.value)) {

			otherBox.className = "valid";
			currentVal +=1;
		};

		//no radio button was selected or "Other" option wasn't selected and input box is empty
		if(currentVal == "") {

			otherBox.classList.remove("invalid");
			otherBox.className += " invalid";
		};
	});

	
	/*********************************************************************************************************
	//Validation functions
	*********************************************************************************************************/	
	function checkRadioButtons(input) {

		//make sure a radio button is selected
		for(var i=0; i < input.elements.length-3; i++) {

			console.log(input.elements[i]);

			//if a radio box is checked... green light form
			if(input.elements[i].checked == true) {

				currentVal = input.elements[i].value;

				otherBox.className = "valid";

				//reset
				input.elements[i].checked = false;
			};
		};
	};

})(window);