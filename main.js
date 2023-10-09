const container = document.querySelector(".container");
const sections = gsap.utils.toArray(".container section");
const texts = gsap.utils.toArray(".anim");
const mask = document.querySelector(".mask");
const nextContent = document.querySelector(".next_container");
let mm = gsap.matchMedia();

mm.add("(min-width:1023px)", () => {
  let scrollTween = gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: ".container",
      pin: true,
      scrub: 1,
      end: "+=2000",
    },
  });

  gsap.to(mask, {
    width: "100%",
    scrollTrigger: {
      trigger: ".wrapper",
      start: "top left",
      scrub: 1,
    },
  });

  sections.forEach((section) => {
    let text = section.querySelectorAll(".anim");

    gsap.from(text, {
      y: -130,
      opacity: 0,
      duration: 2,
      ease: "elastic",
      stagger: 0.1,
      scrollTrigger: {
        trigger: section,
        containerAnimation: scrollTween,
        start: "left center",
      },
    });
  });

  gsap.fromTo(
    nextContent,
    {
      scaleX: 0,
    },
    {
      scaleX: 1,
      backgroundColor: "skyblue",
      duration: 0.5,
      scrollTrigger: {
        trigger: nextContent,
        start: "top 80%",
        end: "top center",
        scrub: false,
        toggleActions: "play play reverse reverse",
      },
    }
  );
});

// Lenis Setup
const lenis = new Lenis();

lenis.on("scroll", (e) => {
  //   console.log(e);
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
