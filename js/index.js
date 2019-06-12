$(document).ready(function(){ 
    $.get("templates/navbar-template.html", function(data) {
      $("body").prepend(data);
    });

    $.get("templates/popup-template.html", function(data) {
      $("body").append(data);
    });
  }); 