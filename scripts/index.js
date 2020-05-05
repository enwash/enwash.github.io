let hovered = false;
let cursor = q.get('#cursor');
let cursor2 = q.get('#cursorfollow');

let hidden = false;

let cx = 0;
let cy = 0;

let lastx = 0;
let lasty = 0;

q.forAll('a',s=>{
  s.on('mouseover',e=>{hovered=e.target});
  s.on('mouseout',e=>{hovered=false});
});

q.forAll('iframe',s=>{
  s.on('mouseover',e=>{hidden=true;});
  s.on('mouseout',e=>{hidden=false});
});

function moveC2() {
  lastx += (cx - lastx) / 8;
  lasty += (cy - lasty) / 8;
  cursor2.style.left = lastx + 'px';
  cursor2.style.top = lasty + 'px';
}

window.addEventListener('mousemove',e=>{
  cx = e.clientX;
  cy = e.clientY;
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
  if (hovered!=false) {
    cursor.classList.add('action');
    cursor2.classList.add('action');
  }
  else {
    cursor.classList.remove('action');
    cursor2.classList.remove('action');
  }
  if (hidden) {
    cursor.classList.add('hidden');
    cursor2.classList.add('hidden');
  }
  else {
    cursor.classList.remove('hidden');
    cursor2.classList.remove('hidden');
  }
});

window.addEventListener('mousedown',e=>{
  cursor.classList.add('down');
})

window.addEventListener('mouseup',e=>{
  cursor.classList.remove('down');
})

window.addEventListener("mousedown", e=>{
  cursor2.classList.remove("canim");
  void cursor2.offsetWidth;
  cursor2.classList.add("canim");
});

setInterval(moveC2,15);
