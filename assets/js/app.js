var cl = console.log;

let productsArr = [{
    pName : "Laptop",
    description : "Lorem ipsum, dolor  sit amet consectetur adipisicing elit. Repellendus corrupti, s  sit amet consectetur adipisicing elit. Repellendus corrupti, s sit amet consectetur adipisicing elit. Repellendus corrupti, s sit amet consectetur adipisicing elit. Repellendus corrupti, sapiente nemo in illo iure molestiae temporibus quisquam. Odit vero illum cum consequatur dolore nihil explicabo repudiandae labore accusamus aspernatur.",
    id : "111"
},{
    pName : "Mobile",
    description : " Repellendus corrupti, s sit amet consectetur adipisicing elit. Repellendus corrupti, sapiente nemo in illo iure molestiae temporibus quisquam. Odit vero illum cum consequatur dolore nihil explicabo repudiandae labore accusamus aspernatur.",
    id : "112"
},{
    pName : "Tab",
    description : "Lorem ipsum, dolor  sit amet consectetur adipisicing elit. Repellendus corrupti, s  sit amet consectetur adipisicing elit. Repellendus corrupti, s sit amet consectetur adipisicing elit. Repellendus corrupti, s sit amet consectetur adipisicing elit. Repellendus corruptiexplicabo repudiandae labore accusamus aspernatur.",
    id : "113"
},{
    pName : "HeadPhone",
    description : "Lorem ipsum, dolor  sit amet consectetur adipisicing elit. Repellendus corrupti, s  sit amet cum consequatur dolore nihil explicabo repudiandae labore accusamus aspernatur.",
    id : "114"
}]

let productCard = document.getElementById("product-card")
let form = document.getElementById("form")
let pName = document.getElementById("pName")
let description = document.getElementById("description")
let addBtn = document.getElementById("addBtn")
let updateBtn = document.getElementById("updateBtn")

if(!sessionStorage.getItem("products")){
    sessionStorage.setItem("products", JSON.stringify(productsArr))
}

let products = JSON.parse(sessionStorage.getItem("products"))

//========================== 1. Templating ==================================
function templatingData(productsArr){
    let result = "";
    productsArr.forEach((ele) => {
        result += ` <div class="col-3 mt-4 select" id=${ele.id}>
                                <div class="card result-card fixed-height">
                                      <div class="result-heading"> <h4> ${ele.pName} </h4></div>
                                       <div class="result-description">
                                         <p> ${ele.description}</p>
                                       </div>
                                       <div class="result-footer mb-0">
                                        <div class="d-flex justify-content-between">
                                             <button onClick="editCard(this)" id="editBtn" class="btn btn-warning text-white shadow"><b>Edit</b></button>
                                            <button onClick="deleteCard(this)" id="deleteBtn" class="btn btn-danger"><b>Delete</b></button>
                                        </div>
                                       </div>
                                  </div>
                                </div>`
    })
    productCard.innerHTML = result

}
templatingData(products)
//========================== 2. Adding ==================================
function addNewProdct(ele){
    ele.preventDefault()

    let newProductObj = {
        pName : pName.value,
        description : description.value,
        id : String(Date.now())
    }
    products.push(newProductObj)
    sessionStorage.setItem("products",JSON.stringify(products))

    productCard.innerHTML += ` <div class="col-3 mt-4 select" id=${newProductObj.id}>
                                <div class="card result-card fixed-height">
                                      <div class="result-heading"> <h4> ${newProductObj.pName} </h4></div>
                                       <div class="result-description">
                                         <p> ${newProductObj.description}</p>
                                       </div>
                                       <div class="result-footer">
                                        <div class="d-flex justify-content-between">
                                             <button onClick="editCard(this)" id="editBtn" class="btn btn-warning text-white shadow"><b>Edit</b></button>
                                            <button onClick="deleteCard(this)" id="deleteBtn" class="btn btn-danger"><b>Delete</b></button>
                                        </div>
                                       </div>
                                  </div>
                                </div>`

                                Swal.fire({
                                        title: "Added!",
                                        text: "Product Added Successfully",
                                        icon: "success" 
                                         });
    form.reset()
}
//========================== 3. Editing ==================================
function editCard(ele){
    let EDIT_ID = ele.closest(".select").id;

    let editCard = products.find(ele => ele.id === EDIT_ID)

    pName.value = editCard.pName
    description.value = editCard.description

    addBtn.classList.add("d-none")
    updateBtn.classList.remove("d-none")

    sessionStorage.setItem("EDIT_ID", EDIT_ID)
}

//========================== 4. Updating ==================================
function updateProduct(ele){
    let UPDATE_ID = sessionStorage.getItem("EDIT_ID")
    sessionStorage.removeItem("EDIT_ID")

    let getUpdatedProductIndex = products.findIndex(ele => ele.id === UPDATE_ID)

    let updatedProduct = {
        pName : pName.value,
        description: description.value,
        id : UPDATE_ID
    }

    products[getUpdatedProductIndex] = updatedProduct

    document.getElementById(UPDATE_ID).innerHTML = `  <div class="card result-card fixed-height">
                                      <div class="result-heading"> <h4> ${updatedProduct.pName} </h4></div>
                                       <div class="result-description">
                                         <p> ${updatedProduct.description}</p>
                                       </div>
                                       <div class="result-footer mb-0">
                                        <div class="d-flex justify-content-between">
                                             <button onClick="editCard(this)" id="editBtn" class="btn btn-warning text-white shadow"><b>Edit</b></button>
                                            <button onClick="deleteCard(this)" id="deleteBtn" class="btn btn-danger"><b>Delete</b></button>
                                        </div>
                                       </div>
                                  </div>`

                                  sessionStorage.setItem("products", JSON.stringify(products))
                                  addBtn.classList.remove("d-none")
                                  updateBtn.classList.add("d-none")

                                  Swal.fire({
                                        title: "Updated!",
                                        text: "Product Updated Successfully",
                                        icon: "success" 
                                         });

                                         form.reset()


}
//========================== 5. Deleting ==================================
function deleteCard(ele){
    let DELETE_ID = ele.closest(".select").id;

    Swal.fire({
     title: "Are you sure?",
     text: "You cant get this product back",
     icon: "warning",
     showCancelButton: true,
     confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.isConfirmed){
            let deltedProductIndex = products.findIndex(ele => ele.id === DELETE_ID)
    products.splice(deltedProductIndex, 1);

    sessionStorage.setItem("products", JSON.stringify(products))

    ele.closest(".select").remove()

    Swal.fire({
         title: "Deleted!",
         text: "Product has been deleted.",
         icon: "success"
    });
        } 
    });

    
}

form.addEventListener("submit", addNewProdct)
updateBtn.addEventListener("click", updateProduct)



























