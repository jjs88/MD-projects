(function (global) {


	// products functionality
	var products = {

		init: function() {

			this.cacheDOM();
			this.events();
		},

		cacheDOM: function() {

			this.productsContainer = document.getElementById('products-container');			
		},

		events: function() {


			//click event on the product container - use bubble down to detect events on buttons
			this.productsContainer.addEventListener('click', function(e) {

				e.preventDefault();

				//target event for 'add' button
				if(e.target.getAttribute('class') == 'add') {
					products.addToCart(e.target);
				}


				//target event for 'plus' button. Add 1 for each click.
				if(e.target.getAttribute('class') == 'plus') {
					products.addQuantity(e.target);
				}

			});
		
		//end of events 
		},

		addToCart: function(target) {

			//gather values for the product
			var title = target.parentNode.parentNode.children[0].innerHTML;
			var price = target.parentNode.parentNode.children[2].innerHTML;
				price = Number(price.substr(price.indexOf('$')+1, price.length));
			var quantity = Number(target.parentNode.parentNode.children[3].children[2].innerHTML);
			var image = target.parentNode.parentNode.parentNode.children[0].children[0].getAttribute('src');
			var buttonControlRef = target.parentNode;

			//make product object
			var product = {
				'title': title,
				'price': price,
				'quantity': quantity,
				'image': image,
				'cartPrice': price * quantity,
				'buttonControlRef': buttonControlRef
			}

			//add product to the cart
			var html = '<div class="product">'
				html += '<div class="img-container">'
				html +=	'<img src="' + product.image + '">'
				html += '</div>'
				html +=	'<div class="product-info">'


				html+=	'<h3>' + product.title + '</h3>'
				html+=	'<p>$' + product.cartPrice.toFixed(2) + '</p>'
				html+=	'<p>Quantity: ' + product.quantity +'</p>'
				html+=	'<button class="remove"> Remove </button>'
				html+=	'<button class="add"> add </button>'
				html+= '</div>'
				html+= '</div>'

				cart.cart.innerHTML += html;

				//add product object to the cartItems object
				cart.cartItems[product.title] = product;

				//add product title to title reference object
				cart.titleReference.push(product.title);

				//add quantity to cart total
				cart.cartQuantity();

				//add price to checkout total
				cart.checkoutTotalPrice();

				//hide buttons on product since its in the cart now
				target.parentNode.className += ' hide';

				//unhide cart and checkout since there is a product in the cart
				cart.cart.className = '';
				cart.checkOutContainer.className = '';

				//reset promo price if boolean is true
				if(promotion.allApplied == true) {
					promotion.discountAll();
				}


		},

		addQuantity: function(target) {

			var currentQty = Number(target.nextSibling.nextSibling.innerHTML);
			currentQty += Number(1);

			//add quantity +1
			target.nextSibling.nextSibling.innerHTML = currentQty;
		}
	}


	// cart functionality
	var cart = {

		init:function() {
			this.cacheDOM();
			this.events();
		},

		cacheDOM: function() {

			this.cart = document.getElementById('cart');
			this.cartNumber = document.getElementById('cart-number');
			this.checkoutPrice = document.getElementById('checkout-price');
			this.checkOut = document.getElementById('checkout');
			this.checkOutContainer = document.getElementById('checkout-container');
			this.cartItems = [];
			this.titleReference = [];
		},

		events: function() {

			this.cart.addEventListener('click', function(e) {

				e.preventDefault();

				//target event for 'remove' button
				if(e.target.getAttribute('class') == 'remove') {
					cart.removeItem(e.target);
				}

				//target event for 'add' button
				if(e.target.getAttribute('class') == 'add') {
					cart.addItem(e.target);
				}
			});

		//end of events 
		},

		removeItem: function(target) {

			//get title
			var title = target.parentNode.children[0].innerHTML;

			//get cart object
			var item = cart.cartItems[title];

			//decrease the quantity on the cart item object
			item.quantity -=1;

			//update cart item quantity html value
			target.previousSibling.innerHTML = 'Quantity: ' +item.quantity;

			//update cart quantity html value
			this.cartQuantity();

			//update price on cart item object
			item.cartPrice = (item.quantity * item.price).toFixed(2);

			//update price on checkout html
			this.checkoutTotalPrice();

			//update quantity on html
			target.previousSibling.previousSibling.innerHTML = '$' + item.cartPrice;

			//reset promo price if boolean is true
			if(promotion.allApplied == true) {
				promotion.discountAll();
			}

			//if the quantity = 0 then remove from cart and run function to make product buttons visible
			if(item.quantity == 0) {
				target.parentNode.parentNode.parentNode.removeChild(target.parentNode.parentNode);
				cart.productButtonsVisible(target);

				//remove from cart object
				delete cart.cartItems[title];

				//remove from titleReference array
				var pos = cart.titleReference.indexOf(title);
				cart.titleReference.splice(pos, 1);
			}

			//if no items in the cart, hide the cart
			if(this.cart.children.length == 0) {
				//hide cart and checkout since there is no product in the cart
				cart.cart.className = 'hide';
				cart.checkOutContainer.className = 'hide';
			}

			
		},

		addItem: function(target) {

			//get title
			var title = target.parentNode.children[0].innerHTML;

			//get cart object
			var item = cart.cartItems[title];

			//increase the quantity on the cart item object
			item.quantity +=1;

			//update cart item quantity html value
			target.previousSibling.previousSibling.innerHTML = 'Quantity: ' +item.quantity;

			// //update cart quantity html value
			this.cartQuantity();

			// //update price on cart item object
			item.cartPrice = (item.quantity * item.price).toFixed(2);

			//update price on checkout html
			this.checkoutTotalPrice();

			//reset promo price if boolean is true
			if(promotion.allApplied == true) {
				promotion.discountAll();
			}

			// //update quantity on html
			target.previousSibling.previousSibling.previousSibling.innerHTML = '$' + item.cartPrice;

		},

		productButtonsVisible: function(target) {

			var title = target.parentNode.children[0].innerHTML;

			var item = cart.cartItems[title];
			//make buttons and quantity visible on product again
			item.buttonControlRef.className = "";
			//reset quanitity to 1
			item.buttonControlRef.children[2].innerHTML = 1;

		},

		cartQuantity: function() {

			var count = 0;

			//loop through titleReference array to get total count of cart items
			for(var i = 0; i < this.titleReference.length; i++) {
				count += this.cartItems[this.titleReference[i]].quantity;
			}

			//update cart quantity total
			this.cartNumber.innerHTML = count;
		},

		checkoutTotalPrice: function() {

			var price = 0.00;

			//loop through titleReference array to get total price of cart items
			for(var i = 0; i < this.titleReference.length; i++) {
				price += parseFloat(this.cartItems[this.titleReference[i]].cartPrice);
			}

			this.checkoutPrice.innerHTML = price;
		}
	}


	var promotion = {

		init:function() {
			this.cacheDOM();
			this.events();
		},

		cacheDOM: function() {
			this.promo = document.getElementById('promo');
			this.promoForm = document.getElementById('promo-form');
			this.all = this.promoForm.elements['promo-input'];
		},

		events: function () {

			this.promoForm.addEventListener('submit', function(e) {

				e.preventDefault();

				//apply ALL promo if its not already been applied
				if(promotion.all.value.toLowerCase() == 'all' && promotion.allApplied == false) {
					promotion.discountAll();
				}
			})
		},

		All: .05,
		One: .10,
		allApplied: false,
		oneApplied: false,

		discountAll: function() {
			//get current total and apply discount
			var currentPrice = parseFloat(cart.checkoutPrice.innerHTML);
			var discount = parseFloat(cart.checkoutPrice.innerHTML) * this.All;
			var price = parseFloat(currentPrice - discount).toFixed(2);
			//set allApplied to true
			cart.checkoutPrice.innerHTML = price;

			//set allApplied to true
			this.allApplied = true;

		},

		discountOne: function() {

		}
	}





	// initialize obejcts
	products.init();
	cart.init();
	promotion.init();



})(window);