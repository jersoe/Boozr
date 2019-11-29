class Controller {

    isLoggedOn = false;
    view;
    storage = window.localStorage;

    constructor(v) {
        this.view = v;
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

    doLogin = async function(){
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

    doLogout = function(){
        this.storage.removeItem('jwt');
        this.storage.removeItem('username');
        this.getLoginStatus();
        this.view.showNotification("Succesfully logged out!");
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

    controller.getLoginStatus();


});