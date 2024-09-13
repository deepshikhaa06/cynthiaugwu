const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});



function firstpageAnim() {
    var t1 = gsap.timeline();
    t1.from("#nav", {
        y: '-10',
        duration: 1.5,
        opacity: 0,
        ease: Expo.easeInOut
    })
        .to(".boundingelem", {
            y: '0',
            duration: 2,
            ease: Expo.easeInOut,
            delay: -1,
            stagger: .2
        })
        .from("#openfooter", {
            y: -10,
            duration: 1.5,
            opacity: 0,
            ease: Expo.easeInOut,
            delay: -1
        })
}
circleMouseFollower();
firstpageAnim();
var timeout;
function smallcircle() {
    var xscale = 1;
    var yscale = 1;
    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function (dets) {
        clearTimeout(timeout);
        var xdiff = dets.clientX - xprev;
        var ydiff = dets.clientY - yprev;
        xprev = dets.clientX;
        yprev = dets.clientY;
        // console.log(xdiff,ydiff);
        // console.log(gsap.utils.clamp(.8,1.2,xdiff),gsap.utils.clamp(.8,1.2,ydiff))
        xscale = gsap.utils.clamp(.8, 1.2, xdiff);
        yscale = gsap.utils.clamp(.8, 1.2, ydiff);

        circleMouseFollower(xscale, yscale);

        timeout=this.setTimeout(function(){
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;

        },100);
    });
}
function circleMouseFollower(xscale, yscale) {
    window.addEventListener("mousemove", function (dets) {
        // console.log(dets);
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;
    })
}
smallcircle();
document.querySelectorAll(".elem").forEach(function(elem){
    var rotate = 0;
    var diffrot = 0;
    elem.addEventListener("mouseleave", function (dets) {
         //console.log(dets);
        gsap.to(elem.querySelector("img"), {
          opacity: 0,
          ease: Power3,
          duration: 0.5,
        });
      });

    elem.addEventListener('mousemove',function(dets){
        // console.log(dets);
        var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot = dets.clientX - rotate;
    rotate = dets.clientX;
    // var img;
    // const ww = document.getElementById('ww');
    //     gsap.to(ww,{
            gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
        });
    });
});