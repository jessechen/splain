let dragObject = null;
const canvas = document.getElementById("canvas");
const sizingPoint = canvas.createSVGPoint();

const round = function(val) {
    return Math.round(val * 10) / 10;
};

const toCanvasCoords = function(e) {
    sizingPoint.x = e.clientX;
    sizingPoint.y = e.clientY;
    const result = sizingPoint.matrixTransform(canvas.getScreenCTM().inverse());
    return [round(result.x), round(result.y)];
};

const recalculateCurve = function() {
    const x1 = document.getElementById("c1").getAttribute("cx");
    const y1 = document.getElementById("c1").getAttribute("cy");
    const x2 = document.getElementById("c2").getAttribute("cx");
    const y2 = document.getElementById("c2").getAttribute("cy");
    const x3 = parseInt(document.getElementById("c3").getAttribute("cx"), 10);
    const y3 = parseInt(document.getElementById("c3").getAttribute("cy"), 10);
    const x4 = parseInt(document.getElementById("c4").getAttribute("cx"), 10);
    const y4 = parseInt(document.getElementById("c4").getAttribute("cy"), 10);
    const x5 = document.getElementById("c5").getAttribute("cx");
    const y5 = document.getElementById("c5").getAttribute("cy");
    const x6 = document.getElementById("c6").getAttribute("cx");
    const y6 = document.getElementById("c6").getAttribute("cy");
    const x3b = x4 + x4 - x3;
    const y3b = y4 + y4 - y3;
    const curveString = `M${x1},${y1}C${x2} ${y2},${x3} ${y3},${x4} ${y4}S${x5} ${y5},${x6} ${y6}`;
    const path = document.getElementById("p");
    path.setAttribute("d", curveString);
    const line1 = document.getElementById("l1");
    line1.setAttribute("x1", x1);
    line1.setAttribute("y1", y1);
    line1.setAttribute("x2", x2);
    line1.setAttribute("y2", y2);
    const line2 = document.getElementById("l2");
    line2.setAttribute("x1", x3);
    line2.setAttribute("y1", y3);
    line2.setAttribute("x2", x4);
    line2.setAttribute("y2", y4);
    const c3b = document.getElementById("c3b");
    c3b.setAttribute("cx", x3b);
    c3b.setAttribute("cy", y3b);
    const line3 = document.getElementById("l3");
    line3.setAttribute("x1", x3b);
    line3.setAttribute("y1", y3b);
    line3.setAttribute("x2", x4);
    line3.setAttribute("y2", y4);
    const line4 = document.getElementById("l4");
    line4.setAttribute("x1", x5);
    line4.setAttribute("y1", y5);
    line4.setAttribute("x2", x6);
    line4.setAttribute("y2", y6);
    updateUi();
};

const handleMousedown = function(e) {
    dragObject = e.target;
    dragObject.setAttribute("fill", "#800");
};

const handleMousemove = function(e) {
    if (!dragObject) { return; }
    [newX, newY] = toCanvasCoords(e);
    dragObject.setAttribute("cx", newX);
    dragObject.setAttribute("cy", newY);
    recalculateCurve();
};

const handleMouseup = function() {
    if (!dragObject) { return; }
    dragObject.setAttribute("fill", "#f00");
    dragObject = null;
    updateUi();
};

const handleKeyup = function() {
    const inputEl = document.getElementById('markup');
    const renderEl = document.getElementById('canvas-container');
    renderEl.innerHTML = inputEl.value;
};

const updateUi = function() {
    document.getElementById("markup").innerHTML = canvas.outerHTML;
};

const controls = document.getElementsByClassName('control');
Array.prototype.forEach.call(controls, (control) => {
    control.addEventListener('mousedown', handleMousedown);
});
canvas.addEventListener('mousemove', handleMousemove);
canvas.addEventListener('mouseup', handleMouseup);
const markup = document.getElementById('markup');
markup.addEventListener('keyup', handleKeyup);
updateUi();