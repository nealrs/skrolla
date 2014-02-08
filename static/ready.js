$(document).ready(function() {

	// trigger addURL on enter/go for mobile keyboards.
	$('.geturl').keypress(function(e){
	
    if ( e.which == 13  && $('.geturl').val()){ 
			addURL( $('.geturl').val() );
	   
	   // if anon, (#url & .geturl), trigger a redirect to /view. 
	   if ($('.geturl').attr('id') == 'url'){
	   	location.href= 'view/'+ $('.geturl').val().replace(/^(https?:\/\/)?/,'');
	   }	else {
	   			// if auth, (just .geturl) clear the input.
	   			$('.geturl').val('');
	   	 	}
    }
  });
});