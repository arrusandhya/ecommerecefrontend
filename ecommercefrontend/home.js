import addProduct, { handelAddProductBind } from "./addProducts.js"
import cart from "./cart.js";

let home=()=>{



(async()=>{
try {
     let res=await fetch('http://localhost:5000/api/products/all')
    let data=await res.json()
    // console.log(res);
    if(res.status==200){
        // console.log(data);
      let modifiedArray=  data.map((produ)=>{
          return `
    <div class="card">
    <img src=${produ.image} alt=${produ.title} />
    <div class="card-content">
        <div class="card-tandp">
              <div class="card-title">${produ.title}</div>
               <div class="card-price">₹ ${produ.price}</div>
        </div>
      <div class="card-description">${produ.description.substring(0, 120)}...</div>
    </div>
    <div class="card-footer">
      <div class="stock">In Stock: ${produ.stock}</div>
      <button class="buy-btn" data-product='${encodeURIComponent(JSON.stringify(produ))}'}>Add to Cart</button>
    </div>
  </div>
          
          `
            
        }).join("");

        // console.log(modifiedArray);

            function getCart(){
      let data=sessionStorage.getItem('cart')
      let parsedData=JSON.parse(data)||[]
      return parsedData.length
      
    }

        root.innerHTML=`<div class="cardContainer">
        <div class="icon-container">
        <i class="fa-solid fa-cart-shopping"></i>
        <div class='getCartData'>${getCart()}</div>
        </div>
        ${modifiedArray}
        <a href="addProduct" id="add">+</a>
        </div>`


        setTimeout(()=>{

  
        let anchor=document.querySelector("#add")

    const handelClickAnchor=(e)=>{
        e.preventDefault()
        history.pushState({},"",`${e.target.pathname}`)
        root.innerHTML=addProduct()
        handelAddProductBind()
    }
    anchor.addEventListener('click',handelClickAnchor)




    function addToCart(e){
    let encoded = e.target.getAttribute("data-product");
    // console.log(encoded);
    
  let product = JSON.parse(decodeURIComponent(encoded));
  // console.log(product);

  let storedData=JSON.parse(sessionStorage.getItem('cart'))||[]
  // console.log(storedData);
  
storedData.push(product)
sessionStorage.setItem('cart',JSON.stringify(storedData))
 let div=document.querySelector("div[class='getCartData']")
 div.textContent=`${getCart()}`
      
    }

    const button=document.querySelectorAll('button[class="buy-btn"]')
button.forEach((btn)=>{
  btn.addEventListener('click',addToCart)
})


function handelCartDivClicked(){
  cart()
}
 let div=document.querySelector("div[class='getCartData']")

 div.addEventListener("click",handelCartDivClicked)

});
    }else{
    alert("Something went wrong")

    }
} catch (error) {
   console.log(error);
    alert("Something went wrong")
}
    
})();

    


}



export default home