$(".popup__submit-button").click(function(){ 
    var username = $("#username").val();
    var password = $("#password").val();

    
    if (username =='admin' && password=='p@ssword'){
        window.location.href = "../html/upload.html";
    } else {
        console.log("nay");
    }
});