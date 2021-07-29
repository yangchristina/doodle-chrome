/*
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
    let input, button, greeting;
    let stickyX, stickyY;

    sketch.setup = function() {
        let body = document.body,
        html = document.documentElement;
        height = Math.max( body.scrollHeight, body.offsetHeight, 
            html.clientHeight, html.scrollHeight, html.offsetHeight );

        let c = sketch.createCanvas(document.body.clientWidth, height);
        c.position(0, 0);
        c.style('pointer-events', 'none');
        c.style('z-index', '999');

        //input
        input = sketch.createInput();
        input.position(20, 65);

        button = sketch.createButton('submit');
        button.position(input.x + input.width, 65);
        button.mousePressed(sketch.Greet);

        greeting = sketch.createElement('h2', 'color?');
        greeting.position(20, 5);

        sketch.textAlign(sketch.CENTER);
        sketch.textSize(50);

        //variables
        size = 4
        color = 255
        pos = 0
        prevPos = pos
        barHeight = 50
        stickyX = sketch.windowWidth/4
        stickyY = pos + sketch.windowHeight-barHeight+10

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
        
    }
    sketch.Clear = function() {
        sketch.clear();
    }
    sketch.keyPressed = function() {
        if(sketch.keyCode === 65){
            painting = !painting
        }

        if (sketch.keyCode === 187 && size < 400) {
            size++
        }
        else if (sketch.keyCode === 189 && size > 1) {
            size--
        }
        sketch.strokeWeight(size);
        console.log(size)
    }
    sketch.drawRect = function(name) {
        sketch.noStroke()
        sketch.fill('pink');
        r = sketch.rect(0, pos + sketch.windowHeight-barHeight, sketch.windowWidth, barHeight);
        sketch.fill('black')
        sketch.textSize(24)
        sketch.text(`HSB color: (${color}, 204, 100), brush size: ${size}`, sketch.windowWidth/4, pos + sketch.windowHeight-barHeight+10, sketch.windowWidth, barHeight)
        if(name)
            sketch.text(name, stickyX/2, stickyY+10);
    }
    sketch.Greet = function() {
        const name = input.value();
        greeting.html('hello ' + name + '!');
        input.value('');
        sketch.fill('black')
        sketch.drawRect(name)
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