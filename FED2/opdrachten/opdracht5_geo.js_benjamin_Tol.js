/***
* cmdaan.js
*	Bevat functies voor CMDAan stijl geolocatie welke uitgelegd
*	zijn tijdens het techniek college in week 5.
*
*	Author: J.P. Sturkenboom <j.p.sturkenboom@hva.nl>
* 	Credit: Dive into html5, geo.js, Nicholas C. Zakas
*
*	Copyleft 2012, all wrongs reversed.
*/

// Variable declaration
var SANDBOX = "SANDBOX";
var LINEAIR = "LINEAIR";
var GPS_AVAILABLE = 'GPS_AVAILABLE';
var GPS_UNAVAILABLE = 'GPS_UNAVAILABLE';
var POSITION_UPDATED = 'POSITION_UPDATED';
var REFRESH_RATE = 1000;
var currentPosition = currentPositionMarker = customDebugging = debugId = map = interval =intervalCounter = updateMap = false;
var locatieRij = markerRij = [];

// Event functies - bron: http://www.nczonline.net/blog/2010/03/09/custom-events-in-javascript/ Copyright (c) 2010 Nicholas C. Zakas. All rights reserved. MIT License
// Gebruik: ET.addListener('foo', handleEvent); ET.fire('event_name'); ET.removeListener('foo', handleEvent);
function EventTarget(){this._listeners={}}
EventTarget.prototype={constructor:EventTarget,addListener:function(a,c){"undefined"==typeof this._listeners[a]&&(this._listeners[a]=[]);this._listeners[a].push(c)},fire:function(a){"string"==typeof a&&(a={type:a});a.target||(a.target=this);if(!a.type)throw Error("Event object missing 'type' property.");if(this._listeners[a.type]instanceof Array)for(var c=this._listeners[a.type],b=0,d=c.length;b<d;b++)c[b].call(this,a)},removeListener:function(a,c){if(this._listeners[a]instanceof Array)for(var b=
this._listeners[a],d=0,e=b.length;d<e;d++)if(b[d]===c){b.splice(d,1);break}}}; var ET = new EventTarget();


/**
Don't use global variables/objects
Use short clear (meaningful) names
Constructor function start with capital
Constants with all captials
camelCase the rest
Place external scripts at the bottom of the page
Comment your code
**/

// Namespace: beveiliging die ervoor zorgt dat er geen dubbele variabele gemaakt kunnen worden.
var SPACE = SPACE || {};

//self invoking function: zorgt ervoor dat de functie een local scope creert.
//De opbjecten binnen deze scope worden automatisch beveiligd overschreden te worden.
// door andere functies in het script. Ook voert het script zichzelf uit.
// BRon: http://javascript.about.com/od/byexample/a/usingfunctions-selfinvoking-example.htm

(function(){
	// Dit is de gps opject
	SPACE.gps = {

	// Test of GPS beschikbaar is (via geo.js) en vuur een event af
		init: function(){
			
		},

		// Start een interval welke op basis van REFRESH_RATE de positie updated
		sartInterval: function(){

		},

		// Vraag de huidige positie aan geo.js, stel een callback in voor het resultaat
		updatePosition: function(){

		},

		// Callback functie voor het instellen van de huidige positie, vuurt een event af
		setPosition: function(){

		},

		// Controleer de locaties en verwijs naar een andere pagina als we op een locatie zijn
		checkPosition: function(){
			
		},

		// Bereken het verchil in meters tussen twee punten
		calculateDistance: function(){

		}

	}

	// Dit is de map opject
	SPACE.map = {

			// GOOGLE MAPS FUNCTIES
		/**
		 * generate_map(myOptions, canvasId)
		 *	roept op basis van meegegeven opties de google maps API aan
		 *	om een kaart te genereren en plaatst deze in het HTML element
		 *	wat aangeduid wordt door het meegegeven id.
		 *
		 *	@param myOptions:object - een object met in te stellen opties
		 *		voor de aanroep van de google maps API, kijk voor een over-
		 *		zicht van mogelijke opties op http://
		 *	@param canvasID:string - het id van het HTML element waar de
		 *		kaart in ge-rendered moet worden, <div> of <canvas>
		 */
		generateMap: function(){

		},

		// Update de positie van de gebruiker op de kaart
		updatePosition: function(){
			
		}


	}

	// Dit is de debug object
	SPACE.debug = {

	// FUNCTIES VOOR DEBUGGING

		geoErrorHandler: function(){

		},

		Message: function(){

		},

		setCustomDebugging: function(){

		}

	}

	SPACE.helpers = {

		isNumber: function(){
		  
		}

	}
});
