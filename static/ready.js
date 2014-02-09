$(document).ready(function() {

	// trigger addURL on enter/go for mobile keyboards.
	$('.geturl').keypress(function(e){
	
    if ( e.which == 13  && $('.geturl').val()){ 
			addURL( $('.geturl').val() );
	   
	   // if anon, (#url & .geturl), trigger a redirect to /view. 
	   if ($('.geturl').attr('id') == 'url'){
	   	location.href= 'view/'+ $('.geturl').val().replace(/^(https?:\/\/)?/i,'');
	   }	else {
	   			// if auth, (just .geturl) clear the input.
	   			$('.geturl').val('');
	   	 	}
    }
  });
  
  // trigger addURL onclick for ext/ route
  $('.exturl_button').click(function(){
  	addURL( pURL );
  	
  	// remove class, add class, change text, hide button.
  	$('.exturl').removeClass( 'alert-info' ).addClass( 'alert-success' ).html('Awesome, you\'re all set!');
  	$('.exturl_button').hide();
  	
  });
  
});