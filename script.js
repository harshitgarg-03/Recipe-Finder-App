let button = document.querySelector(".btn");
let input = document.querySelector("input");
let important = document.querySelector(".avyi");
let script = document.querySelector(".script");
let recipeIngredient = document.querySelector(".recipe-ingredient");
let closeBtn = document.querySelector(".close-btn");
let recipeDetails = document.querySelector(".recipe-detils");





let mealss;
const fetchRECIPES = async (query) => {
    script.innerHTML = "<h2>Fetching recepies...</h2>"
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    script.innerHTML = "";
    const response = await data.json();
    mealss = response;
    response.meals.forEach(meal => {
        // console.log(meal);
        
        let images = document.createElement("div");
        images.classList.add("many_images");
        images.innerHTML = `
                <img src="${meal.strMealThumb}">
                <h3>${meal.strMeal}</h3>
                <p>${meal.strArea} DISH</p>
                <p> Belongs to ${meal.strCategory} category</p>
                `
        let butn = document.createElement("butn");
        butn.textContent = "VIEW RECIEPE";
        script.appendChild(images);
        images.appendChild(butn);
        butn.addEventListener("click", () => {
            openRecipepopUp(meal);
        })
    });
}

 const openRecipepopUp = (mealss) => {
    console.log(mealss);
    
 const fetchingIng = (mealss) => {
    console.log("harshit ..");
    
    let ingredientList = "";
    for(let i = 1; i <= 20; i++){
        const ingredient = mealss[`strIngredient${i}`];
          if(ingredient) {
            const measure = mealss[`strMeasure${i}`];
            ingredientList += `<li> ${measure}   ${ingredient}</li>`
          }   
          else{
            break;
          }
    }
    return ingredientList;
}
                    
    recipeIngredient.innerHTML = `<h2 class = "recipeNAME">${mealss?.strMeal}</h2>
        <h3>Ingredients: </h3>
        <ul> ${fetchingIng(mealss)} </ul>
        <div>
                    <h3>
                        Instructions:
                    </h3>
                    <p> ${mealss.strInstructions} </p>
        </div>
    `
    
    recipeIngredient.parentElement.style.display = "block";
}

closeBtn.addEventListener("click", () => {
    recipeIngredient.parentElement.style.display = "none";
    
})

button.addEventListener("click", () => {
    
    if (input.value === "") {        
        script.innerHTML = "pls enter your wishlist dish....."
        console.log("hello");
    }
    else{
        fetchRECIPES(input.value);
    }
})

window.onload = function(e) {
    e.preventDefault();
    document.querySelector(".recipe-detils").style.display = "none";
}