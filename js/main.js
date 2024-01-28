
$("li").css("top", 300);

$(".open-close-icon").click( ()=> {
    if (!$(".open-close-icon").hasClass("opened")) {
       showSideNav();
    }
    else {
        hideSideNav();
    }
})

function showSideNav() {
    $("#side-nav").animate({left:"0"},600 , function () {
        $("li").animate({top:"0"},150)
    })
    $(".open-close-icon").addClass("opened")
    $(".open-close-icon").addClass("fa-x")
    $(".open-close-icon").removeClass("fa-align-justify")
}

function hideSideNav() {
    $("#side-nav").animate({left:"-256.562"},600 , function () {
        $(".nav-links li").animate({top:"300"})
    })
    $(".open-close-icon").removeClass("opened")
    $(".open-close-icon").removeClass("fa-x")
    $(".open-close-icon").addClass("fa-align-justify")
}

let links = document.querySelectorAll("li")
links.forEach((li) => {
    li.addEventListener("click",()=>{
        hideSideNav();
    })
})

let home = document.getElementById("home");
let result;
let content = "" ;

let loading = `<div id="loading" class="w-100 min-vh-100 d-flex justify-content-center align-items-center">
<div class="sk-circle">
    <div class="sk-circle1 sk-child"></div>
    <div class="sk-circle2 sk-child"></div>
    <div class="sk-circle3 sk-child"></div>
    <div class="sk-circle4 sk-child"></div>
    <div class="sk-circle5 sk-child"></div>
    <div class="sk-circle6 sk-child"></div>
    <div class="sk-circle7 sk-child"></div>
    <div class="sk-circle8 sk-child"></div>
    <div class="sk-circle9 sk-child"></div>
    <div class="sk-circle10 sk-child"></div>
    <div class="sk-circle11 sk-child"></div>
    <div class="sk-circle12 sk-child"></div>
</div>
</div>`



// -------------home---------

async function displayhome(){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    result = await response.json();
    diplay(result);
}

displayhome();

// -------------Categories---------

async function displayCategories(){
    content = loading;
    home.innerHTML = content
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    result = await response.json();
    let categories = result.categories;
    content ="";
    for(let i=0 ; i < categories.length ; i++){
        content += `
        <div class="col-md-3" onclick="displaySide('${categories[i].strCategory}')">
        <div class="position-relative overflow-hidden rounded-2 meal bg-warning">
            <img src="${categories[i].strCategoryThumb}" class="w-100" alt="">
            <div class="text-center overlay position-absolute py-3 ">
                <h2>${categories[i].strCategory}</h2>
                <p>${categories[i].strCategoryDescription}</p>
            </div>
        </div>
        </div>`
    }
    home.innerHTML = content
    
}

async function displaySide(key){
    content = loading;
    home.innerHTML = content
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${key}`)
    result = await response.json();
    diplay(result);
}



// -------------Countries---------

async function displayArea() {
    content = loading;
    home.innerHTML = content
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    result = await response.json();
    let areas = result.meals;
    content ="";
    for(let i=0 ; i < areas.length ; i++){
            content += `
            <div class="col-md-3">
                <div class="position-relative overflow-hidden rounded-2 meal text-white text-center p-3 area" onclick="countryMeals('${areas[i].strArea}')">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>
                    <h2>${areas[i].strArea}</h2>
                </div>
            </div>`}
        home.innerHTML = content;

}

async function countryMeals(key){
    content = loading;
    home.innerHTML = content
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${key}`)
    result = await response.json();
    diplay(result);
}



// -------------Ingredients---------

async function displayIngredients() {
    content = loading;
    home.innerHTML = content
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    result = await response.json();
    let ingredients = result.meals;
    content ="";
    for(let i=0 ; i < 20 ; i++){
            content += `
            <div class="col-md-3" onclick="getMealsByIngredients('${ingredients[i].strIngredient}')">
                <div class="position-relative overflow-hidden rounded-2 meal text-white text-center p-1 area ingredients">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h2 class="fs-4 fw-bold py-2">${ingredients[i].strIngredient}</h2>
                    <p class="text-ing ">${ingredients[i].strDescription}</p> 
                </div>
            </div>`}
        home.innerHTML = content;
}

async function getMealsByIngredients(key){
    content = loading;
    home.innerHTML = content
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${key}`)
    result = await response.json();
    diplay(result);
}



// -------------Search---------

function showSearch() {
    $("#search").removeClass("d-none")
    content="";
    home.innerHTML = content;
    }

function hideSearch() {
    $("#search").addClass("d-none")
    document.getElementById("search-letter").value=""
    document.getElementById("search-name").value=""
    }

async function searchByName(){
    content = loading;
    home.innerHTML = content
    let key = document.getElementById("search-name").value
    document.getElementById("search-letter").value=""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`)
    result = await response.json();
    diplay(result);
}

async function searchByFirstLetter(){
    content = loading;
    home.innerHTML = content
    let key = document.getElementById("search-letter").value
    document.getElementById("search-name").value=""
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${key}`)
    result = await response.json();
    diplay(result);
}


// -------------Main Display---------

function diplay(result) {
    let meals = result.meals;
    if(meals!= null && meals!= undefined) {
    content ="";
        for(let i=0 ; i < 20 && i < meals.length ; i++){
            content += `
            <div class="col-md-3" ">
                <div class="position-relative overflow-hidden rounded-2 meal bg-warning" onclick="getIngredient(${meals[i].idMeal})">
                    <img src="${meals[i].strMealThumb}" class="w-100" alt="">
                    <div class="text-center overlay position-absolute d-flex justify-content-center align-items-center py-3 ">
                        <h2>${meals[i].strMeal}</h2>
                    </div>
                </div>
            </div>`}
        home.innerHTML = content;
    }
}

async function getIngredient(key){
    content = loading; 
    home.innerHTML = content;
    hideForms();
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${key}`)
    result = await response.json();
    let meal = result.meals[0];
    let Recipe ="";
    for (let i = 1 ; i <20 ; i++)
    {
        let measure =  `strMeasure${i}` 
        let ingrident = `strIngredient${i}`
        if(meal[measure] != null && meal[measure] != "" && meal[measure] != " "&& meal[measure] != undefined ){
        Recipe += `<li class="alert alert-info m-2 p-1">${meal[measure]} ${meal[ingrident]}</li>`
    }
    }
    let tag ="";
    if(meal.strTags != null && meal.strTags != "" && meal.strTags != " " && meal.strTags != undefined){
        tagarray = meal.strTags.split(',');
        
        for (let i = 0 ; i <tagarray.length ; i++)
        {
            tag += `<li class="alert alert-danger m-2 p-1">${tagarray[i]}</li>`
        }
    }
    content = "" 
    home.innerHTML = content;
    content =`
    <div class="col-md-4">
    <img src="${meal.strMealThumb}" alt="" class="w-100 rounded-3">
    <h1 class="text-white">${meal.strMeal}</h1>
    </div>
    <div class="col-md-8 text-white">
    <h2>Instructions</h2>
    <p>${meal.strInstructions}</p>
    <h3>Area : ${meal.strArea}</h3>
    <h3Category : ${meal.strCategory}</h3>
    <h3>Recipes :</h3>
    <ul class="list-unstyled d-flex g-3 flex-wrap">
        ${Recipe}
    </ul>
    <h3>Tags :</h3>
    <ul class="list-unstyled d-flex g-3 flex-wrap">
        ${tag}
    </ul>
    <a target="_blank" href="${meal.strSource}" class="btn btn-success p-2 mx-1" href="">Source</a>
    <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger p-2 mx-1" href="">Youtube</a>
    </div>
    `;
    home.innerHTML = content;
}

// ----------- Form Display---------

function showSignUp() {
    $("#signup").removeClass("d-none")
    content="";
    home.innerHTML = content;
    }

function hideSignUp() {
    $("#signup").addClass("d-none")
    clearForm()
}

// ----------- hide search & SignUp---------

function hideForms() {
    hideSearch();
    hideSignUp();
}

// ----------- Form regex---------

let nameRegex = /^[a-zA-Z]+\w*$/;

let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

let phoneRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/

let ageRegex = /^[1-9]{1}[0-9]?$|^100$/;

let passwordRegex = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

// inputs
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userPhone = document.getElementById("userPhone");
const userAge = document.getElementById("userAge");
const userPass = document.getElementById("userPassword");
const userRePass = document.getElementById("userRePassword");
const submitBtn = document.getElementById("submitBtn");

// errors
const errorName = document.getElementById("userNameAlert");
const errorEmail = document.getElementById("userEmailAlert");
const errorPhone = document.getElementById("userPhoneAlert");
const errorAge = document.getElementById("userAgeAlert");
const errorPass = document.getElementById("userPasswordAlert");
const errorRePass = document.getElementById("userRePasswordAlert");


// Validation

function nameValidation(){
    if (nameRegex.test(userName.value)) {
        errorName.classList.add("d-none");
        userName.style.border = "3px solid green";
        return true
    } else {
        errorName.classList.remove("d-none");
        userName.style.border = "3px solid red";
        return false
    }
}

function emailValidation(){
    if (emailRegex.test(userEmail.value)) {
        errorEmail.classList.add("d-none");
        userEmail.style.border = "3px solid green";
        return true
    } else {
        errorEmail.classList.remove("d-none");
        userEmail.style.border = "3px solid red";
        return false
    }
}

function phoneValidation(){
    if (phoneRegex.test(userPhone.value)) {
        errorPhone.classList.add("d-none");
        userPhone.style.border = "3px solid green";
        return true
    } else {
        errorPhone.classList.remove("d-none");
        userPhone.style.border = "3px solid red";
        return false
    }
}

function ageValidation(){
    if (ageRegex.test(userAge.value)) {
        errorAge.classList.add("d-none");
        userAge.style.border = "3px solid green";
        return true
    } else {
        errorAge.classList.remove("d-none");
        userAge.style.border = "3px solid red";
        return false
    }
}

function passValidation(){
    if (passwordRegex.test(userPass.value)) {
        errorPass.classList.add("d-none");
        userPass.style.border = "3px solid green";
        return true
    } else {
        errorPass.classList.remove("d-none");
        userPass.style.border = "3px solid red";
        return false
    }
}

function rePassValidation(){
    if (userRePass.value == userPass.value) {
        errorRePass.classList.add("d-none");
        userRePass.style.border = "3px solid green";
        return true
    } else {
        errorRePass.classList.remove("d-none");
        userRePass.style.border = "3px solid red";
        return false
    }
}

userRePass.addEventListener("blur",()=> {
    rePassValidation();
})


let inputs = document.querySelectorAll("#signup input")
inputs.forEach((input) => {
    input.addEventListener("blur",()=>{
        submit();
    })
})

function submit() {
    if ( nameValidation()==true && emailValidation() == true &&  phoneValidation() == true && ageValidation() == true && passValidation() == true && rePassValidation()== true ) {
        submitBtn.removeAttribute("disabled") 
    }
    else {
        submitBtn.setAttribute("disabled" , "")
    }
}

document.getElementById("signupform").addEventListener("submit",function(e) {
    e.preventDefault;
    clearForm();
} )


// clear Form
function clearForm() {
    $("#signup input").val("")
}