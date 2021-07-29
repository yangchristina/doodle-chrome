/*
    1. sticky bar
    2. input RGB
    3. highlighter
    must refresh page first to work?? idk if this is still a problem
    can't draw over entire page
    add highlighter
    https://p5js.org/examples/dom-input-and-button.html add input
    https://developer.chrome.com/docs/extensions/mv2/manifest/
    bar at bottom that shows info: color, brush size

    for max height:
    

    

    s = window.getSelection(); //Returns a Selection
    oRange = s.getRangeAt(0); //get the text range
    oRect = oRange.getBoundingClientRect();
    https://stackoverflow.com/questions/5176761/getting-selected-text-position
*/

var s = function(sketch) {
    let size;
    let color;
    let painting = false;
    let r;
    let pos;
    let height;
    let prevPos;
    let barHeight;

    sketch.setup = function() {
        let body = document.body,
        html = document.documentElement;
        height = Math.max( body.scrollHeight, body.offsetHeight, 
            html.clientHeight, html.scrollHeight, html.offsetHeight );

        let c = sketch.createCanvas(document.body.clientWidth, height);
        c.position(0, 0);
        c.style('pointer-events', 'none');
        c.style('z-index', '999');

        //variables
        size = 4
        color = 255
        pos = 0
        prevPos = pos
        barHeight = 50

        sketch.clear();
    };

    sketch.draw = function() {
        if (painting){
            document.body.style['userSelect'] = 'none';

            sketch.Color();
            sketch.BrushSize();
            sketch.Paint(); 
            sketch.drawRect();          
        }else{
            document.body.style['userSelect'] = 'auto';
        }
        if (sketch.keyIsDown(90)) {
            sketch.clear();
        }
            
    };
    sketch.Paint = function() {
        if (sketch.mouseIsPressed) {
            sketch.line(sketch.mouseX, sketch.mouseY, sketch.pmouseX, sketch.pmouseY);
            }
    }
    sketch.Color = function() {
        sketch.colorMode(sketch.HSB)
        
        if (sketch.keyIsDown(67) && color < 360) {
            color += 50
            if(color > 360)
                color= color-360
        }
        sketch.stroke(color, 204, 100);
    }
    sketch.BrushSize = function() {
        if (sketch.keyIsDown(187)&& size < 400) {
            size++
        }
        else if (sketch.keyIsDown(189) && size > 1) {
            size--
        }
        sketch.strokeWeight(size);
        console.log(size)
    }
    sketch.Clear = function() {
        sketch.clear();
    }
    sketch.keyTyped = function() {
        if(sketch.key === 'a'){
            painting = !painting
            if(r){
                r.hide()
            }
            
        }
    }
    sketch.drawRect = function() {
        sketch.noStroke()
        sketch.fill('pink');
        r = sketch.rect(0, pos + sketch.windowHeight-barHeight, sketch.windowWidth, barHeight);
        sketch.fill('black')
        sketch.textSize(24)
        sketch.text(`HSB color: (${color}, 204, 100), brush size: ${size}`, sketch.windowWidth/4, pos + sketch.windowHeight-barHeight+10, sketch.windowWidth, barHeight)
        
    }

    sketch.mouseWheel = function(event) {
        console.log("mouseWheel: "+event.delta);
        //move the square according to the vertical scroll amount
        if(pos < 0)
            pos = 0
        else if(pos > height)
            pos = height
        else
            pos += event.delta;
        
        console.log("pos: "+pos);

        if(prevPos < height){
            sketch.erase()
            sketch.rect(0, prevPos + sketch.windowHeight-barHeight, sketch.windowWidth, barHeight)
            sketch.noErase()
        }

        prevPos = pos

        
        
        //uncomment to block page scrolling
        //return false;
      }
};

var myp5 = new p5(s);