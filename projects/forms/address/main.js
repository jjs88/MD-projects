(function(window) {

	//billing
	var form 				= document.getElementById('billing-shipping-form');
	var billingFirstName 	= form.elements['billing-firstname'];
	var billingLastName 	= form.elements['billing-lastname'];
	var billingAddress 		= form.elements['billing-address'];
	var billingCity 		= form.elements['billing-city'];
	var billingState		= form.elements['billing-state'];
	var billingCountry 		= form.elements['billing-country'];
	var same 				= form.elements['same'];

	//shipping
	var shippingFirstName 	= form.elements['shipping-firstname'];
	var shippingLastName 	= form.elements['shipping-lastname'];
	var shippingAddress 	= form.elements['shipping-address'];
	var shippingCity 		= form.elements['shipping-city'];
	var shippingState		= form.elements['shipping-state'];
	var shippingCountry 	= form.elements['shipping-country'];

	var invalidCount;
	var isChecked = false;

	/*********************************************************************************************************
	//Select State Event
	*********************************************************************************************************/	

	// var states = [billingState, shippingState];

	// for(var i=0; i < states.length;i++) {

	// 	states[i].addEventListener('change', function(event) {

	// 	selectedVal = event.target.options[event.target.selectedIndex].value;
		
	// 	console.log(selectedVal);

	// 	});
	// };



	/*********************************************************************************************************
	//Submit Event
	*********************************************************************************************************/	
	form.addEventListener('submit', function(event) {

		event.preventDefault();
		
		/*********************************************************************************************************
		//Run Validations
		*********************************************************************************************************/
		invalidCount = 0;

		//billing
		checkLength(billingFirstName);
		checkLength(billingLastName);
		checkAddress(billingAddress);
		checkCityCountry(billingCity);
		checkCityCountry(billingCountry);

		//shipping
		checkLength(shippingFirstName);
		checkLength(shippingLastName);
		checkAddress(shippingAddress);
		checkCityCountry(shippingCity);
		checkCityCountry(shippingCountry);
		
		//console.log(invalidCount)

		//set valid class 
		if(invalidCount == 0) {
			//form.className = "valid" 
			//console.log(form.getAttribute("class"));

			for(var i=0; i < form.elements.length; i++) {

				form.elements[i].className = "valid";
			};
		};

		//display message if invalid
		// if(invalidCount > 0) {

		// 	var elements = document.getElementsByClassName('invalid');

		// 	for(var i=0; i < elements.length; i++) {

		// 		elements[i].value = "Invalid!";
		// 	}
		// }

	});

	/*********************************************************************************************************
	//Change checkbox event
	*********************************************************************************************************/	

	same.addEventListener('change', function(event) {

		if(isChecked) {
			isChecked = false
		} else {
			isChecked = true;
		}

		//set 
		if(isChecked) {
			shippingFirstName.value = billingFirstName.value;
			shippingLastName.value = billingLastName.value;
			shippingAddress.value = billingAddress.value;
			shippingCity.value = billingCity.value;
			shippingState.value = billingState.value;
			shippingCountry.value = billingCountry.value;
		};
	});



	/*********************************************************************************************************
	//Validation Functions
	*********************************************************************************************************/

		//Validation: Check that the user’s input is not empty and that it is at least a length of two characters.
		function checkLength(input) {

			//not empty and characters is not 2 or greater
			if((!validator.isEmpty(input.value)) &&  (!validator.isOfLength(input.value, 2)) ) {

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
		};


		//Validation: Check that the user's address is correct. need to add to this
		function checkAddress(input) {

			//empty
			if(validator.isEmpty(input.value)) {

				input.className += ' invalid';
				invalidCount +=1;
				return;
			};

			//cant have white spaces
			if(!validator.isTrimmed(input.value)) {

				//console.log("works");
				input.className += ' invalid';
				invalidCount +=1;
				return;
			}
		};

		//Validation: Check that the user's address is correct. need to add to this
		function checkCityCountry(input) {

			//console.log("runs");

				var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 
								'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
								'q', 'r', 's','t', 'u', 'v', 'w', 'x', 'y', 'z','A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
								'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

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

			if(!validator.isComposedOf(input.value, letters)) {

				input.className += ' invalid';
				invalidCount +=1;
				return;
			};
		};
		

})(window);
