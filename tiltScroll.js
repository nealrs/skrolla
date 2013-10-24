/* ====================================================================================
tiltScroll.js, Copyright (c) 2013 Neal Shyam <http://www.nealshyam.com>
> Depends gyro.js [Copyright (c) 2011 Tom Gallacher <http://www.tomg.co>, released under the MIT license]

(The MIT License)
> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
> THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
==================================================================================== */

///////////////////////////////////////////////////////////////////////////////////////
gyro.frequency = 300; // polling frequency
var scrollFlag = 0; // this flag determines whether (1) or not (0) things scroll
var debug = true; // false is off, true is on

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
	
	} else if (((db < -5 && db > -25) || (dg > 3 && dg < 15)) && scrollFlag > 0) { 
			tiltScroll(25); 	// SCROLL DOWN
			if (debug){scrollDebug("red");}			
	
		}	else {
				if (debug) {scrollDebug("black");}
			}		
});
///////////////////////////////////////////////////////////////////////////////////////

function tiltScroll(y) {window.scrollBy(0,y);}

function scrollDebug(c) {
	var allP = document.getElementsByTagName('p');	
	for (var i=0; i < allP.length; i++ ) {
		allP[i].style.color = c;
	}
}

function enableScroll(){
	scrollFlag = 1;

 	document.getElementById('sStatus').innerHTML="ON";
 	document.getElementById('sStatus').style.color="green";
 	
 	document.getElementById('eScroll').disabled = true;
 	document.getElementById('dScroll').disabled = false;
} 

function disableScroll(){
	scrollFlag = 0;
	scrollDebug("black");
	
 	document.getElementById('sStatus').innerHTML="OFF";
 	document.getElementById('sStatus').style.color="maroon";
 	
 	document.getElementById('eScroll').disabled = false;
 	document.getElementById('dScroll').disabled = true;
}

//$(document).ready(function() {	
	enableScroll();
//});