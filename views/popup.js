//display slider value
var slider = document.getElementById("pa-slider");
var output = document.getElementById("sliderValue");

slider.oninput = function() {
    output.innerHTML = this.value;
}


