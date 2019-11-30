class Controller {
    ingredients = [];
    view;
    storage = window.localStorage;
    debounceTimestamp = Date.now();
    username;

    constructor(v) {
        this.view = v;
        this.getMyIngredients();
    }

    getMyIngredients = async function () {
        //Retrieve my ingredients
        try {
            const response = await axios({
                method: 'GET',
                url: 'http://localhost:3000/private/'+localStorage.getItem('username')+'/ingredients',
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt') },

            });

            if (response != null) {
                /*response.data.result.map((item) => this.view.showAnIngredient(item,"label","pic"));*/
                this.ingredients = response.data.result;
            }

            this.view.clearIngredients();

            //this.getIngredientDetails();
            this.ingredients.map((ingredient) => { this.view.showAnIngredient(ingredient.id, ingredient.name); });
        } catch (error) {
        }
    }

    /*This is stupid */
    getIngredientDetails = async function () {
        this.view.clearIngredients();

        this.ingredients.map(async (id) => {

            try {
                const response = await axios({
                    method: 'get',
                    url: 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=' + id
                });

                if (response.data.ingredients != null) {

                    let name = response.data.ingredients[0].strIngredient;
                    this.view.showAnIngredient(id, name);

                }

            } catch (error) {
                // Error 😨
                if (error.response) {
                    /*
                     * The request was made and the server responded with a
                     * status code that falls out of the range of 2xx
                     */

                    console.log(error.response);

                } else if (error.request) {
                    /*
                     * The request was made but no response was received, `error.request`
                     * is an instance of XMLHttpRequest in the browser and an instance
                     * of http.ClientRequest in Node.js
                     */
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request and triggered an Error
                    console.log('Error', error.message);
                }
            }
        });
    }

    findIngredientSuggestion = async function (input) {
        if (input == "") {
            this.view.clearSuggestions();
        }

        //Debounce
        if (this.debounceTimestamp < Date.now() - 500) {
            this.debounceTimestamp = Date.now();

            if (input != "") {

                try {
                    const response = await axios({
                        method: 'get',
                        url: 'https://www.thecocktaildb.com/api/json/v2/9973533/search.php?i=' + input
                    });
                    this.view.clearSuggestions();

                    if (response.data.ingredients != null) {
                        response.data.ingredients.map((ingr) => { this.view.addSuggestion(ingr.strIngredient, ingr.idIngredient) });
                    }

                } catch (error) {
                    // Error 😨
                    if (error.response) {
                        /*
                         * The request was made and the server responded with a
                         * status code that falls out of the range of 2xx
                         */

                        console.log(error.response);

                    } else if (error.request) {
                        /*
                         * The request was made but no response was received, `error.request`
                         * is an instance of XMLHttpRequest in the browser and an instance
                         * of http.ClientRequest in Node.js
                         */
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request and triggered an Error
                        console.log('Error', error.message);
                    }
                }
            } else {
                this.view.clearSuggestions();
            }
        }
    }

    getLoginStatus = async function () {

        try {
            const response = await axios({
                method: 'get',
                url: 'http://localhost:3000/account/status',
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt') }
            });
            this.view.showLoggedIn();
        } catch (error) {
            // Error 😨
            if (error.response) {
                /*
                 * The request was made and the server responded with a
                 * status code that falls out of the range of 2xx
                 */

                if (error.response.status == "401") {
                    this.view.showNotLoggedIn();
                }

            } else if (error.request) {
                /*
                 * The request was made but no response was received, `error.request`
                 * is an instance of XMLHttpRequest in the browser and an instance
                 * of http.ClientRequest in Node.js
                 */
                console.log(error.request);
            } else {
                // Something happened in setting up the request and triggered an Error
                console.log('Error', error.message);
            }
        }
    }

    createNewAccount = async function () {
        let username = $("#newUsername").val();
        let password = $("#newPassword").val();

        if (username == "" || password == "") {
            this.view.showCreateAccountError("Please enter a username and password!");
        } else {
            try {
                const response = await axios({
                    method: 'POST',
                    url: 'http://localhost:3000/account/create',
                    data: {
                        "name": username,
                        "pass": password,
                    }
                });

                this.view.showNotification(response.data.status);
                this.view.showNotLoggedIn();
            } catch (error) {
                // Error 😨
                if (error.response) {
                    /*
                     * The request was made and the server responded with a
                     * status code that falls out of the range of 2xx
                     */
                    this.view.showCreateAccountError(error.response.data.msg);

                } else if (error.request) {
                    /*
                     * The request was made but no response was received, `error.request`
                     * is an instance of XMLHttpRequest in the browser and an instance
                     * of http.ClientRequest in Node.js
                     */
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request and triggered an Error
                    console.log('Error', error.message);
                }
            }
        }
    }

    doLogin = async function () {
        let username = $("#username").val();
        let password = $("#password").val();

        if (username == "" || password == "") {
            this.view.showLoginError("Please enter a username and password!");
        } else {
            try {
                const response = await axios({
                    method: 'POST',
                    url: 'http://localhost:3000/account/login',
                    data: {
                        "name": username,
                        "pass": password,
                    }
                });

                this.view.showNotification("Succesfully logged in!");
                this.storage.setItem('jwt', response.data.jwt);
                this.storage.setItem('username', response.data.name);
                this.username=response.data.name;
                this.view.showLoggedIn();
            } catch (error) {
                // Error 😨
                if (error.response) {
                    /*
                     * The request was made and the server responded with a
                     * status code that falls out of the range of 2xx
                     */
                    this.view.showLoginError(error.response.data.msg);

                } else if (error.request) {
                    /*
                     * The request was made but no response was received, `error.request`
                     * is an instance of XMLHttpRequest in the browser and an instance
                     * of http.ClientRequest in Node.js
                     */
                    console.log(error.request);
                } else {
                    // Something happened in setting up the request and triggered an Error
                    console.log('Error', error.message);
                }
            }
        }
    }

    doLogout = function () {
        this.storage.removeItem('jwt');
        this.storage.removeItem('username');
        this.getLoginStatus();
        this.view.showNotification("Succesfully logged out!");
    }

    storeNewIngredient = async function (id, name) {
        //Check if ingredients doesn't already exist in inventory

        let alreadyExists = false;

        this.ingredients.map((ingredient) => { if (ingredient.id == id) { alreadyExists = true; } });

        if (alreadyExists) {
            this.view.showNotification("That ingredient already exists in your inventory!");
        } else {
            this.ingredients.push({ id: id, name: name });

            const response = await axios({
                method: 'POST',
                url: 'http://localhost:3000/private/'+localStorage.getItem('username')+'/ingredients',
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt') },
                data: {
                    "data": this.ingredients
                }
            });

            if (response.status = "200") {
                this.view.clearSuggestions();
                this.view.clearSearch();
                this.view.showNotification("Ingredient saved!");
                this.view.showAnIngredient(id, name);
            }
        }
    }

    deleteIngredient = async function (id) {
        this.ingredients = this.ingredients.filter((ingredient) => { return ingredient.id != id; });

        const response = await axios({
            method: 'POST',
            url: 'http://localhost:3000/private/'+localStorage.getItem('username')+'/ingredients',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('jwt') },
            data: {
                "data": this.ingredients
            }
        });
        
        if (response.status = "200") {
            this.view.showNotification("Ingredient deleted!");
            this.view.removeIngredient(id);
        }
    }
}


$(document).ready(function () {
    let view = new View;
    let controller = new Controller(view);

    /*Button handler */
    $(document).on("click", "#newAccountButton", () => { view.showCreateNewAccount(); });
    $(document).on("click", "#loginButton", () => { controller.doLogin(); });
    $(document).on("click", "#backToLoginButton", () => { view.showNotLoggedIn(); });
    $(document).on("click", "#CreateAccountButton", () => { controller.createNewAccount(); });
    $(document).on("click", "#logoutButton", () => { controller.doLogout(); });
    $(document).on("click", "#myIngredientsTile", () => { view.showMyIngredients(); });
    $(document).on("click", "#recipeSearchTile", () => { view.showRecipeSearch(); });
    $(document).on("click", "#myFavoritesTile", () => { view.showMyFavorites(); });
    $(document).on("click", "#backToDashboard", () => { view.showDashboard(); });
    $(document).on("keyup", "#ingredientSearch", (change) => { controller.findIngredientSuggestion(change.currentTarget.value); });
    $(document).on("click", ".suggestedIngredient", (button) => { controller.storeNewIngredient(button.currentTarget.id.substring(13), $("#" + button.currentTarget.id).html()); });
    $(document).on("click", ".delete", (button) => { controller.deleteIngredient(button.currentTarget.id.substring(16)); });

    controller.getLoginStatus();


});