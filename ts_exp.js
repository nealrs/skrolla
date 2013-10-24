/*
  
  tiltScroll.js, Copyright (c) 2013 Neal Shyam <http://www.nealshyam.com>
  > Depends on jquery & gyro.js [Copyright (c) 2011 Tom Gallacher <http://www.tomg.co>, released under the MIT license]

  (The MIT License)
  
	> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

	> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

	> THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

// DEFINE PARAMETERS

var b0 = -45; // define 45 degree datums
var g0 = -b0;
 
var u1 = 3; // scroll up when tilted 3 to 15 degrees from datum (48-60 degrees)
var u2 = 15;

var d1 = -5; // scroll down when tilted -25 to -5 degrees from datum (20-40 degrees) 
var d2 = -25; // note: triggers are flipped for gamma tilt (landscape on most devices)

var pf = 300; // gyro polling frequency in milliseconds
var sd = 25; // scroll distance in pixels

// HELPER FUNCTIONS
function tiltScroll(y) {window.scrollBy(0,y);} // 
function scrollDebug(i) {$('p').css( "color", i);} // debug using colored text when scrolling

// MAIN LOGIC
gyro.frequency = pf;
gyro.startTracking(function(o) {

	var b1 = o.beta;	
	var db = b1 - b0;
	
	var g1 = o.gamma;	
	var dg = g1 - g0;
	
	if ((db > u1 && db < u2) || (dg < d1 && dg > d2)) { 
		tiltScroll(-sd)		// SCROLL UP
		scrollDebug("blue") 
		
	} else if ((db < d1 && db > d2) || (dg > u1 && dg < u2)) { 
			tiltScroll(sd) 	// SCROLL DOWN
			scrollDebug("red")			
		
		}	else {scrollDebug("black")}		
});