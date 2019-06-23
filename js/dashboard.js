window.onload = function(){
    $('#show-data').click(function() {
        
    });

    $('#clear-data').click(function() {
        sessionStorage.clear();
        window.location.href="../html/upload.html";
    });

    $('#log-out').click(function() {
        sessionStorage.clear();
        window.location.href="../html/home.html";
    });
};