Firebase.enableLogging(true);

// define firebase paths (this should all really be in a different file, hunh?)
var fbBase = 'https://nrst1.firebaseio.com/'; // make sure to change firebase + permissions in forge!!!!!
var fbUsersBase = fbBase+'users/';

// initialize authorized user variables [this prevents us from accessing anybody else's data]
var authorizedUser;
var authorizedUserId;

// instatiate the FirebaseSimpleLogin and monitor the user's auth state
var fb = new Firebase(fbBase);
var usertable = new Firebase(fbUsersBase);

var auth = new FirebaseSimpleLogin(fb, function(error, user) {
	if (error) {
		// an error occurred while attempting login
		$('.auth_status').html("login error").show().fadeOut(5);
	} else if (user) {
			// user authenticated with Firebase, set authenticated user variable, and check if this is a new user
			authorizedUser = user.username;
			authorizedUserId = user.id;
			
			checkUser();
			$('.auth_login').hide();	// force button show/hide behavior
			$('.auth_logout').show();
		} else {
				$('.auth_logout').hide(); // force button show/hide behavior
				$('.auth_login').show();
			}
});
		
// login/out methods
function login(){
	auth.login('twitter', {rememberMe: true}); //set default session length to 30 days.
	console.log('log in');
}

function logout(){
	auth.logout();  
	$('.auth_button').toggle();
	console.log('log out');
	location.reload(); // explicitly reload page (temporary solution to logout() not refreshing page HTML - would prefer to rerender than refresh?)
}

// create new user 
function newUser(){
	var newUserRef = new Firebase(fbUsersBase+authorizedUser);
	newUserRef.update({date_created : Firebase.ServerValue.TIMESTAMP, id : authorizedUserId});
}

// check if authorized login corresponds to an existing user - if not, create it.
function checkUser(){
	var userRef = new Firebase(fbUsersBase+authorizedUser);
	userRef.on('value', function(snapshot) {
		
		if(snapshot.val() === null) {
			console.log('User '+authorizedUser+' does not exist. creating now!');
			newUser();
		}
		greetUser();
	});
}

// greet user
function greetUser(){
	$('#greeting').show();
	$('.user_name').html(authorizedUser);
}

function addURL(url){
	var listRef = new Firebase(fbUsersBase+authorizedUser+'/list');
	var pushRef = listRef.push();
	
	pushRef.set({
		'url': url,
		'date_added': Firebase.ServerValue.TIMESTAMP
	}, onComplete);
}

var onComplete = function(error) {
  if (error)
    console.log('op failed.');
  else 
  	console.log('op successful.');
};

$( document ).ready(function() {
  $('.auth_login').click(function() { login(); });
	$('.auth_logout').click(function() { logout();});
	$('.add_button').click(function() { 
		
		if (pURL && pURL!=''){
			console.log(pURL);
			//alert(pURL);
			addURL(pURL);
		} else { alert('no url to add');}
		
	});
	//console.log( "ready!" );
});