// This section came from loco github
const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function firstPageAnim() {
  var tl = gsap.timeline();
  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 2,
    ease: Expo.easeInOut,
  })

    .to(".boundingElem", {
      y: 0,
      ease: Expo.easeInOut,
      duration: 1.5,
      delay: -1,
      stagger: 0.2,
    })
    .from("#heroFooter", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });
}

var timeout

function circleFlat() {

  // Default scale value
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove", function (details) {
    // var xdiff = details.clientX-xprev;
    // var ydiff = details.clientY-yprev;

    clearTimeout(timeout)

    xscale = gsap.utils.clamp(0.8, 1.2, details.clientX - xprev)
    yscale = gsap.utils.clamp(0.8, 1.2, details.clientY - yprev)

    xprev = details.clientX;
    yprev = details.clientY;

    circleMouseFollower(xscale, yscale)

    timeout = setTimeout(function () {
      document.querySelector(
        "#miniCricle"
      ).style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(1,1)`;
    }, 100)

    // Clamp():- clamp is number between the given minimum and the maximum number.
    // If the number is less than the given minimum number then it returns the given minimum, if it is greatre than the maximum number then it return the given maximum

    // xscale = gsap.utils.clamp(0.8,1.2, details.clientX-xprev)
    // yscale = gsap.utils.clamp(0.8,1.2, details.clientY-yprev)

    // console.log(xscale,",",yscale)

  });
}

circleFlat()

function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (details) {
    document.querySelector(
      "#miniCricle"
    ).style.transform = `translate(${details.clientX}px, ${details.clientY}px) scale(${xscale}, ${yscale})`;
  });
}

circleMouseFollower();
firstPageAnim();

document.querySelectorAll('.elem').forEach(function (elem) {
  var rotate = 0
  var diffrot = 0

  elem.addEventListener("mouseleave", function(dets){    
    gsap.to(elem.querySelector("img"),{
      opacity: 0,
      ease: Power3
    });
  });

  // dets as deatils
  elem.addEventListener("mousemove", function(dets){
    // console.log(dets.clientY - elem.getBoundingClientRect().top
    var diff = dets.clientY - elem.getBoundingClientRect()
    // console.log(elem.getBoundingClientRect())
    // console.log(dets.clientY)
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    
    gsap.to(elem.querySelector("img"),{
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20,20, diffrot*0.8)
    });
  });
});