$(document).ready(function() {

	// update URL on keyup (anon 'test drive')
	$('#url').keyup(function(){
		url = $('#url').val().replace(/^(https?:\/\/)?/,'');
		$('#link').html( 'view/'+url );
		$("#link").attr( 'href', 'view/'+url );
	});
	
	// on click, log url (if not empty) to firebase (anon & auth)
	$(".addurl").click(function(){
		
		if ($('.geturl').val()){
			addURL( $('.geturl').val() );
		}
		$('.geturl').val('');
	});
	
	
	
});