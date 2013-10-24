/* ====================================================================================
tiltScroll.js, Copyright (c) 2013 Neal Shyam <http://www.nealshyam.com>
> Depends on jQuery & gyro.js [Copyright (c) 2011 Tom Gallacher <http://www.tomg.co>, released under the MIT license]

(The MIT License)
> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
> THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
==================================================================================== */

///////////////////////////////////////////////////////////////////////////////////////
gyro.frequency = 300; // polling frequency
var scrollFlag = 0; // this flag determines whether (1) or not (0) tiltScroll is enabled.
var debug = false; // false off, true on (and red is down, blue is up)

gyro.startTracking(function(o) {

	var b0 = 45; // 45 deg datum
	var b1 = o.beta;	
	var db = b1 - b0;

	var g0 = -45; 
	var g1 = o.gamma;	
	var dg = g1 - g0;

	// set angular bounds for up & down scroll zones with a 45 degree 'baseline' - see chart in readme
	if (((db > 3 && db < 15) || (dg < -5 && dg > -25)) && scrollFlag > 0) { 
		tiltScroll(-25);		// SCROLL UP
		if (debug){scrollDebug("blue");}
		scrollIndicator(0);
	
	} else if (((db < -5 && db > -25) || (dg > 3 && dg < 15)) && scrollFlag > 0) { 
			tiltScroll(25); 	// SCROLL DOWN
			if (debug){scrollDebug("red");}
			scrollIndicator(1);
	
		}	else {
				scrollIndicator(-1);
				if (debug) {scrollDebug("black");}
			}		
});
///////////////////////////////////////////////////////////////////////////////////////

function tiltScroll(y) {window.scrollBy(0,y);}

function scrollDebug(c) {
	$('p').css( "color", c);
	
	/*var allP = document.getElementsByTagName('p');
	for (var i=0; i < allP.length; i++ ) {
		allP[i].style.color = c;
	}*/
}

function enableScroll(){
	scrollFlag = 1;
 	
 	document.getElementById('eScroll').innerHTML="<i class='fa fa-circle fa-fw'></i> ON";
 	document.getElementById('dScroll').innerHTML="<i class='fa fa-circle-o fa-fw'></i> OFF";
} 

function disableScroll(){
	scrollFlag = 0;
	scrollDebug("black");
 	
 	document.getElementById('eScroll').innerHTML="<i class='fa fa-circle-o fa-fw'></i> ON";
 	document.getElementById('dScroll').innerHTML="<i class='fa fa-circle fa-fw'></i> OFF";
}

function scrollIndicator(dir){
	if (dir > 0){document.getElementById('sIndicator').innerHTML="<i class='fa fa-long-arrow-down fa-fw'></i>";}
	else if (dir == 0){document.getElementById('sIndicator').innerHTML="<i class='fa fa-long-arrow-up fa-fw'></i>";}
	else {document.getElementById('sIndicator').innerHTML="<i class='fa fa-fw'></i>";}
}

$(document).ready(function() {	
	enableScroll();
});