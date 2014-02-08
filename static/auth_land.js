$(document).ready(function() {

	// update URL on keyup 
	$('#url').keyup(function(){
	
		url = $('#url').val().replace(/^(https?:\/\/)?/,'');
		$('#link').html( 'http://localhost:5000/view/'+url );
		$("#link").attr( 'href', '/view/'+url );
	});
	
	// on click, also log to firebase (anonymous) 
	$("#link").click(function(){
		addURL( $('#url').val() );
	});
	
	// on click, log url to firebase (authenticated)
	$("#auth_add_button").click(function(){
		addURL( $('#auth_add_url').val() );
	});
	
});