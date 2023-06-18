function remToPx(rem) {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}



let cursor = document.getElementById("cursor");
let cursorRadius = 1;
let cursorRadiusTarget = 1;
let baseSize = 2;
let hoverSize = 0.5;


//motion blur iterations
// let mbI = 32;
// let blur = [];


window.onload = (e) => {

    for (const element of document.querySelectorAll("a, input, .imageBlock, textarea")) {
        element.addEventListener("mouseenter", (e) => { dotSize(hoverSize) });
        element.addEventListener("mouseleave", (e) => { dotSize(baseSize) });
    }    
    for (const element of document.querySelectorAll(".artBlock")) {
        element.addEventListener("mouseenter", (e) => { dotSize(baseSize*2) });
        element.addEventListener("mouseleave", (e) => { dotSize(baseSize) });
    }    
    dotSize(baseSize);

    // for (let i = 0; i < mbI; i++)
    // {
    //     const clone = cursor.cloneNode();
    //     clone.id = `blur${i}`
    //     document.body.appendChild(clone);
    //     blur[i] = document.getElementById(`blur${i}`);
    // }




};

let lX = 0;
let lY = 0;
let mouseX = 0;
let mouseY = 0;
let sX = 0;
let sY = 0;
let mouseSmooth = 0.3;
// let lN = false;
const cursorPos = (e)=> {
    lX = sX;
    lY = sY;
    mouseY = e.clientY;
    mouseX = e.clientX;
    lN = true;
}
window.addEventListener('mousemove', cursorPos)

window.addEventListener("mouseenter", (e) => { dotSize(baseSize) });
window.addEventListener("mouseout", (e) => { dotSize(baseSize*5) });



let u;
function update() {
    // updates at default monitor refresh rate


    let radiusSpeed = 0.1;
    cursorRadius = cursorRadius * (1-radiusSpeed) + cursorRadiusTarget * radiusSpeed;

    sY = sY == 0?mouseY:mouseY * mouseSmooth + (1-mouseSmooth) * sY;
    sX = sX == 0?mouseX:mouseX * mouseSmooth + (1-mouseSmooth) * sX;



    let tX = sX + document.body.scrollLeft - remToPx(cursorRadius/2);
    let tY = sY + document.body.scrollTop - remToPx(cursorRadius/2);


    // if (!lN){
    //     lX = sX;
    //     lY = sY;
    // }
    // lN = false;
    // let alX = lX + document.body.scrollLeft - remToPx(cursorRadius/2);
    // let alY = lY + document.body.scrollTop - remToPx(cursorRadius/2);

    cursor.style.transform = `translate3d(${tX}px, ${tY}px, 0px)`;

    
    // for (let i = 0; i < mbI; i++ )
    // {
    //     let l = (i / mbI);
    //     if (blur[i]) blur[i].style.transform = `translate3d(${tX * l + (1-l) * alX}px, ${tY * l + (1-l) * alY}px, 0px)`;
    // }


    // //   CSS Mode
    // for (let i= 0; i<mbI; i++){
    //     if (blur[i]) blur[i].style.transform = `translate3d(${tX}px, ${tY}px, 0px)`;
    // }


    u = requestAnimationFrame(update);
}

u = requestAnimationFrame(update);

function dotSize(s) {
    //console.log("dot ", s);
    cursorRadiusTarget = s;
    cursor.style.width = `${s}rem`;
    cursor.style.height = `${s}rem`;

    cursor.style.background = `rgba(255,255,255,${0.5/(s*s)})`;
    cursor.style.backdropFilter = `blur(${0.3/(Math.sqrt(s))}rem)`;
}


function opW(url){
    window.open(url);
}