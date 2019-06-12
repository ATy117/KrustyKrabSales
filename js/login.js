$(".popup__submit-button").click(function(){ 
    var username = $("#username").val();
    var password = $("#password").val();

    
    if (username =='admin' && password=='p@ssword'){
        console.log("Yay");
        window.location.href = "../html/dashboard.html";
    } else {
        console.log("nay");
    }
});