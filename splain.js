const quadraticMarkup = "<path id=\"p\" d=\"M30,30Q90 30 60 60\" stroke=\"#00f\" stroke-width=\"2\" fill=\"transparent\"></path>\n" +
    "            <circle id=\"c1\" class=\"control\" cx=\"30\" cy=\"30\" r=\"4\" fill=\"#f00\"></circle>\n" +
    "            <circle id=\"c2\" class=\"control\" cx=\"90\" cy=\"30\" r=\"4\" fill=\"#f00\"></circle>\n" +
    "            <circle id=\"c3\" class=\"control\" cx=\"60\" cy=\"60\" r=\"4\" fill=\"#f00\"></circle>";
const cubicMarkup = "<line id=\"l1\" x1=\"30\" y1=\"60\" x2=\"20\" y2=\"30\" stroke=\"#88f\"></line>\n" +
    "                <line id=\"l2\" x1=\"70\" y1=\"30\" x2=\"60\" y2=\"60\" stroke=\"#88f\"></line>\n" +
    "                <path id=\"p\" d=\"M30,60C20 30,70 30,60 60\" stroke=\"#00f\" stroke-width=\"2\" fill=\"transparent\"></path>\n" +
    "                <circle id=\"c1\" class=\"control\" cx=\"30\" cy=\"60\" r=\"4\" fill=\"#f00\"></circle>\n" +
    "                <circle id=\"c2\" class=\"control\" cx=\"20\" cy=\"30\" r=\"4\" fill=\"#f00\"></circle>\n" +
    "                <circle id=\"c3\" class=\"control\" cx=\"70\" cy=\"30\" r=\"4\" fill=\"#f00\"></circle>\n" +
    "                <circle id=\"c4\" class=\"control\" cx=\"60\" cy=\"60\" r=\"4\" fill=\"#f00\"></circle>";
const continuousMarkup = "<line id=\"l1\" x1=\"20\" y1=\"60\" x2=\"10\" y2=\"30\" stroke=\"#88f\"></line>\n" +
    "            <line id=\"l2\" x1=\"60\" y1=\"30\" x2=\"50\" y2=\"60\" stroke=\"#88f\"></line>\n" +
    "            <line id=\"l3\" x1=\"50\" y1=\"60\" x2=\"40\" y2=\"90\" stroke=\"#484\"></line>\n" +
    "            <line id=\"l4\" x1=\"90\" y1=\"30\" x2=\"80\" y2=\"60\" stroke=\"#88f\"></line>\n" +
    "            <path id=\"p\" d=\"M20,60C10 30,60 30,50 60S90 30,80 60\" stroke=\"#00f\" stroke-width=\"2\" fill=\"transparent\"></path>\n" +
    "            <circle id=\"c1\" class=\"control\" cx=\"20\" cy=\"60\" r=\"4\" fill=\"#f00\"></circle>\n" +
    "            <circle id=\"c2\" class=\"control\" cx=\"10\" cy=\"30\" r=\"4\" fill=\"#f00\"></circle>\n" +
    "            <circle id=\"c3\" class=\"control\" cx=\"60\" cy=\"30\" r=\"4\" fill=\"#f00\"></circle>\n" +
    "            <circle id=\"c4\" class=\"control\" cx=\"50\" cy=\"60\" r=\"4\" fill=\"#f00\"></circle>\n" +
    "            <circle id=\"c3b\" cx=\"40\" cy=\"90\" r=\"4\" fill=\"#080\"></circle>\n" +
    "            <circle id=\"c5\" class=\"control\" cx=\"90\" cy=\"30\" r=\"4\" fill=\"#f00\"></circle>\n" +
    "            <circle id=\"c6\" class=\"control\" cx=\"80\" cy=\"60\" r=\"4\" fill=\"#f00\"></circle>";
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

const recalculateCurve = function() {
    const x1 = parseInt(document.getElementById('c1').getAttribute('cx'), 10);
    const y1 = parseInt(document.getElementById('c1').getAttribute('cy'), 10);
    const x2 = parseInt(document.getElementById('c2').getAttribute('cx'), 10);
    const y2 = parseInt(document.getElementById('c2').getAttribute('cy'), 10);
    const x3 = parseInt(document.getElementById('c3').getAttribute('cx'), 10);
    const y3 = parseInt(document.getElementById('c3').getAttribute('cy'), 10);
    let curveString;
    if (!document.getElementById('c4')) {
        curveString = `M${x1},${y1}Q${x2} ${y2} ${x3} ${y3}`;
    } else {
        const x4 = parseInt(document.getElementById('c4').getAttribute('cx'), 10);
        const y4 = parseInt(document.getElementById('c4').getAttribute('cy'), 10);
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
        if (!document.getElementById('c5')) {
            curveString = `M${x1},${y1}C${x2} ${y2},${x3} ${y3},${x4} ${y4}`;
        } else {
            const x5 = parseInt(document.getElementById('c5').getAttribute('cx'), 10);
            const y5 = parseInt(document.getElementById('c5').getAttribute('cy'), 10);
            const x6 = parseInt(document.getElementById('c6').getAttribute('cx'), 10);
            const y6 = parseInt(document.getElementById('c6').getAttribute('cy'), 10);
            const x3b = x4 + x4 - x3;
            const y3b = y4 + y4 - y3;
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
            curveString = `M${x1},${y1}C${x2} ${y2},${x3} ${y3},${x4} ${y4}S${x5} ${y5},${x6} ${y6}`;
        }
    }
    const path = document.getElementById("p");
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