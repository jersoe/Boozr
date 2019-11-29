class Controller {

    isLoggedOn = false;
    view;

    constructor(v) {
        this.view = v;
    }



    getLoginStatus = async function () {

        try {
            const response = await axios({
                method: 'get',
                url: 'http://localhost:3000/account/status',
                headers: { 'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiY2hyaXMiLCJkYXRhIjp7InJvbGUiOjIsImRlc2NyaXB0aW9uIjoiTGF6eS4uLiJ9LCJpYXQiOjE1Njk5MDE4OTcsImV4cCI6MTU3MjQ5Mzg5N30.DRZZQw2Hfex7Z7E_SAcgtUfRk1C-wVmauyMXqG3SrB0' }
            });

            console.log("Success: " + response);
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

}


$(document).ready(function () {
    let view = new View;
    let controller = new Controller(view);

    /*Button handler */
    $(document).on("click", "#newAccountButton", () => { view.showCreateNewAccount(); });
    $(document).on("click", "#loginButton", () => { controller.doLogin(); });
    $(document).on("click", "#backToLoginButton", () => { view.showNotLoggedIn(); });
    $(document).on("click", "#CreateAccountButton", () => { controller.createNewAccount(); });


    controller.getLoginStatus();


});