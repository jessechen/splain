const inputEl = document.getElementById('unoptimized-markup');
inputEl.addEventListener('keyup', (e) => {
    const inputEl = document.getElementById('unoptimized-markup');
    const outputEl = document.getElementById('optimized-markup');
    outputEl.innerText = inputEl.value;

    const inputRenderEl = document.getElementById('unoptimized-image');
    inputRenderEl.innerHTML = inputEl.value;
    const outputRenderEl = document.getElementById('optimized-image');
    outputRenderEl.innerHTML = outputEl.value;
});

document.addEventListener('DOMContentLoaded', () => {
    const svg = "\n" +
        "<?xml version=\"1.0\" ?><svg viewBox=\"0 0 32 32\" xmlns=\"http://www.w3.org/2000/svg\"><defs><style>.cls-1{fill:none;stroke:#000;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}</style></defs><title/><g id=\"logout\"><line class=\"cls-1\" x1=\"15.92\" x2=\"28.92\" y1=\"16\" y2=\"16\"/><path d=\"M23.93,25v3h-16V4h16V7h2V3a1,1,0,0,0-1-1h-18a1,1,0,0,0-1,1V29a1,1,0,0,0,1,1h18a1,1,0,0,0,1-1V25Z\"/><line class=\"cls-1\" x1=\"28.92\" x2=\"24.92\" y1=\"16\" y2=\"20\"/><line class=\"cls-1\" x1=\"28.92\" x2=\"24.92\" y1=\"16\" y2=\"12\"/><line class=\"cls-1\" x1=\"24.92\" x2=\"24.92\" y1=\"8.09\" y2=\"6.09\"/><line class=\"cls-1\" x1=\"24.92\" x2=\"24.92\" y1=\"26\" y2=\"24\"/></g></svg>";
    inputEl.innerText = svg;
});
