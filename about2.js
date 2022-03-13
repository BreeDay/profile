// import Sketch from './modulees.mjs';

// let sketch = new Sketch({
//     dom: document.getElementById("container")
// })
let speed = 0;
let position = 0;
let rounded = 0;
let wrap = document.getElementById('wrap');
let block = document.getElementById('block');
let elems = [...document.querySelectorAll('.n')];
window.addEventListener('wheel', (e)=>{
    speed += e.deltaY * 0.0002;
})

let objs = Array(6).fill({dist:0})

function raf(){
    position += speed;
    speed *=0.8;
    objs.forEach((o,i)=>{
        o.dist = Math.min(Math.abs(position - i), 1);
        o.dist = 1 - o.dist**2;
        elems[i].style.transform = `scale(${1+ 0.4*o.dist})`
    })
    rounded = Math.round(position);
    let diff = (rounded - position);


    position += Math.sign(diff)*Math.pow(Math.abs(diff), 0.7)*0.015; 
    // block.style.transform = `translate(0, ${position*100}px)`
    wrap.style.transform = `translate(0, ${-position*100}px)`
    window.requestAnimationFrame(raf)
}

raf();