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
    const x3 = document.getElementById("c3").getAttribute("cx");
    const y3 = document.getElementById("c3").getAttribute("cy");
    const curveString = `M${x1},${y1}Q${x2} ${y2} ${x3} ${y3}`;
    p.setAttribute("d", curveString);
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