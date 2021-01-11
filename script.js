var mic;
var ftt;

function setup(){
    mic = new p5.AudioIn();
    mic.start();
    createCanvas(window.innerWidth, window.innerHeight);
    fft = new p5.FFT();
    fft.setInput(mic);
    colorMode('HSB');
    
}

function meancalculator(arr, samples){
    var tot;
    for (var i = 0; i < arr.length -1 ; i++){
        tot = arr[i] + arr[i+1];
    }
    return tot/samples;
}



function draw(){

    // Lets put origin in the center
    translate (width/2, 0);

    background(0);
    // Parameter will indicates the number of samples (campionamenti)
    // 256, 512, 1024 --> Default
    var spectrum = fft.analyze();
    console.log(Math.max(...spectrum)); 
    // console.log(spectrum);
    line(0, height/2, width , height/2);
    // Line Thickness
    strokeWeight(5);
    // For all value in spectrum lenght, draw a line for eachone
    for (var i = 0; i < spectrum.length - 32; i=i+32){
        // var amp = spectrum[i];
        var temp = spectrum.slice(i, i+33);
        var mean = meancalculator(temp, 32);
        var amp = mean*(10);
        // console.log(amp);
        // remap the value of spectrum from 0 to 256 to fill the canvas dim
        var y = map(amp, 0 , 256 , height/2 , 0);
        //console.log(y);
        
        // if we want lines 
        // line(i+32, height/2, i+32, y);
        // line(i+32, height/2, i+32 , height - y);
        // But if we want some rectangles rect(x, y, w, h);
        rectMode(CORNERS);
        // By CORNERS mode we select the 2 diagonal point of rectangle
        fill(255,255,255);
        rect(i, height/2, (i)+32, y);
        rectMode(CORNERS);
        fill(255,255,255);
        rect(i, height/2, (i)+32, height - y);
        
    }

    for (var i = 0; i < spectrum.length - 32; i=i+32){
        // var amp = spectrum[i];
        var temp = spectrum.slice(i, i+33);
        var mean = meancalculator(temp, 32);
        var amp = mean*(10);
        // console.log(amp);
        // remap the value of spectrum from 0 to 256 to fill the canvas dim
        var y = map(amp, 0 , 256 , height/2 , 0);
        //console.log(y);
        // if we want lines 
        // line(i+32, height/2, i+32, y);
        // line(i+32, height/2, i+32 , height - y);
        // But if we want some rectangles rect(x, y, w, h);
        rectMode(CORNERS);
        // Now Lets Mirror it
        fill(255,255,255);
        rect(-(i), height/2, -((i)+32), y);
        rectMode(CORNERS);
        fill(255,255,255);
        rect(-(i), height/2, -((i)+32), height - y);

    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }