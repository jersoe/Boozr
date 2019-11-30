class View {
    constructor() {
        $("#notification").hide();
        this.hideMyIngredients();
        this.hideRecipeSearch();
        this.hideMyFavorites();
    }

    showNotLoggedIn() {
        $(".loggedIn").hide();
        $(".notLoggedIn").show();

        /*The initial screen when not logged in is the log in screen. Hide new account div.*/
        $("#createAccountWrapper").hide();

        /*Hide error message div*/
        $("#loginError").hide();
        $("#createAccountError").hide();

        this.hideDashboard();
        this.hideMyIngredients();
        this.hideRecipeSearch();
        this.hideMyFavorites();
    }

    showLoggedIn() {
        $(".loggedIn").show();
        $(".notLoggedIn").hide();
        this.showDashboard();
    }

    showMyIngredients() {
        this.hideDashboard();
        this.hideRecipeSearch();
        this.hideMyFavorites();
        this.showBackToDashboard();
        $("#myIngredients").show();
    }

    hideMyIngredients() {
        $("#myIngredients").hide();
    }


    showRecipeSearch() {
        this.hideDashboard();
        this.hideMyIngredients();
        this.hideMyFavorites();
        this.showBackToDashboard();
        this.clearSearchResults();
        $("#recipeSearch").show();
    }

    hideRecipeSearch() {
        $("#recipeSearch").hide();
    }


    showMyFavorites() {
        this.hideDashboard();
        this.hideRecipeSearch();
        this.hideMyIngredients();
        this.showBackToDashboard();
        $("#myFavorites").show();
    }

    hideMyFavorites() {
        $("#myFavorites").hide();
    }

    showDashboard() {
        this.hideRecipeSearch();
        this.hideMyIngredients();
        this.hideMyFavorites();
        this.hideBackToDashboard();
        $("#dashboardWrapper").show();
    }

    hideDashboard() {
        $("#dashboardWrapper").hide();
    }

    showBackToDashboard() {
        $("#backToDashboard").show();
    }


    hideBackToDashboard() {
        $("#backToDashboard").hide();
    }

    showCreateNewAccount() {
        $("#createAccountWrapper").show();
        $("#loginWrapper").hide();
    }

    showCreateAccountError(msg) {
        $("#createAccountError").show("slow");
        $("#createAccountError").html("<p>" + msg + "</p>");
    }

    showLoginError(msg) {
        $("#loginError").show();
        $("#loginError").html("<p>" + msg + "</p>");
    }

    showNotification(msg) {
        $("#notification").html("<p>" + msg + "</p>");
        $("#notification").show(setTimeout(() => { $("#notification").hide("slow"); }, 2000));
    }

    clearSuggestions() {
        $("#suggestions").empty();
    }

    clearIngredients() {
        $("#ingredientsGrid").empty();
    }

    addSuggestion(label, id) {
        $("#suggestions").append(`<div class="suggestedIngredient" id="addIngredient${id}">${label}</div>`);
    }

    clearSearch() {
        $("#ingredientSearch").val("");
    }


    showAnIngredient = function (id, name) {

        let html = `<div class="ingredient-item" id="ingredientItem${id}">
                   <article class="media">
                            <figure class="media-left">
                                <p class="image is-64x64">
                                    <img src="https://www.thecocktaildb.com/images/ingredients/${name}-Small.png"></img>
                                </p>
                            </figure>
                            <div class="media-content">
                                <div class="content">
                                    <p>
                                     ${name}
                                    </p>
                                </div>
                            </div>
                            <div class="media-right">
                                <button class="delete" id="deleteIngredient${id}"></button>
                            </div>
                        </article>
                    </div>`;


        $("#ingredientsGrid").append(html);

    }

    removeIngredient = function (id) {
        $("#ingredientItem" + id).remove();
    }

    listIngredientsForSearch = function (ingredients) {
        $("#ingredientsForSearch").empty();
        ingredients.map((ingredient) => {
            $("#ingredientsForSearch").append(
                `<input type="checkbox" class="ingredientCheckbox" id="searchIngredient${ingredient.id}" value="${ingredient.name}">${ingredient.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`
            );
        });
    }

    showSearchResult(cocktail) {
        let html = `<div class="searchResult" id="searchResult${cocktail.idDrink}">
                        <img src="${cocktail.strDrinkThumb}">
                            ${cocktail.strDrink}
                    </div>`;
        $("#searchResultsGrid").append(html);
    }

    clearSearchResults() {
        $("#searchResultsGrid").empty();
    }

    showRecipeModal(recipe, isLiked) {
        let html = `
            <div class="card"><br>
            <div class="card-image">
                <figure class="image is-4by3">
                <img src="${recipe.strDrinkThumb}">
                </figure>
            </div>
            <div class="card-content">
                <div class="media">            
                <div class="media-content">
                    <p class="title is-4">
                        <a id="liked${recipe.idDrink}" class="likeLink">
                            ${isLiked ? `<i class="fas fa-thumbs-up"></i>` : `<i class="far fa-thumbs-up"></i>`}
                        </a>
                        ${recipe.strDrink}
                    </p>
                    <p class="subtitle is-6">${recipe.strAlcoholic} - ${recipe.strCategory} - ${recipe.strGlass}</p>
                </div>
                </div>
                <ul>`;
                if (recipe.strIngredient1!=null) {
                    html+=`<li>${recipe.strIngredient1} - ${recipe.strMeasure1}</li>`
                }
                if (recipe.strIngredient2!=null) {
                    html+=`<li>${recipe.strIngredient2} - ${recipe.strMeasure2}</li>`
                }
                if (recipe.strIngredient3!=null) {
                    html+=`<li>${recipe.strIngredient3} - ${recipe.strMeasure3}</li>`
                }                
                if (recipe.strIngredient4!=null) {
                    html+=`<li>${recipe.strIngredient4} - ${recipe.strMeasure4}</li>`
                }  
                if (recipe.strIngredient5!=null) {
                    html+=`<li>${recipe.strIngredient5} - ${recipe.strMeasure5}</li>`
                }  
                if (recipe.strIngredient6!=null) {
                    html+=`<li>${recipe.strIngredient6} - ${recipe.strMeasure6}</li>`
                }  
                if (recipe.strIngredient7!=null) {
                    html+=`<li>${recipe.strIngredient7} - ${recipe.strMeasure7}</li>`
                }  
                if (recipe.strIngredient8!=null) {
                    html+=`<li>${recipe.strIngredient8} - ${recipe.strMeasure8}</li>`
                }  
                if (recipe.strIngredient9!=null) {
                    html+=`<li>${recipe.strIngredient9} - ${recipe.strMeasure9}</li>`
                }  
                if (recipe.strIngredient10!=null) {
                    html+=`<li>${recipe.strIngredient10} - ${recipe.strMeasure10}</li>`
                }  
                if (recipe.strIngredient11!=null) {
                    html+=`<li>${recipe.strIngredient11} - ${recipe.strMeasure11}</li>`
                }  
                if (recipe.strIngredient12!=null) {
                    html+=`<li>${recipe.strIngredient12} - ${recipe.strMeasure12}</li>`
                }  
                if (recipe.strIngredient13!=null) {
                    html+=`<li>${recipe.strIngredient13} - ${recipe.strMeasure13}</li>`
                }  
                if (recipe.strIngredient14!=null) {
                    html+=`<li>${recipe.strIngredient14} - ${recipe.strMeasure14}</li>`
                }  
                if (recipe.strIngredient15!=null) {
                    html+=`<li>${recipe.strIngredient15} - ${recipe.strMeasure15}</li>`
                }  

          html+=`</ul><div class="content">
                ${recipe.strInstructions}
                <br>

                </div>
            </div>
            
            </div>
            

`;


        $("#searchModalContent").append(html);

        $("#searchModal").addClass("is-active");
       
    }

    closeModal() {
        $("#searchModal").removeClass("is-active");
        $("#searchModalContent").empty();
    }

    setToLiked(id){
        $("#liked"+id).empty();
        $("#liked"+id).append(`<i class="fas fa-thumbs-up"></i>`);
    }

    setToNotLiked(id){
        $("#liked"+id).empty();
        $("#liked"+id).append(`<i class="far fa-thumbs-up"></i>`);
    }

}