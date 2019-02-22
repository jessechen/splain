let dragObject = null;
const canvas = document.getElementById('canvas');
const sizingPoint = canvas.createSVGPoint();

const toCanvasCoords = function(e) {
    sizingPoint.x = e.clientX;
    sizingPoint.y = e.clientY;
    const result = sizingPoint.matrixTransform(canvas.getScreenCTM().inverse());
    return [Math.round(result.x), Math.round(result.y)];
};

const recalculateCurve = function() {
    const x1 = parseInt(document.getElementById('c1').getAttribute('cx'), 10);
    const y1 = parseInt(document.getElementById('c1').getAttribute('cy'), 10);
    const x2 = parseInt(document.getElementById('c2').getAttribute('cx'), 10);
    const y2 = parseInt(document.getElementById('c2').getAttribute('cy'), 10);
    const x3 = parseInt(document.getElementById('c3').getAttribute('cx'), 10);
    const y3 = parseInt(document.getElementById('c3').getAttribute('cy'), 10);
    const curveString = `M${x1},${y1}Q${x2} ${y2} ${x3} ${y3}`;
    const path = document.getElementById('p');
    path.setAttribute('d', curveString);
    updateUi();
};

const handleMousedown = function(e) {
    dragObject = e.target;
    dragObject.setAttribute('fill', '#800');
};

const handleMousemove = function(e) {
    if (!dragObject) { return; }
    [newX, newY] = toCanvasCoords(e);
    dragObject.setAttribute('cx', newX);
    dragObject.setAttribute('cy', newY);
    recalculateCurve();
};

const handleMouseup = function() {
    if (!dragObject) { return; }
    dragObject.setAttribute('fill', '#f00');
    dragObject = null;
    updateUi();
};

const handleKeyup = function() {
    const inputEl = document.getElementById('markup');
    const renderEl = document.getElementById('canvas');
    renderEl.innerHTML = inputEl.value;
    attachControlEvents();
};

const updateUi = function() {
    document.getElementById('markup').innerHTML = canvas.innerHTML;
};

const attachControlEvents = function() {
    const controls = document.getElementsByClassName('control');
    Array.prototype.forEach.call(controls, (control) => {
        control.addEventListener('mousedown', handleMousedown);
    });
};

attachControlEvents();
canvas.addEventListener('mousemove', handleMousemove);
canvas.addEventListener('mouseup', handleMouseup);
const markup = document.getElementById('markup');
markup.addEventListener('keyup', handleKeyup);
updateUi();