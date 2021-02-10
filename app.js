
const searchButton = document.getElementById('search-btn');
const mealList = document.getElementById("meal-show");
const mealDetail = document.getElementById("meal-details");
mealDetail.style.display = "none";
searchButton.addEventListener("click", function () {
    let search = document.getElementById("input").value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search}`)
        .then(res => res.json())
        .then(data => {
            let html = "";
            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                    <div id ="meal-item" >
                        <div id="meal-image">
                            <img onclick="mealDetails('${meal.strMeal}')" src="${meal.strMealThumb}" alt="Food Item">
                        </div>
                        <div class="meal-name">
                            <h3 onclick="mealDetails('${meal.strMeal}')">${meal.strMeal}</h3>
                        </div>
                    </div>
                `;
                });
            }
            else {
                html = "Sorry this type is not available.";
            }
            mealList.innerHTML = html;

        })

})

const mealDetails = searchMealDetails => {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchMealDetails}`)
        .then(res => res.json())
        .then(data => {
            renderMealInfo(data.meals[0]);
            console.log(data.meals[0]);
        })
}


const renderMealInfo = meal => {
    const mealDetail = document.getElementById("meal-details");
    mealDetail.style.display = "block";
    mealDetail.innerHTML =
        `<img src="${meal.strMealThumb}">
        <h3>Ingredients</h3>
        <ul id="ul">
       
        </ul>`;
    for (let i = 1; i < 20; i++) {
        const ul = document.getElementById("ul");
        let li = document.createElement("li");
        li.innerText = meal[`strMeasure${i}`] + ' ' + meal[`strIngredient${i}`];
        if (meal[`strIngredient${i}`]) {
            ul.appendChild(li);
        }
        else {
            break;
        }
    }
}
