// coded by DARCY LUGT-FALK
const title = "Climate Change in <br>Four Charts"

// custom toast/alert function to replace normal alert function
// yes, this is just the MSAlert function from MathSender, but hey, it's a function i wrote, so i get to use it
function MSAlert(_text) {
	// stops any currently running animations
	$("#toast").finish();
	//sets the text content to be text (makes it so you cant give it html lol)
	$("#toast").text(_text);
	// animates the alert popping up, waiting, and then sliding down.
	$("#toast").animate({
		opacity: "show",
		bottom: "show",
	}, 336, "swing").delay(2400).animate({
		opacity: "hide",
		bottom: "hide",
	}, 336, "swing");
}

// jsgradient function, not made by me
jsgradient = {
	inputA : '',
	inputB : '',
	inputC : '',
	gradientElement : '',
	
	// Convert a hex color to an RGB array e.g. [r,g,b]
	// Accepts the following formats: FFF, FFFFFF, #FFF, #FFFFFF
	hexToRgb : function(hex){
		var r, g, b, parts;
	    // Remove the hash if given
	    hex = hex.replace('#', '');
	    // If invalid code given return white
	    if(hex.length !== 3 && hex.length !== 6){
	        return [255,255,255];
	    }
	    // Double up charaters if only three suplied
	    if(hex.length == 3){
	        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	    }
	    // Convert to [r,g,b] array
	    r = parseInt(hex.substr(0, 2), 16);
	    g = parseInt(hex.substr(2, 2), 16);
	    b = parseInt(hex.substr(4, 2), 16);

	    return [r,g,b];
	},
	
	// Converts an RGB color array e.g. [255,255,255] into a hexidecimal color value e.g. 'FFFFFF'
	rgbToHex : function(color){
		// Set boundries of upper 255 and lower 0
		color[0] = (color[0] > 255) ? 255 : (color[0] < 0) ? 0 : color[0];
		color[1] = (color[1] > 255) ? 255 : (color[1] < 0) ? 0 : color[1];
		color[2] = (color[2] > 255) ? 255 : (color[2] < 0) ? 0 : color[2];
		
		return this.zeroFill(color[0].toString(16), 2) + this.zeroFill(color[1].toString(16), 2) + this.zeroFill(color[2].toString(16), 2);
	},
	
	// Pads a number with specified number of leading zeroes
	zeroFill : function( number, width ){
		width -= number.toString().length;
		if ( width > 0 ){
	  		return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
		}
		return number;
	},

	// Generates an array of color values in sequence from 'colorA' to 'colorB' using the specified number of steps
	generateGradient : function(colorA, colorB, steps){
		var result = [], rInterval, gInterval, bInterval;
		
		colorA = this.hexToRgb(colorA); // [r,g,b]
		colorB = this.hexToRgb(colorB); // [r,g,b]
		steps -= 1; // Reduce the steps by one because we're including the first item manually
		
		// Calculate the intervals for each color
		rStep = ( Math.max(colorA[0], colorB[0]) - Math.min(colorA[0], colorB[0]) ) / steps;
		gStep = ( Math.max(colorA[1], colorB[1]) - Math.min(colorA[1], colorB[1]) ) / steps;
		bStep = ( Math.max(colorA[2], colorB[2]) - Math.min(colorA[2], colorB[2]) ) / steps;
	
		result.push( '#'+this.rgbToHex(colorA) );
		
		// Set the starting value as the first color value
		var rVal = colorA[0],
			gVal = colorA[1],
			bVal = colorA[2];
	
		// Loop over the steps-1 because we're includeing the last value manually to ensure it's accurate
		for (var i = 0; i < (steps-1); i++) {
			// If the first value is lower than the last - increment up otherwise increment down
			rVal = (colorA[0] < colorB[0]) ? rVal + Math.round(rStep) : rVal - Math.round(rStep);
			gVal = (colorA[1] < colorB[1]) ? gVal + Math.round(gStep) : gVal - Math.round(gStep);
			bVal = (colorA[2] < colorB[2]) ? bVal + Math.round(bStep) : bVal - Math.round(bStep);
			result.push( '#'+this.rgbToHex([rVal, gVal, bVal]) );
		};
		
		result.push( '#'+this.rgbToHex(colorB) );
		
		return result;
	},
	
	gradientList : function(colorA, colorB, list){
		var list = (typeof list === 'object')? list : document.querySelector(list);
		
		var listItems = list.querySelectorAll('li'),
			steps  = listItems.length,
			colors = jsgradient.generateGradient(colorA, colorB, steps);

		for (var i = 0; i < listItems.length; i++) {
			var item = listItems[i];
			item.style.backgroundColor = colors[i];
		};
	}
}

// themeing stuff, makes the ui all nice and cool.
const theme = new Theme();
theme.install(document.body);
theme.start();



// vega theme, saved as a function so that it changes whenever the theme values are updated.
const vegaTheme = () => {
	const defaultFont = "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif";
	const markColor = theme.get("f_med")
	const lightColor = theme.get("f_high")
	return {
		arc: {
			fill: markColor
		},
		area: {
			fill: markColor
		},
		line: {
			stroke: markColor
		},
		path: {
			stroke: markColor
		},
		rect: {
			fill: markColor
		},
		shape: {
			stroke: markColor
		},
		symbol: {
			fill: markColor
		},
		bar: {
			fill: markColor
		},
		background: theme.get("background"),
		padding: {
			top: 10,
			right: 10,
			bottom: 10,
			left: 10
		},
		style: {
			'guide-label': {
				font: defaultFont,
				fontSize: 12,
				fill: lightColor

			},
			'guide-title': {
				font: defaultFont,
				fontSize: 12,
				fill: lightColor
			},
			'group-title': {
				font: defaultFont,
				fontSize: 12,
				fill: lightColor

			}
		},
		title: {
			font: defaultFont,
			fontSize: 14,
			fontWeight: 'bold',
			dy: -5,
			anchor: 'start',
			color: lightColor
		},
		axis: {
			gridColor: theme.get("b_med"),
			tickColor: theme.get("b_med"),
			domain: false,
			grid: true
		},
		range: {
			category: [
				theme.get("f_med"),
				theme.get("b_high")
			],
			heatmap: [theme.get("b_high"), theme.get("f_low"), theme.get("f_med")]
		}
	}

}

// alternating colors function
alternatingColors = (index) => {
	return index % 2 ? theme.get("f_med") : theme.get("f_low");
}


function introductionSlide(ctx) {
	console.log("Introduction", "rendered title card");
}


function greenlandMelting() {
	console.log("greenlandMelting", "returned graph spec");
	return {
		"$schema": "https://vega.github.io/schema/vega-lite/v4.json",
		width: "container",
		height: "container",
		autosize: {
			type: "fit"
		},
		"title": "Change in Greenland Ice Sheet Mass",
		"data": {
			url: "/data/greenland.csv",
		
		},
		layer: [{
			mark:{
				type:"point",
				tooltip:true,
				clip:true
			},
			encoding:{
				"color": {
					"value": theme.get("b_high")
				}
			}
		},{
			mark: {
				type: "line",
				tooltip:false,
				clip:true
			},
			transform: [{
				loess: "mass-change",
				on: "year"
			}]
		} ],
		"encoding": {
			x:{
				field:"year",
				type:"quantitative",
				axis:{
					labelExpr:"datum.value % 2 ? '': datum.value"
				},
				scale: {
					zero: false,
					domainMin:2006,
					domainMax:2020,
					clip:true
				}
			},
			y:{
				field:"mass-change",
				type:"quantitative",
				scale: {
					zero: false,
					domainMax:100
				},
				axis :{
					title:"change in mass (in billion tonnes)"
				}
			}
		}
	}

}

function monthCO2Emissions() {
	console.log("Monthly CO2 Emissions", "returned graph spec");

	return {
		$schema: 'https://vega.github.io/schema/vega-lite/v4.json',
		width: "container",
		height: "container",
		autosize: {
			type: "fit"
		},
		data: {
			url: "data/json/co2Time.json"
		},
		title:"Monthly Atmospheric CO2 Level",
		mark: {
			type: "line",
			tooltip: true
		},
		encoding: {
			y: {
				field: 'monthyAverage',
				type: 'quantitative',
				axis: {
					title: "Monthly Average CO2"
				},
				scale: {
					zero: false
				}
			},
			x: {
				field: "decimalDate",
				type: "quantitative",
				axis: {
					title: "Year",
						labelExpr:"datum.value % 2 ? datum.value : ''"
					
				},
				scale: {
					zero: false
				}
			}
		}
	};

}

function averageTempOverTime() {
	console.log("Average land temperature over time", "returned graph spec");

	return {
		$schema: 'https://vega.github.io/schema/vega-lite/v4.json',
		width: "container",
		height: "container",
		autosize: {
			type: "fit"
		},
		data: {
			url: "/data/dateAndAverageTemp.csv",
			format: {
				parse: {
					"dt": "utc:'%Y-%m-%d'"
				}
			}
		},
		title:"Average Land Temperature Since 1748",
		layer: [{
			mark: {
				type: "point",
				filled: true,
				tooltip: true,
				clip: true
			},
			encoding: {
				x: {
					field: "dt",
					type: "quantitative",
				},
				y: {
					field: "LandAverageTemperature",
					type: "quantitative"
				},
				"color": {
					"value": theme.get("b_high")
				},
				"tooltip": [{
					"field": "LandAverageTemperature"
				}, ]
			}

		}, {
			mark: {
				type: "line",
				tooltip: false,
				clip: true
			},
			transform: [{
				loess: "LandAverageTemperature",
				on: "dt"
			}],
			encoding: {
				x: {
					field: "dt",
					type: "quantitative",
					"timeUnit": "year",
					"title": "Year",
					scale: {
						domainMax: {
							year: 2015
						}
					}
				},
				y: {
					field: "LandAverageTemperature",
					type: "quantitative",
					"title": "Average Land Temperature (˚C)"
				}

			}
		}]

	}

}

function carbonTarget() {
	console.log("climate target", "returned graph spec");

	return {
		$schema: 'https://vega.github.io/schema/vega-lite/v4.0.0-beta.1.json',
		width: "container",
		height: "container",
		autosize: {
			type: "fit"
		},
		layer: [
		  {
			data: {
			  format: {
				property: 'features'
			  },
			  url: 'https://www.trafforddatalab.io/interactive_graphics_companion/data/countries.geojson'
			},
			transform: [
			  {
				lookup: 'properties.country',
				from: {
				  key: 'country',
				  fields: [
					'status',
					"year"
				  ],
				  data: {
					url:"data/targetNetZero.csv"
				  }
				}
			  }
			],
			mark: {
			  type: 'geoshape',
			  strokeWidth: 0.5
			},
			projection: {
			  type: 'mercator'
			},
			encoding: {
			  color: {
				field: 'status',
				type: 'nominal',
				"scale": {
					range:[theme.get("b_med"),theme.get("f_med")].concat(jsgradient.generateGradient(theme.get("f_med"),theme.get("b_high"), 5))
					
				  },
				legend: {
				  title: 'Zero Emissions Target Status',
				  direction: 'horizontal',
				  orient: 'bottom',
				  padding: 9
				}
			  },
			  tooltip: [
				{
				  field: 'properties.country',
				  type: 'nominal',
				  title: 'Area'
				},
				{
				  field: 'status',
				  type: 'nominal',
				  title: 'Status'
				},
				{
					field:"year",
					type:"nominal",
					"title":"Year"
				}
			  ]
			}
		  }
		],
		config: {
		  view: {
			stroke: 'transparent'
		  }
		}
	  }
}

// save the functions as slides in the array
// para should be a max of three lines
const slides = [{
	graph: introductionSlide,
	para: "**The climate is changing. It's getting warmer every year.** Here are four charts that show you how the world is heating up. *Use the arrow icons in the bottom-right corner to move between graphs. Access settings and sources by clicking \"Open Menu\". You can hover over the graphs to see data points.*"
}, {
	graph: averageTempOverTime,
	para: "The earth has been getting steadily warmer. In fact, the average land temperature has increased at a rate of 0.07˚C per decade since 1880. But since 1981, this rate has more than doubled to 0.18˚C. This means that if nothing changes by 2050, the earth's temperature will have ::increased by 1.5˚C::.",
},{
	graph: monthCO2Emissions,
	para: 'Scientists agree that the major contributing factor to climate change is the level of atmospheric COˇ2ˇ, which has been increasing since the industrial revolution. [Carbon dioxide is a gas that traps heat in our atmosphere](https://climate.nasa.gov/vital-signs/carbon-dioxide/), and keeps the earth nice and warm (this type of gas is called a [greenhouse gas](https://theconversation.com/climate-explained-why-carbon-dioxide-has-such-outsized-influence-on-earths-climate-123064)). COˇ2ˇ has always existed in our environment. However, humanity is now pumping COˇ2ˇ into the atmosphere at an unprecedented rate; ::10 times faster:: than any other point in the past 66 million years. ',
}, {
	graph: greenlandMelting,
	para: "If the level of COˇ2ˇ in the atmosphere does not decrease, the earth will continue to get warmer. Thus resulting in the [increased likelihood](https://www.vox.com/energy-and-environment/2018/1/19/16908402/global-warming-2-degrees-climate-change) of extreme weather conditions, such as heatwaves, floods and bushfires. **Ice-sheets will melt. Oceans will rise.** As an example: Greenland has been steadily melting since 2002, losing almost ::4 trillion tonnes of ice::. Mountain ranges such as the Himalayas and the Alps are similarly losing ice."
}, {
	graph: carbonTarget,
	para: "Given that COˇ2ˇ emissions are the main source of global warming, many countries have been encouraged to reduce their carbon emissions to a ::net-zero by at least 2050::. And have been [encouraged to pass legislation](https://unfccc.int/kyoto_protocol) that specifically makes it a requirement of the government to reach these self-imposed targets. *Hover your mouse over the above map to view the target year and the target status for each country. (null means that the country has not set a target, or that we don't have data for them)*"
}, ];
// sets what slide/graph the user's on
let currentSlide = 1;

// increases the current slide by val
function increaseSlideValue(_val) {
	currentSlide += _val;
	let totalAmountOfSlides = slides.length;
	// updates the position indicator
	$("#slideCounter").text(`(${currentSlide}/${totalAmountOfSlides})`);
}

// animates and changes the paragraph text
function updateParaText() {
	const newText = slides[currentSlide - 1].para;
	//alert("huh")
	$("#infoPara").html(micromarkupParse(newText));

}

async function loadGraph(newGraph) {
	return vegaEmbed("#vis", newGraph, {
		config: vegaTheme(),
		defaultStyle: false,
		actions: false,
		tooltip: true,
		width: "container",
		height: "container",
		autosize: {
			type: "fit"
		},
	})
}

function updateGraph() {
	const newGraph = slides[currentSlide - 1].graph();
	if (currentSlide != 1) {
		$("#titleContainer").hide()
		$("#vis").show()
		return loadGraph(newGraph)


	} else {
		$("#vis").hide()
		$("#titleContainer").show()
		return new Promise((res, rej) => {
			$("#titleContainer").html(title);
			res("updated title")
		})
	}
}

function fadeOutEverything() {

	return new Promise((res, rej) => {
		console.log("fadeOutEverything::promise", "fadingOut")

		$("#obj").finish()
		$("#obj").animate({
				opacity: 0
			},
			336,
			"swing", () => {
				res("yay")
			})
	})



}

function fadeInEverything() {
	console.log("fadeInEverything", "fadingIn")
	$("#obj").finish()
	$("#obj").animate({
			opacity: 1
		},
		336,
		"swing")
}

function updateEverything() {

	return new Promise((res, rej) => {
		console.log("updateEverything::promise", "updating stuff")
			// renders the graph para text
		updateParaText();
		// renders the current graph
		updateGraph().then(
				() => {
					console.log(slides[currentSlide - 1].graph, "loaded");
					res("yay")
				}
			).catch(()=>{
				MSAlert("An error has occured.")
			})
			// if this is moved into the above promise then thing it just doesnt show the graphs for some reason. 
			// PROBLEM FIXED. SOLUTION:
			/* you cannot write to the canvas element whilst it is hidden via display:none. to get around this, use opacity as the method of hiding the element, rather than display type. In doing this you fix the canvas problem, but you also make it easier to deal with different display properties, so that display:flex/grid don't get overwritten */

		/*Notes from doing a bit of debugging:
			(a)when the fade in animation starts before the updateGraph promise has resolved the graph shows up. but when (b) the fade in animation starts after the graph has been loaded, no graph is shown (possibly because vega-embed just doesnt render to elements that arent visible? NOPE, that's not what's going on apparently).
		https://stackoverflow.com/questions/20200627/draw-in-hidden-html5-canvas-element-doesnt-work
		*/
	})

}
// renders the graphs.
function renderGraphs() {
	// increases the slide amount by 0,
	// basically to render the slide position indicator
	increaseSlideValue(0);

	fadeOutEverything().then(() => {
			$("#loadingText").show()
			updateEverything().then(() => {
				$("#loadingText").hide()
				fadeInEverything()
			}).catch(()=>{
				MSAlert("An error has occured.")
			})

		}

	)

}



renderGraphs();

// basically reloads the graphs when the theme is changed.
theme.onLoad = renderGraphs;
