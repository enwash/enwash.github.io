const bg = document.querySelector('.cont');
const windowWidth = window.innerWidth / 5;
const windowHeight = window.innerHeight / 5 ;

bg.addEventListener('mousemove', (e) => {
  const mouseX = e.clientX / windowWidth;
  const mouseY = e.clientY / windowHeight;
  
  bg.style.transform = `translate3d(-${mouseX}%, -${mouseY}%, 0)`;
});