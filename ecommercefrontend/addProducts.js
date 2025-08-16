import home from "./home.js"

let addProduct=()=>{
    return `
    
<div class="registerForm">
    <form action="">
        <div>
            <h1>Add Products</h1>
        </div>
        <div>
            <input type="text" name="title" placeholder="title">
            <span><i class="fa-solid fa-signature"></i></span>
        </div>
        <div>
            <input type="number" name="price" placeholder="price">
            <span><i class="fa-solid fa-tag"></i></span>
        </div>

        <div >
            <select name="category">
                <option value="" selected disabled>Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="mensWear">Mens Wear</option>
                <option value="womensWear">Womens Wear</option>
                <option value="Kids">Kids</option>
            </select>
        </div>
        <div>
            <textarea name="description" placeholder="Description"></textarea>
            <span><i class="fa-solid fa-audio-description"></i></span>
        </div>
        <div class="removeBorder">
            <input type="file" accept="image/*"  name="image">
        </div>

    </form>
</div>

    `
}


export let handelAddProductBind=()=>{
    
const state={
  setState(name,value){
this[name]=value
  }
}


const form=document.querySelector('form')
const inputs=document.querySelectorAll('input')
const select=document.querySelector('select')
const textArea=document.querySelector('textarea')
const h1=document.querySelector("h1")


function handelChange(e){
  let {name,value,files}=e.target
if(name!="image"){
  state.setState(name,value)
}else{
  value=files[0]
  let reader=new FileReader()
  reader.onload=function(){

    form.style.transform="rotateY(180deg)"
   setTimeout(()=>{
     form.style.backgroundImage=`url(${reader.result})`
    inputs.forEach((inp)=>{
      inp.parentElement.style.display="none"
    })
    select.parentElement.style.display="none"
    textArea.parentElement.style.display="none"
    h1.parentElement.style.display="none"
    form.style.justifyContent="end"
    form.innerHTML=`
    
        <div>
           <button style="transform:rotateY(180deg)">Submit</button>
        </div>
    `

   },1000)

  }
  reader.readAsDataURL(value)

  state.setState(name,value)
}
}

function handelSubmmit(e){
e.preventDefault()
let {title,image,price,description,category}=state

let payload={title,description,price,image,category}
// console.log(payload);

let formData=new FormData()
for(let key in payload){
  formData.append(key,payload[key])
};

(async()=>{
try {
    let res=await fetch('http://localhost:5000/api/products/add',{
    method:"POST",
    body:formData,
  })
  let data=await res.json()
  console.log(res);
  console.log(data);
  if(res.status===201){
    alert(`${data.message}`)
    history.pushState({},"","home")
    root.innerHTML=home()
  }else{
  alert('smething went wrong')

  }
} catch (error) {
  console.log(error);
  alert('smething went wrong')
  
}
  
  
})()

}


inputs.forEach((inp)=>{
  inp.addEventListener('change',handelChange)
})

select.addEventListener('change',handelChange)
textArea.addEventListener('change',handelChange)
form.addEventListener('submit',handelSubmmit)
}

export default addProduct