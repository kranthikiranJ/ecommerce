async function categoryList(){
    try{
        let response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        let data  = await response.json()
        let {categories} = data
        console.log(categories)
        return categories
    }catch(error){
        console.log('Error : ', error)
        throw error
    }
}

function discountPercentage(p,c){
    return Math.round(((c-p)/c)*100)
}

function selectCategory(categoryName){
    const prodContainer = document.getElementById('productContainer')

    prodContainer.innerHTML = ""
    categoryList().then((categories)=> {
        const selectedCategory = categories.find((category)=>category.category_name===categoryName)
        if (selectCategory){
            selectedCategory.category_products.forEach((product)=>{
                const prodEl = document.createElement('div')
                prodEl.classList.add('product')
                prodEl.innerHTML = `
                <div class='product-img-container'>
                    <img src='${product.image}' alt='${product.title}'>${product.badge_text!==null && product.badge_text !== "" ? `<span class='badge'>${product.badge_text}</span>`:""}
                </div>
                <div class='prod-title-cont'>
                    <h2>${product.title}</h2>
                    <h4>${product.vendor}</h4>
                </div>
                <div class='prod-title-cont'>
                    <p class='price'>Rs${product.price}</p>
                    <p class='compare-price'>${product.compare_at_price}</p>
                    <p class='discount-off'>${discountPercentage(product.price,product.compare_at_price)}% Off</p>
                </div>
                <button class='add-to-cart-btn' >Add to Cart</button>
                `
                prodContainer.appendChild(prodEl)
            })
        }
    })
}


selectCategory('Men')