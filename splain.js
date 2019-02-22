const quadraticMarkup = '<path id=\'p\' d=\'M30,30Q90 30 60 60\' stroke=\'#00f\' stroke-width=\'2\' fill=\'transparent\'></path>\n' +
    '            <circle id=\'c1\' class=\'control\' cx=\'30\' cy=\'30\' r=\'4\' fill=\'#f00\'></circle>\n' +
    '            <circle id=\'c2\' class=\'control\' cx=\'90\' cy=\'30\' r=\'4\' fill=\'#f00\'></circle>\n' +
    '            <circle id=\'c3\' class=\'control\' cx=\'60\' cy=\'60\' r=\'4\' fill=\'#f00\'></circle>';
const cubicMarkup = '<line id=\'l1\' x1=\'30\' y1=\'60\' x2=\'20\' y2=\'30\' stroke=\'#88f\'></line>\n' +
    '                <line id=\'l2\' x1=\'70\' y1=\'30\' x2=\'60\' y2=\'60\' stroke=\'#88f\'></line>\n' +
    '                <path id=\'p\' d=\'M30,60C20 30,70 30,60 60\' stroke=\'#00f\' stroke-width=\'2\' fill=\'transparent\'></path>\n' +
    '                <circle id=\'c1\' class=\'control\' cx=\'30\' cy=\'60\' r=\'4\' fill=\'#f00\'></circle>\n' +
    '                <circle id=\'c2\' class=\'control\' cx=\'20\' cy=\'30\' r=\'4\' fill=\'#f00\'></circle>\n' +
    '                <circle id=\'c3\' class=\'control\' cx=\'70\' cy=\'30\' r=\'4\' fill=\'#f00\'></circle>\n' +
    '                <circle id=\'c4\' class=\'control\' cx=\'60\' cy=\'60\' r=\'4\' fill=\'#f00\'></circle>';
const continuousMarkup = '<line id=\'l1\' x1=\'20\' y1=\'60\' x2=\'10\' y2=\'30\' stroke=\'#88f\'></line>\n' +
    '            <line id=\'l2\' x1=\'60\' y1=\'30\' x2=\'50\' y2=\'60\' stroke=\'#88f\'></line>\n' +
    '            <line id=\'l3\' x1=\'50\' y1=\'60\' x2=\'40\' y2=\'90\' stroke=\'#484\'></line>\n' +
    '            <line id=\'l4\' x1=\'90\' y1=\'30\' x2=\'80\' y2=\'60\' stroke=\'#88f\'></line>\n' +
    '            <path id=\'p\' d=\'M20,60C10 30,60 30,50 60S90 30,80 60\' stroke=\'#00f\' stroke-width=\'2\' fill=\'transparent\'></path>\n' +
    '            <circle id=\'c1\' class=\'control\' cx=\'20\' cy=\'60\' r=\'4\' fill=\'#f00\'></circle>\n' +
    '            <circle id=\'c2\' class=\'control\' cx=\'10\' cy=\'30\' r=\'4\' fill=\'#f00\'></circle>\n' +
    '            <circle id=\'c3\' class=\'control\' cx=\'60\' cy=\'30\' r=\'4\' fill=\'#f00\'></circle>\n' +
    '            <circle id=\'c4\' class=\'control\' cx=\'50\' cy=\'60\' r=\'4\' fill=\'#f00\'></circle>\n' +
    '            <circle id=\'c3b\' cx=\'40\' cy=\'90\' r=\'4\' fill=\'#080\'></circle>\n' +
    '            <circle id=\'c5\' class=\'control\' cx=\'90\' cy=\'30\' r=\'4\' fill=\'#f00\'></circle>\n' +
    '            <circle id=\'c6\' class=\'control\' cx=\'80\' cy=\'60\' r=\'4\' fill=\'#f00\'></circle>';
const markupRegistry = [quadraticMarkup, cubicMarkup, continuousMarkup];

let dragObject = null;
const canvas = document.getElementById('canvas');
const sizingPoint = canvas.createSVGPoint();

const toCanvasCoords = function(e) {
    sizingPoint.x = e.clientX;
    sizingPoint.y = e.clientY;
    const result = sizingPoint.matrixTransform(canvas.getScreenCTM().inverse());
    return [Math.round(result.x), Math.round(result.y)];
};

const getCoords = function(elementId) {
    const x = parseInt(document.getElementById(elementId).getAttribute('cx'), 10);
    const y = parseInt(document.getElementById(elementId).getAttribute('cy'), 10);
    return {x: x, y: y};
};

const setLineEndpoints = function(lineId, point1, point2) {
    const line = document.getElementById(lineId);
    line.setAttribute('x1', point1.x);
    line.setAttribute('y1', point1.y);
    line.setAttribute('x2', point2.x);
    line.setAttribute('y2', point2.y);
};

const recalculateCurve = function() {
    const point1 = getCoords('c1');
    const point2 = getCoords('c2');
    const point3 = getCoords('c3');
    let curveString;
    if (!document.getElementById('c4')) {
        curveString = `M${point1.x},${point1.y}Q${point2.x} ${point2.y},${point3.x} ${point3.y}`;
    } else {
        const point4 = getCoords('c4');
        setLineEndpoints('l1', point1, point2);
        setLineEndpoints('l2', point3, point4);
        if (!document.getElementById('c5')) {
            curveString = `M${point1.x},${point1.y}C${point2.x} ${point2.y},${point3.x} ${point3.y},${point4.x} ${point4.y}`;
        } else {
            const point5 = getCoords('c5');
            const point6 = getCoords('c6');
            const point3b = {x: 2 * point4.x - point3.x, y: 2 * point4.y - point3.y};
            const c3b = document.getElementById('c3b');
            c3b.setAttribute('cx', point3b.x);
            c3b.setAttribute('cy', point3b.y);
            setLineEndpoints('l3', point3b, point4);
            setLineEndpoints('l4', point5, point6);
            curveString = `M${point1.x},${point1.y}C${point2.x} ${point2.y},${point3.x} ${point3.y},${point4.x} ${point4.y}S${point5.x} ${point5.y},${point6.x} ${point6.y}`;
        }
    }
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
    renderEl.innerHTML = inputEl.innerText;
    attachControlEvents();
};

const handleTabClick = function(e) {
    document.getElementsByClassName('tab active')[0].className = 'tab';
    e.target.className = 'tab active';
    const markup = markupRegistry[parseInt(e.target.getAttribute('data-markup'), 10)];
    document.getElementById('markup').innerText = markup;
    handleKeyup();
};

const updateUi = function() {
    document.getElementById('markup').innerText = canvas.innerHTML;
};

const attachControlEvents = function() {
    const controls = document.getElementsByClassName('control');
    Array.prototype.forEach.call(controls, (control) => {
        control.addEventListener('mousedown', handleMousedown);
    });
};

attachControlEvents();
const tabs = document.getElementsByClassName('tab');
Array.prototype.forEach.call(tabs, (tab) => {
    tab.addEventListener('click', handleTabClick)
});
canvas.addEventListener('mousemove', handleMousemove);
canvas.addEventListener('mouseup', handleMouseup);
const markup = document.getElementById('markup');
markup.addEventListener('keyup', handleKeyup);
updateUi();