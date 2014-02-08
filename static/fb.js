// define firebase paths (this should all really be in a different file, hunh?)
var fbBase = 'https://nrst1.firebaseio.com/';
var fbUsersBase = fbBase+'users/';

// create new user 
function newUser(){
	var newUserRef = new Firebase(fbUsersBase+authorizedUser);
	newUserRef.update({date_created : Firebase.ServerValue.TIMESTAMP, id : authorizedUserId});
	
	// when creating a new user, populate their reading list with a dummy / about URL
	addURL('http://nealshyam.com/#aboutSkrolla');
}

// check if authorized login corresponds to an existing user - if not, create it.
function checkUser(){
	var userRef = new Firebase(fbUsersBase+authorizedUser);
	userRef.on('value', function(snapshot) {
		
		if(snapshot.val() === null) {
			console.log('User '+authorizedUser+' does not exist. creating now!');
			newUser();
			greetUser(1);
		} else { greetUser(0); }
	});
}

// greet returning & new users differently
function greetUser(flag){	
	if (flag == 0){
		$('#greeting').html('Welcome back @'+authorizedUser+'!');
	} else { 
			$('#greeting').html('Thanks for joining us @'+authorizedUser+'!'); 
		}
	getURLs();	
}

// methods for getting URLs / list stuff for a particular user

function addURL(url){
	var listRef = new Firebase(fbUsersBase+authorizedUser+'/list');
	var pushRef = listRef.push();
	
	pushRef.set({
		'url': url,
		'date_added': Firebase.ServerValue.TIMESTAMP
	}, onComplete);
}

function getURLs(){
	var listRef = new Firebase(fbUsersBase+authorizedUser+'/list');
	var list = '<ul>\n';
	
	listRef.on('value', function(snapshot) {
		if(snapshot.val() === null) {
			console.log('empty reading list');
			$('#list_status').html("Your reading list is empty.");
		} else {				
				listRef.on('child_added', function(snapshot) {
					var item = snapshot.val();
					//list += '<li><a href="'+ item.url+'">'+ item.url +'</a>&nbsp;&nbsp;<button class="remURL" id = "'+username+'___'+snapshot.name()+' title="delete this item">delete</button></li>\n';
					//list += '<li><a href="'+ item.url+'">'+ item.url +'</a>&nbsp;&nbsp;<button class="remURL" id = "'+username+'___'+snapshot.name()+'" onclick = "removeURL(\''+username+'\',\''+snapshot.name()+'\')" title="delete this item">delete</button></li>\n';
					
					list += '<li><a href="'+ modURL(item.url)+'" title = "'+ item.url+'">'+ truncateURL(item.url) +'</a>&nbsp;&nbsp;<a class="remURL" onclick = "removeURL(\''+snapshot.name()+'\')" title="remove URL"><i class="fa fa-fw fa-trash-o pull-right" style = "margin-top: 3px;"></i></a></li>\n';
				});	
				
				console.log(list);	
				$('#list').html(list+'</ul>');
			}
	});
}

function removeURL(refName){
	var listRef = new Firebase(fbUsersBase+authorizedUser+'/list');
	var ref = listRef.child(refName);
	
	ref.remove(onComplete);
}

var onComplete = function(error) {
  if (error)
    console.log('op failed.');
  else 
  	console.log('op successful.');
};


function modURL(url){
	var newURL= 'http://localhost:5000/view/'+ url.replace(/^(https?:\/\/)?/,'')
	return newURL;
}

function truncateURL(url){	
	if ( url.length > 35 ){
		url = url.substring(0,34)+'...';
	}
	return url; 
}