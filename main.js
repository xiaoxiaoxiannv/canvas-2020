let canvas = document.getElementById('canvas');
let ctx = canvas.getContext("2d");
let lineWidth = 5;

autoSetCanvasSize(canvas);
listenToUser(canvas);

let eraserEnabled = false;
pen.onclick = function () {
    eraserEnabled = false;
    pen.classList.add('active');
    eraser.classList.remove('active')
};
eraser.onclick = function () {
    eraserEnabled = true;
    eraser.classList.add('active');
    pen.classList.remove('active')
};
clear.onclick = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};
download.onclick = function () {
    let url = canvas.toDataURL("image/png");
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = '我的画儿';
    a.target = '_blank';
    a.click()
};


red.onclick = function () {
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'red';
    red.classList.add('active');
    green.classList.remove('active');
    blue.classList.remove('active')
};
green.onclick = function () {
    ctx.fillStyle = 'green';
    ctx.strokeStyle = 'green';
    red.classList.remove('active');
    green.classList.add('active');
    blue.classList.remove('active')
};
blue.onclick = function () {
    ctx.fillStyle = 'blue';
    ctx.strokeStyle = 'blue';
    red.classList.remove('active');
    green.classList.remove('active');
    blue.classList.add('active')
};

thin.onclick = function () {
    lineWidth = 5;
    ctx.lineCap = "round";
};
thick.onclick = function () {
    lineWidth = 10;
    ctx.lineCap = "round";
};


function autoSetCanvasSize(canvas) {
    setCanvasSize();

    window.onresize = function () {
        setCanvasSize()
    };

    function setCanvasSize() {
        let pageWidth = document.documentElement.clientWidth;
        let pageHeight = document.documentElement.clientHeight;

        canvas.width = pageWidth;
        canvas.height = pageHeight
    }
}

function drawCircle(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill()
}

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath()
}

function listenToUser(canvas) {
    let using = false;
    let lastPoint = {
        x: undefined,
        y: undefined
    };
    if (document.body.ontouchstart !== undefined) {
        canvas.ontouchstart = function (aaa) {
            let x = aaa.touches[0].clientX;
            let y = aaa.touches[0].clientY;
            console.log(x, y);
            using = true;
            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    "x": x,
                    "y": y
                }
            }
        };
        canvas.ontouchmove = function (aaa) {
            let x = aaa.touches[0].clientX;
            let y = aaa.touches[0].clientY;

            if (!using) {
                return
            }

            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                let newPoint = {
                    "x": x,
                    "y": y
                };
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        };
        canvas.ontouchend = function () {
            using = false
        }
    } else {
        canvas.onmousedown = function (aaa) {
            let x = aaa.clientX;
            let y = aaa.clientY;
            using = true;
            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    "x": x,
                    "y": y
                }
            }
        };
        canvas.onmousemove = function (aaa) {
            let x = aaa.clientX;
            let y = aaa.clientY;

            if (!using) {
                return
            }

            if (eraserEnabled) {
                ctx.clearRect(x - 5, y - 5, 10, 10)
            } else {
                let newPoint = {
                    "x": x,
                    "y": y
                };
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }

        };
        canvas.onmouseup = function (aaa) {
            using = false
        }
    }
}