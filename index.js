// LocomotiveScroll
function locomotive() {
    gsap.registerPlugin(ScrollTrigger);
  
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector(".main"),
      smooth: true,
    });
  
    locoScroll.on("scroll", ScrollTrigger.update);
  
    ScrollTrigger.scrollerProxy(".main", {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, 0, 0)
          : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.querySelector(".main").style.transform
        ? "transform"
        : "fixed",
    });
  
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
  }


function cardHoverEffect() {
    var showImage;
    document.querySelectorAll(".cont")
        .forEach(function (cont) {
            cont.addEventListener("mousemove", function (dets) {
                showImage = dets.target;
                document.querySelector("#cursor").children[dets.target.dataset.index].style.opacity = 1;
                document.querySelector("#cursor").children[dets.target.dataset.index].style.transform = `translate(${dets.clientX}px ,${dets.clientY + 1900}px)`;
                showImage.style.filter = "grayscale(1)";
                document.querySelector("#work").style.backgroundColor = dets.target.dataset.color;
            })
            cont.addEventListener("mouseleave", function (dets) {
                document.querySelector("#cursor").children[showImage.dataset.index].style.opacity = 0;
                showImage.style.filter = "grayscale(0)";
                document.querySelector("#work").style.backgroundColor = "#F2F2F2";
            })
        })
}
function valueSetter() {
    
    gsap.set("#home .parent .child", { y: "100%" });
    
}
function revealTOSpan() {
    document.querySelectorAll(".reveal")
        .forEach(function (elem) {

            // Create two spans
            var parent = document.createElement("span");
            var child = document.createElement("span");

            // Added them a seperate class
            parent.classList.add("parent");
            child.classList.add("child");

            // Added the text content of reveal to text content of child
            child.innerHTML = elem.innerHTML;

            // Appended the child to parent
            parent.appendChild(child);

            // Cleared the stuff what was in reveal class
            elem.innerHTML = "";

            // Added new stuff to reveal class
            elem.appendChild(parent);

        })
}
function loaderAnimation() {
    var tl = gsap.timeline();

    tl
        .from("#loader .child span", {
            x: 100,
            duration: 1,
            delay: 0,
            stagger: .2,
            ease: Power3.easeInOut

        })

        .to("#loader .parent .child", {
            y: -100,
            duration: 1,
            delay: 1,
            ease: Circ.easeInOut

        })

        .to("#loader", {
            height: 0,
            duration: 1,
            ease: Circ.easeInOut
        })

        .to("#green", {
            height: "100%",
            top: 0,
            duration: 1,
            delay: -1,
            ease: Circ.easeInOut
        })
        .to("#green", {
            height: 0,
            duration: 1,
            delay: -0.5,
            ease: Circ.easeInOut,
            onComplete: function () {
                Home();
            }
        })

}
setTimeout(function Home(){
  document.querySelector(".page1").style.opacity = 1;
},2);



function circleChipku(){


  var xScale = 1;
  var yScale = 1;

  var xPrev = 0;
  var yPrev = 0;

  window.addEventListener("mousemove" , (dets) => {
    const xDiff = dets.clientX - xPrev;
    const yDiff = dets.clientY - yPrev;

    var xScale = gsap.utils.clamp(0.8, 1.2 , xDiff);
    var yScale = gsap.utils.clamp(0.8, 1.2 , yDiff);


    xPrev = xDiff;
    yPrev = yDiff;
    mouseCircle(xScale , yScale)
  })

}

function mouseCircle(x,y){
  var mouse = document.querySelector(".mouse")
  var main = document.querySelector(".main")

main.addEventListener("mousemove" ,function(dets){
    mouse.style.transform = `translate(${dets.clientX}px , ${dets.clientY}px) scale(${x}, ${y})`
   
    
})
}

function imageMove(){
document.querySelectorAll(".skill").forEach((element)=>{
  var rotate = 0;
   var diffRot = 0;
   element.addEventListener("mouseleave" , (dets) => {
   
    gsap.to(element.querySelector("img"), {
      opacity : 0,
     
      ease : Power1,
      
    })
  })
  element.addEventListener("mousemove" , (dets) => {
    const diff = dets.clientY - element.getBoundingClientRect().top;
    
    var diffRot = dets.clientX - rotate;
    rotate = dets.clientX

    gsap.to(element.querySelector("img"), {
      opacity : 1,
      top:diff,
      left:dets.clientX,
      ease : Power1,
      rotate : gsap.utils.clamp(-20 ,20 ,diffRot)
    })
  })
})



}







circleChipku()
// revealTOSpan();
// valueSetter();
// loaderAnimation();
locomotive();
cardHoverEffect() ;
imageMove();



  var page1 = gsap.timeline( {
    scrollTrigger: {
        trigger: ".page1 h1",  // Corrected selector
        scroller: ".main",
        start: "top 25%",
        end: "top 0",
        scrub: 2,
     
      },
  })
  
  
  page1.to(".page1 h1", {
    x: -110,
    
  } ,"animate");
  page1.to(".page1 h2" ,{
    x : 110
  },"animate")
  
  
  var page2 = gsap.timeline( {
    scrollTrigger: {
        trigger: ".page1 h2",  // Corrected selector
        scroller: ".main",
        start: "top 25%",
        end: "top 0",
        scrub: 3,
     
      },
  })
  page2.to(".main" , {
    backgroundColor:"#fff"
  })

  var img = gsap.timeline({
    scrollTrigger: {
        trigger: ".page2-right img",  // Corrected selector
        scroller: ".main",
        start: "top 75%",
        end: "top 0%",
        scrub: 5,
     
      },
  })
  img.to(".page2-right img" ,{
    rotate: "6%"
  })
  
 var page4 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page4",  // Corrected selector
        scroller: ".main",
        start: "top 75%",
        end: "top 0%",
        scrub: 5,
     
      },
 })
 page4.to(".main" , {
    backgroundColor:"#0F0D0D"
 })
 