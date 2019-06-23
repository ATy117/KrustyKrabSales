window.onload = function(){ 
  $('#continue').click(function() {
    var files = document.getElementById('selectFiles').files;
    console.log(files);
    if (files.length <= 0) {
        return false;
    }
  
    var fr = new FileReader();
    
    fr.onload = function(e) { 
        console.log(e);
        var result = JSON.parse(e.target.result);
        var formatted = JSON.stringify(result, null, 2);
        sessionStorage.setItem('data', formatted);
        window.location.href = "../html/dashboard.html";
    }
    
    fr.readAsText(files.item(0));
    console.log("in continue");
  });

    var inputs = document.querySelectorAll( '.upload__input' );
    Array.prototype.forEach.call( inputs, function( input )
    {
      var label	 = input.nextElementSibling,
      labelVal = label.innerHTML;

      input.addEventListener( 'change', function( e )
      {
        var fileName = '';
        if( this.files && this.files.length > 1 )
          fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
        else
          fileName = e.target.value.split( "\\" ).pop();

        if( fileName ){
          label.querySelector( 'span' ).innerHTML = fileName;
        }else{
          label.innerHTML = labelVal;
        }
      });
    });
};
