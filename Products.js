const addbtn = document.getElementById("add");
const form = document.getElementById("postForm");
const imageUrl = document.getElementById("imageUrl");
const description = document.getElementById("description");
const rate = document.getElementById("rate");
const stock=document.getElementById("stock");
const layout = document.getElementById("right");
const deletebtn = document.getElementsByClassName("delete");


loadpage();

function loadpage(){
    document.addEventListener("DOMContentLoaded",loadproduct);
    
    addbtn.addEventListener("click",formappear);
    
    form.addEventListener("submit",(e)=>{
        addproduct(e);
        formdisappear();
    });

    layout.addEventListener("click",(e)=>{
        deleteproduct(e);
    });
}

function loadproduct(){
    let products;
    if (localStorage.getItem("products")===null) {
        products = [{
            Url: "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhbWVyYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=1000&q=60",
            desc: "Fujifilm Camera",
            price: "1000",
        }];
    }
    else{
        products = JSON.parse(localStorage.getItem("products"));
    }
    products.forEach((product)=>{
        addlisting(product.Url,product.desc,product.price,product.stock)
    })
}

function addproduct(e){
    e.preventDefault();
    console.log("HELLO");
    addlisting(imageUrl.value,description.value,rate.value);
    storagetogo(imageUrl.value,description.value,rate.value);
    imageUrl.value = '';
    description.value = '';
    rate.value = '';
    formdisappear;
}


function addlisting(Url,desc,price){
    const productadd = document.createElement("div");
    productadd.className = "gridItem";
    productadd.innerHTML = 
    `<div class="product">
        <div>
            <img src=${Url} alt="">
        </div>
        <div class="description">
            <p>${desc}</p>
        </div>
        <div class="rate">
            <p>Rs.<span>${price}</span>/-</p>
        </div>
        
        <div class="delete">
            <i class="fa-sharp fa-solid fa-trash-can" style="color: red;"></i>
        </div>
    </div>`;
    layout.prepend(productadd);
}


function storagetogo(Url,desc,price){
    let products;
    if (localStorage.getItem('products') == null) {
        products = [];
    }
    else {
        products = JSON.parse(localStorage.getItem('products'));
    }

    products.push({Url,desc,price});

    localStorage.setItem('products',JSON.stringify(products));
    console.log("done");
}

function formappear(){
    let displayform = document.getElementById("overlayForm");
    let background = document.getElementsByClassName("overlayBackground");
    displayform.style.display = "flex";
    background[0].addEventListener("click",()=>{
        displayform.style.display = "none";
    });
}

function formdisappear(){
    let displayform = document.getElementById("overlayForm");
    displayform.style.display = "none";
}

function deleteproduct(e){
    if (e.target.parentElement.parentElement.parentElement.classList.contains("gridItem")) {
        if (confirm("Are you sure you want to delete Product?")) {
            e.target.parentElement.parentElement.parentElement.remove();
            let productUrl = e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.firstElementChild.src;
            let descrip = e.target.parentElement.previousElementSibling.previousElementSibling.firstElementChild.innerText;
            let rate = e.target.parentElement.previousElementSibling.firstElementChild.firstElementChild.innerText;
            console.log(productUrl);
            console.log(descrip);
            console.log(rate);
            removefromstorage(productUrl,descrip,rate);
        }
    }
}


function removefromstorage(productUrl,descrip,rate) {
    let products = JSON.parse(localStorage.getItem('products'));
    let index = -1;

    products.forEach((product, i) => {
        if (productUrl == product.Url && descrip == product.desc && rate == product.price) {
            index = i;
        }
    });
    console.log(index);
    if (index > -1) {
        products.splice(index, 1);
    }

    localStorage.setItem('products', JSON.stringify(products));
    location.reload();
}