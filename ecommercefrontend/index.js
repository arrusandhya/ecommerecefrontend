import addProduct from "./addProducts.js"
import home from "./home.js"
import login, { handelLoginbind } from "./login.js"
import register, { handelRegisterBind } from "./register.js"

const root=document.getElementById('root')
const allAnchors=document.querySelectorAll('a')

const router={
    "/login":[login,handelLoginbind],
    "/register":[register,handelRegisterBind],
    "/home":[home]
}
let path=window.location.pathname.replace("/ecommercefrontend","")
console.log(path);

if(path=="/index.html"){
root.innerHTML=login()
handelLoginbind()
}

function handelClick(e){
  e.preventDefault()
//   console.log(e.target.pathname);
let path=e.target.pathname
console.log(path);

if(path=="/index.html"){
root.innerHTML=login()
handelLoginbind()
}else{
    history.pushState(null,"",`${path}`)
root.innerHTML=router[path][0]()
if(router[path][1]){
  router[path][1]()
}
}
}
allAnchors.forEach((anchor)=>{
    anchor.addEventListener("click",handelClick)
})

window.addEventListener('popstate',(e)=>{
  // console.log(location);
  let path=location.pathname
  // console.log(path);
  
if(path=="/index.html"){
root.innerHTML=login()
handelLoginbind()
}else{
  root.innerHTML=router[path][0]()
 if( router[path][1]){
   router[path][1]()
 }
}
  
})




