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
    const svg = "<svg viewBox=\"0 0 20 20\"><path d=\"M10,5h-5v5h5z\" stroke=\"#00f\" fill=\"none\"/><path d=\"M10,10Q20 10 15 15\" stroke=\"#0a0\" fill=\"transparent\"/>\n" +
        "<circle cx=\"10\" cy=\"10\" r=\"1\" fill=\"red\"/>\n" +
        "<circle id=\"a\" cx=\"20\" cy=\"10\" r=\"1\" fill=\"red\"/>\n" +
        "<circle cx=\"15\" cy=\"15\" r=\"1\" fill=\"red\"/>\n" +
        "</svg>";
    inputEl.innerText = svg;
});
