class Controller {

    isLoggedOn = false;
    view;

    constructor(v) {
        this.view=v;
    }



    getLoginStatus = async function () {

        try {
            const response = await axios({
                method: 'get',
                url: 'http://localhost:3000/account/status',
                headers: { 'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiY2hyaXMiLCJkYXRhIjp7InJvbGUiOjIsImRlc2NyaXB0aW9uIjoiTGF6eS4uLiJ9LCJpYXQiOjE1Njk5MDE4OTcsImV4cCI6MTU3MjQ5Mzg5N30.DRZZQw2Hfex7Z7E_SAcgtUfRk1C-wVmauyMXqG3SrB0' }
            });

            console.log("Success: " + response);
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



}



$(document).ready(function () {

    let controller = new Controller(new View());

    controller.getLoginStatus();

});