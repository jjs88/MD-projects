(function (window) {


	var form 		= document.getElementById('credit-card-form');
	var name        = form.elements['name'];
	var ccNumber 	= form.elements['cc-number'];
	var csvNumber 	= form.elements['csv-number'];

	var invalidCount;



	/*********************************************************************************************************
	//Submit Event
	*********************************************************************************************************/	
	form.addEventListener('submit', function(event) {

		event.preventDefault();

		invalidCount = 0;

		//perform validations
		checkCCNumber(ccNumber);
		checkCSVNumber(csvNumber);
		checkName(name);



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

	function checkCCNumber(input) {

		//is empty
		if(validator.isEmpty(input.value)) {

			input.className += ' invalid';
			invalidCount +=1;
			return;
		};

		//not a valid credit card number
		if(!validator.isCreditCard(input.value)) {

			input.className += ' invalid';
			invalidCount +=1;
			return;	
		};

		//has leading/trailing spaces
		if(!validator.isTrimmed(input.value)) {

			input.className += ' invalid';
			invalidCount +=1;
			return;	
		};
	};

	function checkCSVNumber(input) {

		//is empty
		if(validator.isEmpty(input.value)) {

			input.className += ' invalid';
			invalidCount +=1;
			return;
		};

		//has leading/trailing spaces
		if(!validator.isTrimmed(input.value)) {

			input.className += ' invalid';
			invalidCount +=1;
			return;	
		};

		//length has to be atleast 3
		if((!validator.isOfLength(input.value, 3))) {

			input.className += ' invalid';
			invalidCount +=1;
			return;	
		};

	};

	function checkName(input) {

		//is empty
		if(validator.isEmpty(input.value)) {

			input.className += ' invalid';
			invalidCount +=1;
			return;
		};

		//has leading/trailing spaces
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
	};






})(window);