let cart = () => {
  let data = sessionStorage.getItem('cart');
  let parsedData = JSON.parse(data) || [];

  if (!parsedData.length) {
    root.innerHTML = `<h1>No Items Added</h1>`;
    return;
  }


  let itemMap = {};

  for (let item of parsedData) {
    if (itemMap[item._id]) {
      itemMap[item._id].quantity += 1;
    } else {
      itemMap[item._id] = { ...item, quantity: 1 };
    }
  }


  let finalItems = Object.values(itemMap);

  // console.log(itemMap);
  
  // console.log("Original:", parsedData);
  // console.log("With Quantity:", finalItems);

setTimeout(()=>{
  function handelRemoveFromCart(e){
// console.log(id);
let id=e.target.getAttribute("data-id")
// console.log(id);
// console.log(e.target.previousElementSibling);
let quantity=e.target.previousElementSibling.innerText.replace("Quantity: ","")

console.log(quantity);
if(quantity>1){
e.target.previousElementSibling.innerText=`Quantity: ${quantity-1}`
}else{

}
}
const btn=document.querySelectorAll('button[class="buy-btn removeBtn"]')
// console.log(btn);
btn.forEach((bt)=>{
bt.addEventListener('click',handelRemoveFromCart)
})
})

 let modifiedArray=finalItems.map((produ)=>{
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
      <div class="stock">Quantity: ${produ.quantity}</div>
       <button class="buy-btn removeBtn" data-id=${produ._id}>Remove From Cart</button>
      </div>
  </div>
    
    `
 }).join("")

 root.innerHTML=`<div class="cardContainer">${modifiedArray}</div>`
};

export default cart;
