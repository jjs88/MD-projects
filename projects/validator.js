(function (window) {

	//this file contains the validator functions for forms validation.

	var validator = {};

	
	/********************************************
	//isEmailAddress
	*********************************************/
	validator.isEmailAddress = function(input) {

		var pos;
		var first;
		var last;

		//get first part of email and also verify @ symbol
		if(input.indexOf("@") !== -1) {
			pos = input.indexOf('@');
			first = input.substr(0, pos);
		} else {
			return false;
		}

		//get second part of email
		last = input.substr(pos+1, input.length-1);

		return (first.length > 0 && last.length > 0) ? true:false;
	};


	/********************************************
	//isPhoneNumber
	*********************************************/
	validator.isPhoneNumber = function(input) {

		var scrubbedNumber = "";

		//convert number to string if not already
		if(typeof input !== "String") {

			input = input.toString();
		}

		//remove 1 from beginning of number only if number is > 10 which means the long distance trunk access code is attached (+1)
		if(input.indexOf("1") == 0 && input.length > 10) {
			 input = input.substr(1, input.length-1);
		}


		//remove dashes
		for(var i=0; i < input.length; i++) {

			if (input[i] !== "-") {

				scrubbedNumber += input[i];
			}
		}

		//scrubbed number must equal 10 digits for valid US number
		return (scrubbedNumber.length == 10)? true: false;
	}

	/********************************************
	//withoutSymbols
	*********************************************/
	validator.withoutSymbols = function(input) {

		var symbols = [",", ".", "@", "/", "?", "!"]; //add symbols as needed
		var result = [];

		for(var i=0; i < input.length; i++) {

			if(symbols.indexOf(input[i]) == -1) {

					result.push(input[i]);
			}
		}

		return result.join('');
	}

	/********************************************
	//isDate
	*********************************************/
	validator.isDate = function(input) {

		var validDate = new Date(input);
		
		//if we can use the getTime method then its a date object
		return validDate.getTime() ? true:false
	};

	/********************************************
	//isBeforeDate
	*********************************************/
	validator.isBeforeDate = function(input, reference) {

		
		//run date validator function
		input = validateDate(input);
		reference = validateDate(reference);

		//check if both are valid dates
		if(input !== false && reference !== false) {

			return (input < reference) ? true:false;
			
		} else {throw "one or both parameters are not dates!";}

		
		//date validator function
		function validateDate(inp) {

			var validDate;

			if(inp !== "Date") {
				validDate = new Date(inp);
			}

			if(validDate.getTime()) {
				return validDate.getTime();
			} else {
				return false;
			}
		}
	};

	/********************************************
	//isAfterDate
	*********************************************/
	validator.isAfterDate = function(input, reference) {

		
		//run date validator function
		input = validateDate(input);
		reference = validateDate(reference);

		//check if both are valid dates
		if(input !== false && reference !== false) {

			return (input > reference) ? true:false;
			
		} else {throw "one or both parameters are not dates!";}

		
		//date validator function
		function validateDate(inp) {

			var validDate;

			if(inp !== "Date") {
				validDate = new Date(inp);
			}

			if(validDate.getTime()) {
				return validDate.getTime();
			} else {
				return false;
			}
		}
	};

	/********************************************
	//isBeforeToday
	*********************************************/
	validator.isBeforeToday = function(input) {

		var currentDate = new Date();
		currentDate = currentDate.getTime();

		input = validateDate(input);

		if(input !== false) {

			return (input < currentDate) ? true:false;

		} else {throw "input is not a valid date!";}


		//date validator function
		function validateDate(inp) {

			var validDate;

			if(inp !== "Date") {
				validDate = new Date(inp);
			}

			if(validDate.getTime()) {
				return validDate.getTime();
			} else {
				return false;
			}
		}

	}

	/********************************************
	//isAfterToday
	*********************************************/
	validator.isAfterToday = function(input) {

		var currentDate = new Date();
		currentDate = currentDate.getTime();

		input = validateDate(input);

		if(input !== false) {

			return (input > currentDate) ? true:false;

		} else {throw "input is not a valid date!";}


		//date validator function
		function validateDate(inp) {

			var validDate;

			if(inp !== "Date") {
				validDate = new Date(inp);
			}

			if(validDate.getTime()) {
				return validDate.getTime();
			} else {
				return false;
			}
		}

	};

	/********************************************
	//isEmpty
	*********************************************/
	validator.isEmpty = function(input) {

		if(typeof input !== "string") {return false;}

		return input.trim().length == 0 ? true:false;
	}

	/********************************************
	//contains
	*********************************************/
	validator.contains = function(input, words) {

		if(typeof input !== "string") {throw "input is not a string!";}

		input = makeWordsArray(input);

		var matchCount = 0;

		//cycle through words array
		for(var i=0; i < words.length; i++) { //matter

			var wordCount = words[i].length;

			//cycle through input array
			for(var j=0; j < input.length; j++) {

				if(words[i] === input[j]) {

					matchCount +=1;
				}
			}
		}

		//function to take input and get rid of symbols and return the valid words as an array
		function makeWordsArray(words) {

			var symbols = [",", ".", "@", "/", "?", "!", '"']; //add symbols as needed
			var result = [];

			for(var i=0; i < words.length; i++) {

				//if current element is not a symbol or has a hyphen then add to new array
				//hyphen will get replaced with a space to separate valid words
				if(symbols.indexOf(words[i]) == -1 || words[i] == "-") {

						if(words[i] == "-") {
							result.push(" ");
						} else {
							result.push(words[i]);
						}
				}
			}

			return result.join('').split(' ');
		}

		return (matchCount > 0) ? true:false;
	}

	/********************************************
	//validator.lacks
	*********************************************/
	validator.lacks = function(input, words) {

		if(typeof input !== "string") {throw "input is not a string!";}

		input = makeWordsArray(input);

		var matchCount = 0;

		//cycle through words array
		for(var i=0; i < words.length; i++) { 

			var wordCount = words[i].length;

			//cycle through input array
			for(var j=0; j < input.length; j++) {

				if(words[i] === input[j]) {

					matchCount +=1;
				}
			}
		}

		//function to take input and get rid of symbols and return the valid words as an array
		function makeWordsArray(words) {

			var symbols = [",", ".", "@", "/", "?", "!", '"']; //add symbols as needed
			var result = [];

			for(var i=0; i < words.length; i++) {

				//if current element is not a symbol or has a hyphen then add to new array
				//hyphen will get replaced with a space to separate valid words
				if(symbols.indexOf(words[i]) == -1 || words[i] == "-") {

						if(words[i] == "-") {
							result.push(" ");
						} else {
							result.push(words[i]);
						}
				}
			}

			return result.join('').split(' ');
		}

		return (matchCount == 0) ? true:false;
	}

	/********************************************
	//validator.isComposedOf
	*********************************************/
	validator.isComposedOf = function(input, strings) {


		input = makeWords(input);
		strings = makeWords(strings);

		var inputCount = input.length;

		//console.log(input);

		for(var i=0; i < input.length; i++) {

			for(var j=0; j < strings.length; j++) {

				if(input[i] == strings[j]) {
					inputCount -= 1;
					break; // if matches, break to go to next letter to find a match
				}	
			}	
		}	

		//function to take input and get rid of symbols and return the valid words as an array
		function makeWords(words) {

			var symbols = [",", ".", "@", "/", "?", "!", '"', "'", " "]; //add symbols as needed
			var result = [];

			for(var i=0; i < words.length; i++) {

				//if current element is not a symbol or has a hyphen then add to new array
				//hyphen will get replaced with a space to separate valid words
				if(symbols.indexOf(words[i]) == -1 || words[i] == "-") {

					if(words[i] == "-") {
						result.push(" ");
					} else {
						result.push(words[i]);
					}
				}
			}

			return result.join('');
		}

		return (inputCount == 0) ? true:false;
	}

	// console.log(validator.isComposedOf("little falls", ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 
	// 							'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
	// 							'q', 'r', 's','t', 'u', 'v', 'w', 'x', 'y', 'z']))

	/********************************************
	//validator.isLength
	*********************************************/
	validator.isLength = function(input, n) {

		return (input.length <= n) ? true:false;

	}

	/********************************************
	//validator.isOfLength
	*********************************************/
	validator.isOfLength = function(input, n) {

		return (input.length >= n) ? true:false;

	}

	/********************************************
	//validator.countWords
	*********************************************/
	validator.countWords = function(input) {

		var symbols = [",", ".", "@", "/", "?", "!", '"']; //add symbols as needed
		var result = [];

			for(var i=0; i < input.length; i++) {

				//if current element is not a symbol or has a hyphen then add to new array
				//hyphen will get replaced with a space to separate valid words
				if(symbols.indexOf(input[i]) == -1 || input[i] == "-") {

					if(input[i] == "-") {
						result.push(" ");
					} else {
						result.push(input[i]);
					}
				}
			}

		return (result.length == 0) ? 0: result.join('').split(' ').length;
	}

	/********************************************
	//validator.lessWordsThan
	*********************************************/
	validator.lessWordsThan = function(input, n) {

		var symbols = [",", ".", "@", "/", "?", "!", '"']; //add symbols as needed
		var result = [];

			for(var i=0; i < input.length; i++) {

				//if current element is not a symbol or has a hyphen then add to new array
				//hyphen will get replaced with a space to separate valid words
				if(symbols.indexOf(input[i]) == -1 || input[i] == "-") {

					if(input[i] == "-") {
						result.push(" ");
					} else {
						result.push(input[i]);
					}
				}
			}

			//if(result.length)
			return (result.join('').split(' ').length <= n) ? true:false;
	}

	/********************************************
	//validator.moreWordsThan
	*********************************************/
	validator.moreWordsThan = function(input, n) {

		var symbols = [",", ".", "@", "/", "?", "!", '"']; //add symbols as needed
		var result = [];

		//console.log(input);

			for(var i=0; i < input.length; i++) {

				//if current element is not a symbol or has a hyphen then add to new array
				//hyphen will get replaced with a space to separate valid words
				if(symbols.indexOf(input[i]) == -1 || input[i] == "-") {

					if(input[i] == "-") {
						result.push(" ");
					} else {
						result.push(input[i]);
					}
				}
			}

			// console.log(result.join('').split(' '));
			// console.log(result);

		//if(result.length)
		return (result.join('').split(' ').length >= n) ? true:false;
	}

	/********************************************
	//validator.isBetween
	*********************************************/
	validator.isBetween = function(input, floor, ceil) {

		return (input >= floor && input <= ceil) ? true:false;
	}

	/********************************************
	//validator.isAlphanumeric
	*********************************************/
	validator.isAlphanumeric = function(input) {

		var lowerCaseLetters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 
								'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
								'q', 'r', 's','t', 'u', 'v', 'w', 'x', 'y', 'z']

		var upperCaseLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
								'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

		var numbers = ["0","1","2","3","4","5","6","7","8","9"];

		var count = input.length;

		var countLower = compareArrays(input, lowerCaseLetters);
		var countUpper = compareArrays(input, upperCaseLetters);
		var countNumbers = compareArrays(input, numbers);


		return (count == (countLower + countUpper + countNumbers)) ? true: false;

		function compareArrays(a,b) {

			var count = 0;

			for(var i=0; i < a.length; i++) {

				for(var j=0; j < b.length; j++) {

					if(a[i] === b[j]) {
						count +=1;
						break; //if letters match, break loop and go to next letter to compare
					}
				}
			}

			return count;
		}
	}

	//console.log(validator.isAlphanumeric("slam poetry"));

	/********************************************
	//validator.isCreditCard
	*********************************************/
	validator.isCreditCard = function(input) {

		var upperCaseLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K',
								'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

		var numbers = ["0","1","2","3","4","5","6","7","8","9"];

		var count = 0;

		//console.log(input);
		//loop through input and compare for valid alphachars
		for(var i=0; i < input.length; i++) {

			if(input[i] !== "-") {

				//check upperCase
				for(var j=0; j < upperCaseLetters.length; j++) {

					if(input[i] === upperCaseLetters[j]) {
						count+=1;
						break;
					}
				}

				//check numbers
				for(var k=0; k < numbers.length; k++) {

					if(input[i] === numbers[k]) {
						count+=1;
						break;
					}
				}	
			}
		}

		return (count == 16) ? true:false;
	}

	// console.log(validator.isCreditCard("1111-1111-1111-1111"));

	/********************************************
	//validator.isHex
	*********************************************/
	validator.isHex = function(input) {

		if(input[0] !== "#") {
			return false;
		}

		var validHex = ["a", "b", "c", "d", "e", "f", "0","1","2","3","4","5","6","7","8","9"];

		var count = 1; //start at 1 for # sign

		for(var i=0; i < input.length; i++) {

			for(var j=0; j < validHex.length; j++) {

				if(input[i] == validHex[j]) {
					count+=1;
					break; //go to next letter to compare
				}
			}
		}

		return (count == 4 || count == 7) ? true:false;
	}

	/********************************************
	//validator.isRGB
	*********************************************/
	validator.isRGB = function(input) {

		input = input.substr(input.indexOf("(")+1,input.indexOf(")") -4);

		input = input.split(',');

		console.log(input);

		if(input.length == 3) {

			for(var i=0; i < input.length; i++) {

				var val = input[i].trim();

				if(val < 0 || val > 255) {
					return false;
				}
			}
		} else {
			return false;
		}	

		return true;
	}

	/********************************************
	//validator.isHSL
	*********************************************/
	validator.isHSL = function(input) {

		input = input.substr(input.indexOf("(")+1,input.indexOf(")") -4);

		input = input.split(',');

		if(input.length == 3) {

			for(var i=0; i < input.length; i++) {

				var val = input[i].trim();

				if(i == 0) {
					if(input[i] < 0 || input[i] > 360) {
						return false;
					}
				} else {
					if(input[i] < 0 || input[i] > 2) {
						return false;
					}
				}
			}
		} else {
			return false;
		}	

		return true;
	}

	/********************************************
	//validator.isColor
	*********************************************/
	validator.isColor = function(input) {

		
		if(validator.isHex(input)) {
			return true;
		} else if(validator.isRGB(input)) {
			return true;
		} else if(validator.isHSL(input)) {
			return true;
		} else {
			return false;
		}
	}

	/********************************************
	//validator.isTrimmed
	*********************************************/
	validator.isTrimmed = function(input) {

		input = input.split(' ');

		for(var i=0; i < input.length; i++) {

			if(input[i] == "") {
				return false;
			}
		}

		return true;
	}

	//console.log(validator.isTrimmed("harmony and irony"));

	window.validator = validator;



})(window);