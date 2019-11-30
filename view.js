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


    showAnIngredient = function(id, name){
        
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

    removeIngredient = function(id){
        $("#ingredientItem"+id).remove();
    }

}