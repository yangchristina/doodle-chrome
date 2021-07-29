//issues
/*
    can't draw over certain things
    can't always hilight text
    must refresh page first to work
*/

var s = function(sketch) {
    let size;
    let color;

    sketch.setup = function() {
        document.body.style['userSelect'] = 'none';
        let h = document.body.clientHeight;
        let c = sketch.createCanvas(document.body.clientWidth, document.body.clientWidth);
        c.position(0, 0);
        c.style('pointer-events', 'none');

        //variables
        size = 4
        color = 255

        sketch.clear();
    };

    sketch.draw = function() {
        sketch.Color();
        sketch.BrushSize();
        sketch.Paint();

        if (sketch.keyIsDown(90)) {
            sketch.clear();
        }
    };

    sketch.Paint = function() {
        if (sketch.keyIsDown(sketch.SHIFT)) {
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
        if (sketch.keyIsDown(sketch.UP_ARROW)&& size < 400) {
            size++
        }
        else if (sketch.keyIsDown(sketch.DOWN_ARROW) && size > 0) {
            size--
        }
        sketch.strokeWeight(size);
        console.log(size)
    }
    sketch.Clear = function() {
        sketch.clear();
    }

};

var myp5 = new p5(s);