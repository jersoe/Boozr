class View {
    constructor(){
        $("#notification").hide();
    }

    showNotLoggedIn(){
        $(".loggedIn").hide();
        $(".notLoggedIn").show();

        /*The initial screen when not logged in is the log in screen. Hide new account div.*/
        $("#createAccountWrapper").hide();

        /*Hide error message div*/
        $("#loginError").hide();
        $("#createAccountError").hide();
    }

    showLoggedIn(){
        console.log("Showing logged in");
        $(".loggedIn").show();
        $(".notLoggedIn").hide();
    }

    showCreateNewAccount(){
        $("#createAccountWrapper").show();
        $("#loginWrapper").hide();
    }

    showCreateAccountError(msg){
        $("#createAccountError").show("slow");
        $("#createAccountError").html("<p>"+msg+"</p>");
    }

    showLoginError(msg){
        $("#loginError").show();
        $("#loginError").html("<p>"+msg+"</p>");
    }

    showNotification(msg){
        $("#notification").html("<p>"+msg+"</p>");
        $("#notification").show(setTimeout(() => {  $("#notification").hide("slow"); }, 2000));
    }
}