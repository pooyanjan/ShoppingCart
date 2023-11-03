const products = [
    {id:1, name: 'guitar1', price:2000, image:'./assets/img/godin.jpg'},
    {id:2, name: 'guitar2', price:1000, image:'./assets/img/godin.jpg'},
    {id:3, name: 'guitar3', price:800,  image:'./assets/img/godin.jpg'},
    {id:4, name: 'guitar4', price:350,  image:'./assets/img/godin.jpg'}
]

 let cart = {
    items: [],
    total:0
 }



//نمایش اطلاعات محصول
const renderProducts = () => {
  const productDiv = document.querySelector('.row')
  productDiv.innerHTML = ''
 
  products.forEach((item, index) => {
    productDiv.innerHTML +=
    
    `
    <div class="card">
        <img src=${item.image}>
            <div class="content">
                <h2>${item.name}</h2>
                <h3>  ${item.price} تومان </h3>
            </div>
        <div class="btn">
            <button class="add-to-cart" onclick="addToCart(${index})"> افزودن به سبد خرید </button>
        </div>
    </div>
    `
  } )
}



//سبد خرید
const renderCartItems = () => {
 const cartDiv =  document.querySelector('.cart__items')
 cartDiv.innerHTML = ''
 
 const totalPriceEl =  document.querySelector('.cart__total-price')

 let totalPrice = 0

 if(cart.items.length === 0){
    cartDiv.innerHTML = 'محصولی در سبد خرید وجود ندارد'
 }

 cart.items.forEach((item) => {
  
 totalPrice += item.total
 cartDiv.innerHTML +=

 
`
  <div class="cart__item">
                <div class="col-md-4">
                  <button class="cart__item-remove" onclick="removeFromCart('${item.name}')">حذف</button>
                </div>
                <div class="col-md-4">
                  <div class="qty">${item.qty}</div>
                </div>
                <div class="col-md-4">
                  <h3 class="cart__item-title">${item.name}</h3>
                </div>
    </div> 
 `
 })

totalPriceEl.innerHTML = `مجموع : ${totalPrice} تومان`

}


//اضافه شدن به سبد خرید
const addToCart = (productIndex) => {
 /* Swal.fire({
    icon: 'success',
    text: 'محصول به سبد خرید اضافه شد',
    timer: 3000,
  }) */
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'محصول به سبد خرید اضافه شد',
    showConfirmButton: false,
    timer: 1200
  })
    const product = products[productIndex]
  
    let existingProduct = false
  
    let newCartItems = cart.items.reduce((state, item) => {
     
      if (item.name === product.name) {
        
        existingProduct = true
  
        const newItem = {
         
          ...item,
          qty: item.qty + 1,
          total: (item.qty + 1) * item.price,
        }
  
        return [...state, newItem]
       
      }
  
      return [...state, item]
    }, [])
  
    if (!existingProduct) {
      newCartItems.push({
        ...product,
        qty: 1,
        total: product.price,
      })
    }
  
    cart = {
      ...cart,
      items: newCartItems,
    }
  
    renderCartItems()
  }
  
// حذف از سبد خرید


  const removeFromCart = (productName) => {
    let newCartItems = cart.items.reduce((state, item) => {
      if (item.name === productName) {
        const newItem = {
          ...item,
          qty: item.qty - 1,
          total: (item.qty - 1) * item.price,
        }
  
        if (newItem.qty > 0) {
          return [...state, newItem]
        } else {
          return state
        }
      }
  
      return [...state, item]
    }, [])
  
    cart = {
      ...cart,
      items: newCartItems,
    }
  
    renderCartItems()
  }


renderProducts()
renderCartItems()
