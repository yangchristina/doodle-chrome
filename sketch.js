//issues
/*
    must refresh page first to work?? idk if this is still a problem
    can't draw over entire page
*/

var s = function(sketch) {
    let size;
    let color;
    let painting = true;

    sketch.setup = function() {
        let c = sketch.createCanvas(document.body.clientWidth, document.body.clientWidth);
        c.position(0, 0);
        c.style('pointer-events', 'none');
        c.style('z-index', '999')

        //variables
        size = 4
        color = 255

        sketch.clear();
    };

    sketch.draw = function() {
        if (painting){
            document.body.style['userSelect'] = 'none';

            sketch.Color();
            sketch.BrushSize();
            sketch.Paint();

            if (sketch.keyIsDown(90)) {
                sketch.clear();
            }
        }else{
            document.body.style['userSelect'] = 'auto';
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
        }
    }
};

var myp5 = new p5(s);