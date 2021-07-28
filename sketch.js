function setup() {
    let c = createCanvas(windowWidth, windowWidth);
    c.position(0,0);
    clear()
    console.log("set up")
}

function draw() {
    console.log("looping")
    stroke(0)
    strokeWeight(4)
    line(mouseX, mouseY, pmouseX, pmouseY)
}