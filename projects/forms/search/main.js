(function(window) {

	var searchForm = document.getElementById('search-form');
	var search = searchForm.elements['search'];
	
	var invalidCount;


	/*********************************************************************************************************
	//Submit Event
	*********************************************************************************************************/	
	searchForm.addEventListener('submit', function(event) {

		event.preventDefault();

		invalidCount = 0;

		checkSearch(search);

		console.log(invalidCount);


		//change color of form fields to green for success
		if(invalidCount == 0) {

			for(var i=0; i < searchForm.elements.length; i++) {

				searchForm.elements[i].style.background = "green";
			};
		};


		console.log("works");

	});

	/*********************************************************************************************************
	//Validation Functions
	*********************************************************************************************************/

	function checkSearch(input) {

		//empty
		if(validator.isEmpty(input.value)) {

			input.classList.remove("invalid");
			input.className += ' invalid';
			input.style.background = "red";
			invalidCount +=1;
			return;
		};

		//cant have white spaces
		if(!validator.isTrimmed(input.value)) {

			input.classList.remove("invalid");
			input.className += ' invalid';
			input.style.background = "red";
			invalidCount +=1;
			return;
		}
	};

})(window);