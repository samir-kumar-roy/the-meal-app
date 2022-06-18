
const searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener("click", fetchMeal);
function fetchMeal() {
    const searchTerm = document.querySelector(".search").value;
    let url = "https://themealdb.com/api/json/v1/1/search.php?s=" + searchTerm;
    fetch(url)
        .then(res => res.json())
        .then(data => displayData(data))

}
function displayData(meal) {
    // console.log(meal.meals);
    let allMeals = meal.meals;
    let result = document.querySelector(".result");
    for (let singleMeal of allMeals) {
        result.innerHTML += `
        <div class="card">
            <img src=${singleMeal.strMealThumb} alt="">
             <h1>${singleMeal.strMeal}</h1>
            <p>${singleMeal.strInstructions.slice(0, 100)}
            </p>
            <div class="buttons">
                <a href=${singleMeal.strYoutube} class="youtube"><i class="fa-brands fa-youtube" target="_blank"></i></a>
                <button class="details" data-id=${singleMeal.idMeal}>Details</button>
            </div>
        </div>
        `
    }
    let detailsButtons = document.querySelectorAll(".details");

    for (let detailsButton of detailsButtons) {
        detailsButton.addEventListener("click", (e) => {
            const mealId = e.target.getAttribute("data-id");
            const url = "https://themealdb.com/api/json/v1/1/lookup.php?i=" + mealId;


            fetch(url)
                .then(response => response.json())
                .then(mealDetail => {
                    let singleMealInfo = document.querySelector(".single-meal-info");
                    let popUpContent = document.querySelector(".popup-content")
                    let thisMeal = mealDetail.meals[0];
                    console.log(singleMealInfo);



                    const mealName = document.createElement("h1");
                    const mealDescription = document.createElement("p");
                    const descHeading = document.createElement("h2");
                    // creating youtube button
                    let buttonsDiv = document.createElement("div");
                    buttonsDiv.classList.add("buttons");
                    let youtubeButton = document.createElement("a");
                    youtubeButton.classList.add("youtube");
                    youtubeButton.setAttribute("href", `${thisMeal.strYoutube}`)
                    let youtubeIcon = document.createElement("i");
                    youtubeIcon.classList.add("fa-brands", "fa-youtube");
                    youtubeButton.append(youtubeIcon);
                    mealName.textContent = thisMeal.strMeal;
                    descHeading.textContent = "Preperation Instructions";

                    popUpContent.append(mealName);
                    popUpContent.append(descHeading);
                    mealDescription.textContent = thisMeal.strInstructions;
                    popUpContent.append(mealDescription);
                    // adding youtube button
                    buttonsDiv.append(youtubeButton);
                    popUpContent.append(buttonsDiv)

                    singleMealInfo.style.display = "block";
                    singleMealInfo.style.zIndex = 10;
                    document.querySelector("#popupClose").addEventListener("click", () => {
                        document.querySelector(".single-meal-info").style.display = "none";
                    })

                })

        })
    }


}