////////////////////////
// CLICK FUNCTIONS //
////////////////////////

// if the user clicks on the forward slide link
$("#fLink").click(() => {
	let totalAmountOfSlides = slides.length;
	if (currentSlide > totalAmountOfSlides - 1) {
		MSAlert("There are no more graphs to show.");
	} else {
		increaseSlideValue(1);
		renderGraphs();
	}
});

// if the user clicks on the backword slide link.
$("#bLink").click(() => {
	if (currentSlide <= 1) {
		MSAlert("You cannot view negative slides.");
	} else {
		increaseSlideValue(-1);
		renderGraphs();
	}
});

// increase font size button
$("#fIncrease").click(() => {
	const currentFontSize = parseInt(
		getComputedStyle(document.documentElement)
		.getPropertyValue("--font-size")
		.replace("px", "")
	);

	//console.log(currentFontSize);
	const increasedFontSize = currentFontSize + 2;
	document.documentElement.style.setProperty(
		"--font-size",
		increasedFontSize + "px"
	);
});

// decrease font size button
$("#fDecrease").click(() => {
	const currentFontSize = parseInt(
		getComputedStyle(document.documentElement)
		.getPropertyValue("--font-size")
		.replace("px", "")
	);

	//console.log(currentFontSize);
	const decreasedFontSize = currentFontSize - 2;
	document.documentElement.style.setProperty(
		"--font-size",
		decreasedFontSize + "px"
	);
});



// close the menu
$("#closeMenu").click(()=>{
	console.log("#closeMenu click callback", "about to animate");
	$("#menuContainer").animate({
		opacity: "hide"
		},
		336,
		"swing", ()=>{console.log("#closeMenu click callback", "animation completed");})
})

// open the menu
$("#openMenu").click(()=>{
	console.log("#openMenu click callback", "about to animate");
	$("#menuContainer").animate({
		opacity: "show"
		},
		336,
		"swing", ()=>{console.log("#openMenu click callback", "animation completed");})
})

// close menu if background is clicked 
$("#closeElem").click(() =>{
	$("#menuContainer").animate({
		opacity: "hide"
		},
		336,
		"swing", ()=>{console.log("#closeElem click callback", "animation completed");})
})



// theme buttons

const themes = {
	wildfire:{
    background: "#222222",
    f_high: "#FFFFFF",
    f_med: "#FF5E28",
    f_low: "#888888",
    f_inv: "#000000",
    b_high: "#555555",
    b_med: "#333333",
    b_low: "#111111",
    b_inv: "#FF5E28",
  },
  iceAge:{
	"background": "#E9EBEC",
	"f_high": "#172026",
	"f_med": "#545F69",
	"f_low": "#8498A9",
	"f_inv": "#000000",
	"b_high": "#B9C1C5",
	"b_med": "#CAD0D3",
	"b_low": "#D8DCDF",
	"b_inv": "#88B3D7"
  }
}

$("#themeWildfire").click(()=>{
	theme.load(themes.wildfire)
})

$("#themeIceAge").click(()=>{
	theme.load(themes.iceAge)
})

