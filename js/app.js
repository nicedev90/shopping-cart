window.addEventListener('DOMContentLoaded', () => {

	// mostart ocultar carrito
	const cart = getUni('#shop-cart')
	const btnCart = getUni('#btn-cart')
	btnCart.addEventListener('click', () => {
		cart.classList.toggle('hidden')
	})

	// botones eliminar items
	const btnRemove = getAll('#btn-remove')
	btnRemove.forEach((btn) => {
		btn.addEventListener('click', removeItem)
	})

	// actualizar cantidad de items
	const itemShop = getAll('#item-shop-qt')
	itemShop.forEach((input) => {
		input.addEventListener('change',changeQuant)
	})

	const itemCart = getAll('#item-cart-qt')
	itemCart.forEach((input) => {
		input.addEventListener('change',changeQuant)
	})

	// botones del shop
	const btnAdd = getAll('#item-button')
	btnAdd.forEach((btn) => {
		btn.addEventListener('click', addItem)
	})
	
});


const removeItem = (e) => {
	e.target.closest('.cart-item').remove()
}

const changeQuant = (e) => {
	const quantity = e.target
	if(isNaN(quantity.value) || quantity.value <= 0) {
		quantity.value = 1
	}

	// updateCartTotal()
}

const addItem = (e) => {
	const shopItem = e.target.closest('#shop-item')
	const title = shopItem.querySelector('#item-title').innerText
	const code = shopItem.querySelector('#item-code').innerText
	let quant = shopItem.querySelector('#item-shop-qt').value
	quant = parseInt(quant)
	let price = shopItem.querySelector('#item-price').innerText
	price = parseFloat(price.replace('$', ''))
	console.log(price + quant)
	addToCart(code,title,quant,price)
	// console.log(price)
}

const addToCart = (code,title,quant,price) => {
	const cartItem = create('div')
	cartItem.classList.add('cart-item','flex','flex-col','justify-between','border-b-2','md:flex-row','md:w-full','bg-teal')

	const cartMain = getUni('#cart-main')
	const itemCodes = cartMain.querySelectorAll('#item-code')
	for(let i=0; i < itemCodes.length; i++) {
		if(itemCodes[i].innerText == code) {
			alert('el producto ya esta en carrito')
			return
		}
	}

	let subto = quant*price

	const cartItemContent = `
		<!-- ONLY MOBILE HEADING -->
				<div class="flex space-x-2 text-sm md:hidden">
					<div class="w-1/4">
						<span id="item-code">CODIGO</span>
					</div>

					<div class="w-full">
						<span id="item-description">DESCRIPCION</span>
					</div>

					<div class="w-max">
						<button id="btn-remove">
						<i class="fa-solid fa-trash text-xl px-1 md:px-3"></i>
						</button>
					</div>
				</div>

				<!-- ITEM CODIGO Y DESCRIPCION -->
				<div class="flex py-2 md:py-0 md:justify-around md:space-x-4">
					<div class="w-1/4 md:text-center md:w-24">
						<span id="item-code">${code}</span>
					</div>

					<div class="w-full md:w-96 md:px-4">
						<span id="item-description">${title}</span>
					</div>
				</div>

				<!-- ONLY MOBILE HEADING -->
				<div class="flex text-center text-sm justify-end space-x-2 md:hidden">
					<div class="w-1/4">
						<span>CANTIDAD</span>
					</div>

					<div class="w-1/4">
						<span id="item-unit">P. UNIT</span>
					</div>

					<div class="w-1/4">
						<span id="item-total">P. TOTAL</span>
					</div>
				</div>

				<!-- ITEM CANTIDAD P UNIT y  P TOTAL -->
				<div class="flex text-center justify-end space-x-2 md:w-full md:justify-around">
					<div class="w-1/4">
						<input id="item-cart-qt" type="number" class="w-16" value="${quant}">
					</div>
					<div class="w-1/4">
						<span id="">${price}</span>
					</div>
					<div class="w-1/4">
						<span id="item-subtotal">${subto}</span>
					</div>
					<div class="hidden md:block md:w-max">
						<button id="btn-remove">
							<i class="fa-solid fa-trash text-xl px-1 md:px-3"></i>
						</button>
					</div>
				</div>
		`
	cartItem.innerHTML = cartItemContent
	cartMain.prepend(cartItem)

	cartItem.querySelector('#btn-remove').addEventListener('click', removeItem)
	cartItem.querySelector('#item-qt').addEventListener('click', changeQt)
	// console.log(cartItem)
}

const updateCartTotal = () => {
	const cartMain = getUni('#cart-main')
	const cartItems = cartMain.querySelector('.cart-item')
}


const create = element => document.createElement(element)
const getUni = element => document.querySelector(element)
const getAll = element => document.querySelectorAll(element)

//  ejemplo de callback function (cuando una funcion es pasada como parametro a otra)
function foo(bar){
console.log("I'm foo");
bar();
}

function bar(){
console.log("I'm bar")
}

// foo(bar);
