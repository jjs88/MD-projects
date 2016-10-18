(function(window) {


	var form 		= document.getElementById('login-form');
	var name 		= form.elements['firstname'];
	var password 	= form.elements['password'];
	//console.log("works");


	var invalidCount;

	/*********************************************************************************************************
	//Submit Event
	*********************************************************************************************************/
	form.addEventListener('submit', function(event) {

		event.preventDefault();

		invalidCount = 0;

		//Run Validations
		checkName(name);
		checkPassword(password);

		//check validCount. If no errors then color each form field green
		if(invalidCount == 0) {

			for(var i=0; i < form.elements.length; i++) {

				form.elements[i].className += " valid";
			}
		};
	});


	/*********************************************************************************************************
	//Validation Functions
	*********************************************************************************************************/	

	function checkName(input) {

			//empty
			if(validator.isEmpty(input.value)) {

				input.className += ' invalid';
				invalidCount +=1;
				return;
			};

			//cant have white spaces and number characters
			if(!validator.isTrimmed(input.value)) {

				input.className += ' invalid';
				invalidCount +=1;
				return;
			};

			//make sure there are atleast two words (first and last name)
			if(!validator.moreWordsThan(input.value, 2)) {

				input.className += ' invalid';
				invalidCount +=1;
				return;	
			};
	}

	function checkPassword(input) {

			//empty
			if(validator.isEmpty(input.value)) {

				input.className += ' invalid';
				invalidCount +=1;
				return;
			};

			//cant have white spaces and number characters
			if(!validator.isTrimmed(input.value)) {

				input.className += ' invalid';
				invalidCount +=1;
				return;
			};

			//length has to be atleast 3
			if((!validator.isOfLength(input.value, 6))) {

				input.className += ' invalid';
				invalidCount +=1;
				return;	
			};
	};



})(window);