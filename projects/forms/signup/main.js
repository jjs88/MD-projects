(function(window) {

	
	//form variables
	var signupForm 	= document.getElementById('signup');
	var firstName 	= signupForm.elements['firstname'];
	var lastName 	= signupForm.elements['lastname'];
	var email 		= signupForm.elements['email'];
	var dateOfBirth = signupForm.elements['dob'];
	var password 	= signupForm.elements['password'];


	/*********************************************************************************************************
	//submit Event
	*********************************************************************************************************/	
	signupForm.addEventListener('submit', function(event) {

		event.preventDefault();
		
		/*********************************************************************************************************
		//Run Validations
		*********************************************************************************************************/
		var invalidCount = 0;

		checkLength(firstName);
		checkLength(lastName);
		emailValidation(email);
		dateOfBirthValidation(dateOfBirth);
		passwordValidation(password);

		console.log(invalidCount);

		if(invalidCount == 0) {
			//form.className = "valid" 
			//console.log(form.getAttribute("class"));

			for(var i=0; i < signupForm.elements.length; i++) {
				signupForm.elements[i].className += " valid";
			};
		};


		/*********************************************************************************************************
		//Validation Functions
		*********************************************************************************************************/

		//Validation: Check that the user’s input is not empty and that it is at least a length of two characters.
			//Validation: Check that the user’s input is not empty and that it is at least a length of two characters.
		function checkLength(input) {

			//not empty and characters is not 2 or greater
			if((!validator.isEmpty(input.value)) &&  (!validator.isOfLength(input.value, 2)) ) {

					console.log("works");
					input.className += ' invalid';
					invalidCount +=1;
					return;
			};

			//empty
			if(validator.isEmpty(input.value)) {

				console.log("works");
				input.className += ' invalid';
				invalidCount +=1;
				return;
			};
		};

		//Validation: Check that the user’s input is not empty and that it is a valid email address.
		function emailValidation(input) {

			if(!validator.isEmpty(input.value)) {

				if(!validator.isEmailAddress(input.value)) {

					input.className += ' invalid';
					invalidCount +=1;
					return;
				}
			} else {

					input.className += ' invalid';
					invalidCount +=1;
					return;
				}
		}

		//Validation: Check that the user’s birthday is before today and computes to a minimum age.
		function dateOfBirthValidation(input) {

			var currentDate = new Date();

			if(!validator.isEmpty(input.value)) {

				if(!validator.isBeforeDate(input.value, currentDate)) {

					input.className += ' invalid';
					invalidCount +=1;
					return;
				}
			} else {

					input.className += ' invalid';
					invalidCount +=1;
					return;
				}
		}

		//Validation: Check that it is not empty and that it is at least six to eight characters long.
		function passwordValidation(input) {

			//not empty and characters is not 6 or greater
			if((!validator.isEmpty(input.value)) &&  (!validator.isOfLength(input.value, 6)) ) {

				//console.log("works");
				input.className += ' invalid';
				invalidCount +=1;
				return;
			};

			//empty
			if(validator.isEmpty(input.value)) {

				//console.log("works");
				input.className += ' invalid';
				invalidCount +=1;
				return;
			};
		}

	});











})(window);
