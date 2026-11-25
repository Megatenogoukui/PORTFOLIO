// LocomotiveScroll
function locomotive() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined" || typeof LocomotiveScroll === "undefined") {
    return;
  }

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

  if (document.documentElement.classList.contains("has-scroll-smooth")) {
    function scrollToHash(hash, immediate = false) {
      const target = hash.length > 1 ? document.getElementById(hash.slice(1)) : 0;
      if (target === null) return;
      locoScroll.scrollTo(target, 0, immediate ? 0 : 550);
    }

    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const hash = link.getAttribute("href");
        event.preventDefault();
        if (window.location.hash !== hash) history.pushState(null, "", hash);
        scrollToHash(hash);
      });
    });
    window.addEventListener("popstate", () => scrollToHash(window.location.hash));
    window.addEventListener("load", () => {
      locoScroll.update();
      if (window.location.hash) scrollToHash(window.location.hash, true);
    }, { once: true });
  }
}

function cardHoverEffect() {
  const work = document.querySelector("#work");
  const previews = document.querySelector("#cursor").children;

  document.querySelectorAll(".cont").forEach((card) => {
    const image = card.querySelector("a img");
    const preview = previews[image.dataset.index];
    if (!preview) return;

    card.addEventListener("pointermove", (event) => {
      if (event.pointerType !== "mouse") return;
      const x = Math.min(event.clientX + 18, window.innerWidth - preview.offsetWidth - 8);
      const y = Math.min(event.clientY + 18, window.innerHeight - preview.offsetWidth - 30);
      preview.style.transform = `translate(${Math.max(0, x)}px, ${Math.max(0, y)}px)`;
      preview.classList.add("is-visible");
      image.style.filter = "grayscale(1)";
      work.style.backgroundColor = image.dataset.color;
    });

    card.addEventListener("pointerleave", () => {
      preview.classList.remove("is-visible");
      image.style.filter = "";
      work.style.backgroundColor = "";
    });
  });
}

function revealTOSpan() {
  document.querySelectorAll(".reveal").forEach(function (elem) {
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
  });
}

function loaderAnimation() {
  const loader = document.querySelector("#loader");
  const green = document.querySelector("#green");
  loader.hidden = false;
  green.hidden = false;

  const tl = gsap.timeline({
    onComplete: () => {
      loader.hidden = true;
      green.hidden = true;
    },
  });

  tl.from("#loader .child span", {
    x: 100,
    duration: 1,
    delay: 0,
    stagger: 0.2,
    ease: Power3.easeInOut,
  })

    .to("#loader .parent .child", {
      y: -100,
      duration: 1,
      delay: 1,
      ease: Circ.easeInOut,
    })

    .to("#loader", {
      height: 0,
      duration: 1,
      ease: Circ.easeInOut,
    })

    .to("#green", {
      height: "100%",
      top: 0,
      duration: 1,
      delay: -1,
      ease: Circ.easeInOut,
    })
    .to("#green", {
      height: 0,
      duration: 1,
      delay: -0.5,
      ease: Circ.easeInOut,
    });
}

function circleChipku() {
  const mouse = document.querySelector(".mouse");
  const move = gsap.quickSetter(mouse, "transform");

  window.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse") return;
    mouse.hidden = false;
    move(`translate(${event.clientX}px, ${event.clientY}px)`);
  });
}

function imageMove() {
  document.querySelectorAll(".skill").forEach((element) => {
    var rotate = 0;
    var diffRot = 0;
    element.addEventListener("mouseleave", (dets) => {
      gsap.to(element.querySelector("img"), {
        opacity: 0,

        ease: Power1,
      });
    });
    element.addEventListener("mousemove", (dets) => {
      const bounds = element.getBoundingClientRect();
      const diff = dets.clientY - bounds.top;

      diffRot = dets.clientX - rotate;
      rotate = dets.clientX;

      gsap.to(element.querySelector("img"), {
        opacity: 1,
        top: diff,
        left: dets.clientX - bounds.left,
        ease: Power1,
        rotate: gsap.utils.clamp(-20, 20, diffRot),
      });
    });
  });
}

function pageAnimate() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    return;
  }

  const scroller = document.documentElement.classList.contains("has-scroll-smooth") ? ".main" : window;
  const heroShift = window.matchMedia("(max-width: 477px)").matches ? 24 : 110;

  var page1 = gsap.timeline({
    scrollTrigger: {
      trigger: ".page1 h1", // Corrected selector
      scroller,
      start: "top 25%",
      end: "top 0",
      scrub: 2,
    },
  });

  page1.to(
    ".page1 h1",
    {
      x: -heroShift,
    },
    "animate"
  );
  page1.to(
    ".page1 h2",
    {
      x: heroShift,
    },
    "animate"
  );

  var page2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".page1 h2", // Corrected selector
      scroller,
      start: "top 25%",
      end: "top 0",
      scrub: 3,
    },
  });
  page2.to(".main", {
    backgroundColor: "#FCFAF8",
  });

  var img = gsap.timeline({
    scrollTrigger: {
      trigger: ".page2-right img", // Corrected selector
      scroller,
      start: "top 75%",
      end: "top 0%",
      scrub: 5,
    },
  });
  img.to(".page2-right img", {
    rotation: 6,
  });

  var page4 = gsap.timeline({
    scrollTrigger: {
      trigger: ".page4", // Corrected selector
      scroller,
      start: "top 75%",
      end: "top 0%",
      scrub: 5,
    },
  });
  page4.to(".main", {
    backgroundColor: "#0F0D0D",
  });
  var page5 = gsap.timeline({
    scrollTrigger: {
      trigger: ".page5", // Corrected selector
      scroller,
      start: "top 75%",
      end: "top 0%",
      scrub: 5,
    },
  });
  page5.to(".main", {
    backgroundColor: "#0F0D0D",
  });
  var page6 = gsap.timeline({
    scrollTrigger: {
      trigger: ".page6", // Corrected selector
      scroller,
      start: "top 75%",
      end: "top 0%",
      scrub: 5,
    },
  });
  page6.to(".main", {
    backgroundColor: "#FCFAF8",
  });
}

function movingFooter() {
  const linkElements = document.querySelectorAll(".footer a");
  if (!linkElements || !linkElements.length) return;

  linkElements.forEach((link, index) => {
    gsap.fromTo(
      link,
      {
        y: 0,
      },
      {
        y: 7,
        duration: 1,
        repeat: 1,
        delay: index, // Add a delay based on index to stagger animations
        yoyo: true,
        ease: "power1.inOut",
      }
    );
  });
}

const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
if (motion.matches) {
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    cardHoverEffect();
  }
  if (typeof gsap !== "undefined") {
    revealTOSpan();
    loaderAnimation();
    locomotive();
    pageAnimate();
    if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      circleChipku();
      imageMove();
    }
    movingFooter();
  }
}
