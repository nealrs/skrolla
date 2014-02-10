// define firebase paths (this should all really be in a different file, hunh?)
var fbBase = 'https://skrolla.firebaseio.com/';
var fbUsersBase = fbBase+'users/';

// user methods

// create new user 
function newUser(){
	var newUserRef = new Firebase(fbUsersBase+authorizedUser);
	newUserRef.setWithPriority({date_created : Firebase.ServerValue.TIMESTAMP, id : authorizedUserId}, Firebase.ServerValue.TIMESTAMP);
	
	// when creating a new user, populate their reading list with a dummy / about URL
	addURL('http://dev.skrol.la/about');
}

// check if authorized login corresponds to an existing user - if not, create it.
function checkUser(){
	var userRef = new Firebase(fbUsersBase+authorizedUser);
	userRef.on('value', function(snapshot) {
		
		if(snapshot.val() === null) {
			console.log('User '+authorizedUser+' does not exist. creating now!');
			newUser();
		}
		//greetUser();
		getURLs();
	});
}

/*
// greet returning & new users differently
function greetUser(){	
	$('#greeting').html('Hi @'+authorizedUser+'!');
	getURLs();	
}
*/

// URL & list methods

// addURL
function addURL(url){
	var listRef = new Firebase(fbUsersBase+authorizedUser+'/list');
	var pushRef = listRef.push();
	
	pushRef.set({
		'url': url,
		'date_added': Firebase.ServerValue.TIMESTAMP
	}, onComplete);
}

// get & list URLs for reading list
function getURLs(){
	var listRef = new Firebase(fbUsersBase+authorizedUser+'/list');
	var list = '<ul>\n';
	
	listRef.on('value', function(snapshot) {
		if(snapshot.val() === null) {
			console.log('reading list is empty');
			$('#list_status').html("Your reading list is empty.");
		} else {				
				listRef.on('child_added', function(snapshot) {
					var item = snapshot.val();
					//list += '<li><a href="'+ item.url+'">'+ item.url +'</a>&nbsp;&nbsp;<button class="remURL" id = "'+username+'___'+snapshot.name()+' title="delete this item">delete</button></li>\n';
					
					list += '<li style="margin-bottom:15px;"><a href="'+ modURL(item.url)+'" title = "'+ item.url+'">'+ truncateURL(item.url) +'</a>&nbsp;&nbsp;<a class="remURL" onclick = "removeURL(\''+snapshot.name()+'\')" title="remove URL"><button class="btn btn-danger btn-small pull-right ">&mdash;</button></a></li>\n';
				});	
				
				console.log(list);	
				$('#list').html(list+'</ul>');
			}
	});
}

// delete URL form list 
function removeURL(refName){
	var listRef = new Firebase(fbUsersBase+authorizedUser+'/list');
	var ref = listRef.child(refName);
	
	ref.remove(onComplete);
}

// on complete callback for debugging.
var onComplete = function(error) {
  if (error)
    console.log('op failed.');
  else 
  	console.log('op successful.');
};

// add /view/ path prefix
function modURL(url){
	var newURL= 'view/' + url.replace(/^(https?:\/\/)?/i,'');
	return newURL;
}

// truncate long URLs
function truncateURL(url){	
	url = url.replace(/^(https?:\/\/)?/i,'');
	if ( url.length > 35 ){
		url = url.substring(0,34)+'...';
	}
	return url; 
}