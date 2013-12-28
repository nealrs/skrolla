/* ====================================================================================
skrolla, Copyright (c) 2013 Neal Shyam <http://www.nealshyam.com>

> Dependencies 
>>jQuery
>>gyro.js [Copyright (c) 2011 Tom Gallacher <http://www.tomg.co>, released under the MIT license] 
>>xframe.js [Copyright (c) 2013 Sho Hashimoto <hashimoto@shokai.org> released under the MIT license] 

(The MIT License)
> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
> THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
==================================================================================== */

///////////////////////////////////////////////////////////////////////////////////////
gyro.frequency = 300; // polling frequency
var scrollFlag = 0; // this flag determines whether (1) or not (0) tiltScroll is enabled.
var scrollIncrement = 25; // scroll increment
var debug = false; // false off, true on (and red is down, blue is up)

var datum = 45; // scroll datum & trigger boundaries
var u1 = 3;
var u2 = 15;
var d1 = -5;
var d2 = -25;

var b0 = datum; // leaving initDatum off for now, but will require some more tuning. more natural scroll bounds.
var g0 = -datum;

gyro.startTracking(function(o) {

	var b0 = datum; // 45 deg datum
	var b1 = o.beta;	
	var db = b1 - b0;

	var g0 = -datum; 
	var g1 = o.gamma;	
	var dg = g1 - g0;

	// set angular bounds for up & down scroll zones with a 45 degree 'baseline' - see chart in readme
	if (((db > u1 && db < u2) || (dg < d1 && dg > d2)) && scrollFlag > 0) { 
		tiltScroll(-scrollIncrement);		// SCROLL UP
		if (debug){scrollDebug("blue");}
		scrollIndicator(0);
	
	} else if (((db < d1 && db > d2) || (dg > u1 && dg < u2)) && scrollFlag > 0) { 
			tiltScroll(scrollIncrement); 	// SCROLL DOWN
			if (debug){scrollDebug("red");}
			scrollIndicator(1);
	
		}	else {
				scrollIndicator(-1);
				if (debug) {scrollDebug("black");}
			}		
});
///////////////////////////////////////////////////////////////////////////////////////

//function tiltScroll(y) {window.scrollBy(0,y);}
function tiltScroll(y) {xframe.scrollY(y);}

function scrollDebug(c) {$('p').css( "color", c);}

function share(){
	$('.socialrail').toggle();
	$('#share').toggleClass("active inactive");
} 

function enableScroll(){
	scrollFlag = 1;
 	
	// might not be the best place for this function.
 	//initDatum();
 	
 	$('#scrollOn').show();
 	$('#scrollOff').hide();
} 

function disableScroll(){
	scrollFlag = 0;
	scrollDebug("black");
	
 	$('#scrollOn').hide();
 	$('#scrollOff').show();
}

function scrollIndicator(dir){
	if (dir > 0){$('#sIndicator').html("<i class='fa fa-arrow-down fa-fw'></i>")}
	else if (dir == 0){$('#sIndicator').html("<i class='fa fa-arrow-up fa-fw'></i>")}
	else {$('#sIndicator').html("<i class='fa fa-power-off fa-fw'></i>")}
}

function exitTS(){window.location.href = url;}

function tshare(){window.location.href = "https://twitter.com/intent/tweet?text=check it, via @getskrolla: &url="+shareURL;}
function fshare(){window.location.href = "https://www.facebook.com/sharer/sharer.php?u="+shareURL;}
function lshare(){window.location.href = "http://www.linkedin.com/shareArticle?mini=true&url="+shareURL;}
function gshare(){window.location.href = "https://plus.google.com/share?url="+shareURL;}
function eshare(){window.location.href = "mailto:?&subject=great read from Skrolla&body="+shareURL;}

function changeOrientation(){ // thanks SO: http://stackoverflow.com/questions/5284878/how-do-i-correctly-detect-orientation-change-using-javascript-and-phonegap-in-io
	switch(window.orientation) {  
		case -90:
		case 90:
			//alert('landscape');
			window.location.reload();
			break; 
		default:
			//alert('portrait');
			window.location.reload();
			break; 
	}
}

// xframe variables
var xframe = null;

function initDatum(){
	// initialize g0 & b0
	origin = gyro.getOrientation();
	b0 = origin.beta;
	g0 = -origin.gamma;}

function load(){
  enableScroll();
  xframe = new XFrame("div#frame");
  xframe.load(window.url);
  xframe.mouseScroll = true;
  enableScroll();
  shareURL = encodeURI(window.url);
	window.addEventListener('orientationchange', changeOrientation);
 	//initDatum();
 	console.log('page load successful');
}

function load2(){
	xframe = new XFrame("div#frame");
	try {
		xframe.load(window.url);
	} catch (e){
			console.log('page load error');
			console.log(e.message);
			exitTS()
	}
  	//xframe.load(window.url);
  	enableScroll();
  	xframe.mouseScroll = true;
  	//enableScroll();
  	shareURL = encodeURI(window.url);
		window.addEventListener('orientationchange', changeOrientation);
}

$(function(){

	// see if page be loaded. if so, load & scroll. if not, redirect to actual page.	
	/*
	var jqxhr = $.get( window.url, function() {
  	xframe = new XFrame("div#frame");
  	xframe.load(window.url);
  	xframe.mouseScroll = true;
  	enableScroll();
  	shareURL = encodeURI(window.url);
		window.addEventListener('orientationchange', changeOrientation);
 		//initDatum();
 		console.log('page load successful');
	})
		.fail(function() {
			//console.log( "iframe error" );
			//xframe.load("Error_Page_URL"); // either redirect to an error page
			//window.location = window.url; // or just redirect the whole site like quibb does.
			console.log('page load error');
			//exitTS()
		})
		.always(function() {
			//shareURL = encodeURI(window.url);
			//window.addEventListener('orientationchange', changeOrientation);
			console.log('ajax function finished');
		});
		*/
		
		/*
		$.get({
			url: 'http://google.com',
			success: load(),
			dataType:'json'
		});*/
		
		/*$.get(window.url, function(data){ 
    	load(); // load iframe
		}).error(function() {
    	exitTS(); // redirect
		}, 'json');*/
		
		/*
		$.get(window.url) 
    	.done(function() { load(); }) // load iframe
			.error(function() { exitTS(); }); // redirect
		*/
		
		
		xframe = new XFrame("div#frame");
  	xframe.load('/def');
  	load2();
  	
		/*$.ajax({
        type: "GET",
        url: window.url,
        dataType: "jsonp",
        jsonpCallback: load2(),
        crossDomain:true,
        statusCode: {
    			0: function() { alert( "page not found" ); }
    		},
        success: function () {
        	console.log('get request successful');
        	load2();
        },
    });*/
		
	
	/*
	xframe = new XFrame("div#frame");
	try {
		xframe.load(window.url);
	} catch (err){
			console.log('page load error');
			console.log(err.message);
			exitTS()
	}
  	//xframe.load(window.url);
  	xframe.mouseScroll = true;
  	enableScroll();
  	shareURL = encodeURI(window.url);
		window.addEventListener('orientationchange', changeOrientation);
 		*/
	
	// xframe scrolling init
  //xframe = new XFrame("div#frame");
  //xframe.load(window.url);
  //xframe.mouseScroll = true;
  
  //shareURL = encodeURI(window.url);

  //// add target='_blank' to all links within iframe somehow
  ////$('#frame.a').attr("target","_blank");
  
  //window.addEventListener('orientationchange', changeOrientation);
  ////changeOrientation();
});