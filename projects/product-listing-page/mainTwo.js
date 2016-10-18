(function (window) {

	var cartGroup = document.getElementsByClassName('cart-group');
	var cart = document.getElementById('cart');
	var yourCart = document.getElementById('your-cart');
	var total = document.getElementById('total');
	var addButton = document.getElementsByClassName('cart-btn');
	var remove = document.getElementsByClassName('remove');
	var add = document.getElementsByClassName('add');
	var cartCount = document.getElementById('cart-count');
	var total = document.getElementById('total');
	var hide = document.getElementById('hide');
	var promoInfo = document.getElementById('promo-info');
	var promoForm = document.getElementById('promo-form');
	var chosenPromo = promoForm.elements['promo'];

	//object for storage of products
	var products = [];

	//promo object
	var promo = {
		all: {"message" : "Type ALL for 5% off your whole purchase", "code": .05, "isUsed": false},
		one: {"message": "Type ONE for 10% off a single item", "code":.10, "isUsed": false},
	};


	//hide cart initially
	hide.style.visibility = "hidden";


	/*********************************************************************
	//click event for "+" button for each product
	/*********************************************************************/
	for(var i=0; i < cartGroup.length; i++) {

		cartGroup[i].addEventListener('click', function(event) {

			event.preventDefault();

			//logic for "+" button
			if(event.target.innerHTML == "+") {

				//grab the p element value
				var element = Number(this.children[1].innerHTML)
				element+=1;
				this.children[1].innerHTML = element;
			};
		});
	};

	/*********************************************************************
	//click event for "Add" button for each product
	**********************************************************************/
	for(var i=0; i < addButton.length; i++) {

		addButton[i].addEventListener('click', function(event) {

			event.preventDefault();

			//set all the product variables
			var title = this.parentNode.parentNode.children[1].children[0].innerHTML.trim();
			var price = this.parentNode.parentNode.children[1].children[2].innerHTML.trim();
				price = price.substr(price.indexOf('$')+1, price.length);
			var quantity = this.parentNode.parentNode.children[1].children[3].children[1].innerHTML.trim();
			var image = this.parentNode.children[0].children[0].getAttribute('src');

			//for each quantity value add the item to products object
			for(var i=0; i < quantity; i++) {
				//console.log("logged");

				var product = {
					"title": title, 
					"price":price, 
					"quantity":1,
					"image":image,
					"domQuantity" : this.parentNode.parentNode.children[1].children[3].children[1],
					"domPlusSign" : this.parentNode.parentNode.children[1].children[3].children[0]
				};

				products.push(product);

			};


			//add only one product to the cart.
			if(products.)

			for(var i=0; i < products.length; i++) {

				//console.log(products[i].title);

				// //only add to cart if not exists
				console.log(currentProduct)
				console.log(products[i].title);
				if(currentProduct !== products[i].title) {

					//add product to the cart 
					var html = '<div class="cart-section item">'
						html += '<section class="product">'
						html +=	'<section class="standard">'
						html += '<p> <img src="http://placehold.it/350x350"> </p>'
						html +=	'</section>'


						html+=	'<section class="standard" id="' + products[i].title + '">'
						html+=	'<p>' + products[i].title +'</p>'
						html+=	'<p>' + products[i].price + '</p>'
						html+=	'<p>Quantity:' + quantity +'</p>' // quantity will be the quantity of what user inputs
						html+=	'<button class="remove"> Remove </button>'
						html+=	'<button class="add"> add </button>'
						html+=	'</section>'
						html+= '</section>'
						html+= '</div>'

						cart.innerHTML += html;	

						currentProduct = products[i].title;						
				};

			};

			//update cart quantity
				// var count = products
			 // 	cartCount.innerHTML = count;


			 	//unhide cart
				hide.style.visibility = "visible";




			//only add product if it's not in the products object and a quantity is set
			// if(!products[title] && quantity != 0) {

			// 	//add product to the cart storage object
			// 	products[title] = {
			// 		"title": title, 
			// 		"price":price, 
			// 		"quantity":quantity,
			// 		"image":image,
			// 		"domQuantity" : this.parentNode.parentNode.children[1].children[3].children[1],
			// 		"domPlusSign" : this.parentNode.parentNode.children[1].children[3].children[0]
			// 	};


			// 	//add product to the cart 
			// 	var html = '<div class="cart-section item">'
			// 		html += '<section class="product">'
			// 		html +=	'<section class="standard">'
			// 		html += '<p> <img src="http://placehold.it/350x350"> </p>'
			// 		html +=	'</section>'


			// 		html+=	'<section class="standard" id="' + title + '">'
			// 		html+=	'<p>' + title +'</p>'
			// 		html+=	'<p>' + price + '</p>'
			// 		html+=	'<p>Quantity:' + quantity +'</p>'
			// 		html+=	'<button class="remove"> Remove </button>'
			// 		html+=	'<button class="add"> add </button>'
			// 		html+=	'</section>'
			// 		html+= '</section>'
			// 		html+= '</div>'

			// 	cart.innerHTML += html;

			// 	//add product to the cart array
			// 	//cartItems.push(title);

			// 	//update cart quantity
			// 	var count = document.getElementsByClassName('item').length;
			//  	cartCount.innerHTML = count;

			// 	//update total price
			// 	var currentPrice = Number(total.innerHTML);
			// 	currentPrice += (products[title].price * products[title].quantity);
			// 	total.innerHTML = currentPrice;
			// 	console.log(currentPrice);

			// 	//reset product quantity count to 1 and hide plus sign from item
			// 	products[title].domQuantity.innerHTML = 1;
			// 	products[title].domPlusSign.style.visibility = "hidden";

			// 	//unhide cart
			// 	hide.style.visibility = "visible";

			// 	//add promo info
			// 	promoInfo.innerHTML = promo.all.message + '<br>';
			// 	promoInfo.innerHTML += promo.one.message + '<br>';


			// };


			/*********************************************************************
			//click event for "Remove" button on cart item
			**********************************************************************/
			for(var i=0; i < remove.length; i++) {

				remove[i].addEventListener('click', function(event) {

					var parent = this.parentNode.parentNode.parentNode.parentNode;
					var child = this.parentNode.parentNode.parentNode;

					//get title of clicked cart item
					var title = this.parentNode.children[0].innerHTML.trim();
					//get quantity of clicked cart item
					var quantity = this.parentNode.children[2];

					//get current total price and set new price 
					var currentPrice = Number(total.innerHTML);
					currentPrice = currentPrice - Number(products[title].price);
					total.innerHTML = currentPrice.toFixed(2);


					//set quantity on cart item to be one less. if equal to zero, remove item from cart
					//and update total 
					if(products[title].quantity-1 == 0) {

						//unhide plusSign for product
			 			products[title].domPlusSign.style.visibility = "visible";

						delete products[title];
						//cartItems.splice(cartItems.indexOf(title), 1);
						parent.removeChild(child);

						//update cart quantity
						var count = document.getElementsByClassName('item').length;
			 			cartCount.innerHTML = count;


			 			//hide cart if no items in it
			 			if(count == 0) {
			 				hide.style.visibility = "hidden";
			 			}

					} else {

						//set 
						products[title].quantity-=1;
						quantity.innerHTML = 'Quantity:' + products[title].quantity;
					}
				});
			};

			/*********************************************************************
			//click event for "Add" button on cart item
			**********************************************************************/	
			for(var i=0; i < add.length; i++) {

				add[i].addEventListener('click', function(event) {

					var parent = this.parentNode.parentNode.parentNode.parentNode;
					var child = this.parentNode.parentNode.parentNode;

					//get title of clicked cart item
					var title = this.parentNode.children[0].innerHTML.trim();
					//get quantity of clicked cart item
					var quantity = this.parentNode.children[2];

					//get current total price and set new price 
					var currentPrice = Number(total.innerHTML);
					currentPrice = currentPrice + Number(products[title].price);
					total.innerHTML = currentPrice.toFixed(2);

					//add one to the item quantity
					products[title].quantity = Number(products[title].quantity) + 1;
					quantity.innerHTML = 'Quantity:' + products[title].quantity;
				});
			};
		});
	};



	/*********************************************************************
	//submit event for "Apply" promo button on cart item
	**********************************************************************/	
	promoForm.addEventListener('submit', function(event) {

		event.preventDefault();

		var promoVal = chosenPromo.value.toLowerCase().trim();

		if(promoVal == 'all') {

			//set variables to apply discount
			var currentTotal = Number(total.innerHTML);
			var discountCode = Number(promo[promoVal].code);
			var discount = currentTotal * discountCode;

			//apply discount
			currentTotal = currentTotal - discount;
			total.innerHTML = currentTotal.toFixed(2);

		};

		if(promoVal == 'one') {

			var maxPrice = 0;
			var title;
			console.log("works");
			console.log(products);
			//console.log(products.length)

			//cycle through cart items and get title and price of highest item
			for(var key in products) {

				if(products[key].price > maxPrice) {

					maxPrice = products[key].price;
					title = key;
				}
			}
			
			//reset price
			
		}

	});



})(window);