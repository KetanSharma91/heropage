window.addEventListener('load', function () {
  init();
});

function init() {
  let toolTimeline = new TimelineMax();
  let duration = 1.2; // Increased duration for smoother transitions
  
  toolTimeline.from('h1', duration, {
      opacity: 0,
      ease: Power2.easeOut // Smoother easing for a gentler animation
  }, 0.5); // Reduced delay for a faster start
  
  toolTimeline.staggerFrom('.boxes__box', duration, {
      opacity: 0,
      scale: 0.8, // Slightly reduced scale to minimize abruptness
      ease: Power3.easeInOut // Smoother easing
  }, 0.15, 0.3); // Reduced stagger delay for more fluidity
  
  toolTimeline.to('.boxes img', duration, {
      opacity: 1,
      right: 0,
      ease: Power2.easeOut // Smoother ease for a gentler animation
  }, 0.4);

  toolTimeline.staggerTo('li', duration, {
      top: 0,
      ease: Power2.easeOut // Consistent smooth ease
  }, 0.15, 0.7);
}

// Create instance of Kinet with custom settings for smoother animation
var kinet = new Kinet({
  acceleration: 0.04, // Reduced for smoother acceleration
  friction: 0.25, // Slightly reduced for more fluid friction
  names: ["x", "y"]
});

// Select circle element
var circle = document.getElementById('circle');

// Set handler on kinet tick event
kinet.on('tick', function(instances) {
  circle.style.transform = `translate3d(${instances.x.current}px, ${instances.y.current}px, 0) rotateX(${instances.x.velocity / 3}deg) rotateY(${instances.y.velocity / 3}deg)`;
});

// Call kinet animate method on mousemove
document.addEventListener('mousemove', function (event) {
  kinet.animate('x', event.clientX - window.innerWidth / 2);
  kinet.animate('y', event.clientY - window.innerHeight / 2);
});

// Optional: Log kinet events
kinet.on('start', function() {
  console.log('Animation start');
});

kinet.on('end', function() {
  console.log('Animation end');
});


const hoverImg = document.getElementById("hoverImg");
const boxImages = document.querySelectorAll(".boxes__box img");

boxImages.forEach(img => {
  img.addEventListener("mouseenter", (e) => {
    hoverImg.src = e.target.src; // Set hover image source to match hovered image
    hoverImg.style.opacity = "1"; // Make hover image visible
  });

  img.addEventListener("mousemove", (e) => {
    const cursorX = e.pageX;
    const cursorY = e.pageY;
    const screenWidth = window.innerWidth;
    const imgWidth = hoverImg.offsetWidth;
    const offset = 20;

    // Check if there's enough space on the left side
    if (cursorX + imgWidth + offset > screenWidth) {
      // Position image to the left of the cursor if space is limited on the right
      hoverImg.style.left = `${cursorX - imgWidth - offset}px`;
    } else {
      // Position image to the right of the cursor if there's enough space
      hoverImg.style.left = `${cursorX + offset}px`;
    }
    
    hoverImg.style.top = `${cursorY + offset}px`;
  });

  img.addEventListener("mouseleave", () => {
    hoverImg.style.opacity = "0"; // Hide hover image when not hovering
  });
});

window.addEventListener("scroll", () => {
  hoverImg.style.opacity = "0"; // Hide hover image on scroll
});
