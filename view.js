class View {
    constructor(){

    }

    showNotLoggedIn(){
        console.log("Showing not logged in");
        $(".loggedIn").hide();
        $(".notLoggeIn").show();
    }

    showLoggedIn(){
        console.log("Showing logged in");
        $(".loggedIn").show();
        $(".notLoggeIn").hide();
    }
}