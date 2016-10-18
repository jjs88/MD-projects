(function(event) {


	var scheduleForm 	= document.getElementById('schedule-form');
	var notes 			= scheduleForm.elements['notes'];
	var number 			= scheduleForm.elements['number'];
	var email 			= scheduleForm.elements['email'];
	var date			= scheduleForm.elements['date'];
	var time            = scheduleForm.elements['time'];

	var invalidCount;

	//console.log(date.value);

	/*********************************************************************************************************
	//Events 
	*********************************************************************************************************/	

	//submit
	scheduleForm.addEventListener('submit', function(event) {

		event.preventDefault();

		invalidCount = 0;

		console.log(date.value);

		//run validation functions
		checkNotes(notes);
		checkNumber(number);
		checkEmail(email);
		checkDateTime(date);
		checkDateTime(time);


		//change color of form fields to green for success
		if(invalidCount == 0) {

			for(var i=0; i < scheduleForm.elements.length; i++) {

				scheduleForm.elements[i].className = "valid";
			};
		};
	});



	/*********************************************************************************************************
	//Validation functions
	*********************************************************************************************************/	

	function checkNotes(input) {

		//empty 
		if(validator.isEmpty(input.value)) {

			console.log("empty");

			input.classList.remove("invalid");
			input.className += ' invalid';
			invalidCount +=1;
			return;
		};
	};

	function checkNumber(input) {

		//empty 
		if(validator.isEmpty(input.value)) {

			//console.log("empty");

			input.classList.remove("invalid");
			input.className += ' invalid';
			invalidCount +=1;
			return;
		};

		//is phone number
		if(!validator.isPhoneNumber(input.value)) {

			input.classList.remove("invalid");
			input.className += ' invalid';
			invalidCount +=1;
			return;
		};

	};

	function checkEmail(input) {

		//empty
		if(validator.isEmpty(input.value)) {

			input.classList.remove("invalid");
			input.className += ' invalid';
			invalidCount +=1;
			return;

		};

		//valid email
		if(!validator.isEmailAddress(input.value)) {

			input.classList.remove("invalid");
			input.className += ' invalid';
			invalidCount +=1;
			return;
		};
	};


	function checkDateTime(input) {

		//empty
		if(validator.isEmpty(input.value)) {

			input.classList.remove("invalid");
			input.className += ' invalid';
			invalidCount +=1;
			return;

		};
	};




})(window);