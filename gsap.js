

function isDesktopView() {
  return window.innerWidth >= 300; // Modify 992 to set the breakpoint at which you want the animation to apply.
}

gsap.registerPlugin(ScrollTrigger)

let navbarScrollTrigger;

function initNavbarScrollAnimation() {
  if (isDesktopView() && !navbarScrollTrigger) {
    const navbarShowAnim = gsap.from('.navbar', { // Ensure your Navbar has the .navbar class, or update the class
      yPercent: -100,
      paused: true,
      duration: 0.2
    }).progress(1);

    navbarScrollTrigger = ScrollTrigger.create({
      start: "top top",
      end: 99999,
      onUpdate: (self) => {
        self.direction === -1 ? navbarShowAnim.play() : navbarShowAnim.reverse();
      }
    });
  }
}


function destroyNavbarScrollAnimation() {
  if (navbarScrollTrigger) {
    navbarScrollTrigger.kill();
    navbarScrollTrigger = null;
  }
}

// Handle window resize
window.addEventListener('resize', () => {
  if (!isDesktopView()) {
    destroyNavbarScrollAnimation();
  } else {
    initNavbarScrollAnimation();
  }
});

initNavbarScrollAnimation();

document.addEventListener('DOMContentLoaded', () => {
  // Register the ScrollTrigger plugin with GSAP
  gsap.registerPlugin(ScrollTrigger);

  // Set default options for ScrollTrigger
  ScrollTrigger.defaults({
    markers: false
  });

  // Sticky Circle grow to full viewport size
  document.querySelectorAll('.sticky-wrapper').forEach((triggerElement) => {
    let targetElement = triggerElement.querySelector('.sticky-content');

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1
      }
    });

    tl.fromTo(
      targetElement,
      {
        width: '40vw',
        height: '26vw',
        borderRadius: '0vw',
        duration: 1
      },
      {
        width: '100vw',
        height: '100vh',
        borderRadius: '0vw',
        duration: 1
      }
    );
  });

  // Sticky button
  document.querySelectorAll('.sticky-btn_wrapper').forEach((triggerElement) => {
    let targetElement = triggerElement.querySelector('.sticky-btn_content');

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: 'top -25%',
        end: 'bottom bottom',
        scrub: 1
      }
    });

    tl.from(targetElement, {
      y: '100%',
      duration: 1
    });
  });
});

gsap.registerPlugin(CustomEase);

CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");

gsap.defaults({
  ease: "main",
  duration: 0.7
})

function initMenu(){
  let navWrap = document.querySelector(".nav")
  let state = navWrap.getAttribute("data-nav")
  let overlay = navWrap.querySelector(".overlay")
  let menu = navWrap.querySelector(".menu")
  let bgPanels = navWrap.querySelectorAll(".bg-panel")
  let menuToggles = document.querySelectorAll("[data-menu-toggle]")
  let menuLinks = navWrap.querySelectorAll(".menu-link")
  let fadeTargets = navWrap.querySelectorAll("[data-menu-fade]")
  let menuButton = document.querySelector(".menu-button")
  let menuText = menuButton.querySelector(".text-menu") // Text "Menu"
  let closeText = menuButton.querySelector(".text-close") // Text "Close"
  let menuButtonIcon = menuButton.querySelector(".menu-button-icon")

  let tl = gsap.timeline()

  const openNav = () =>{
    navWrap.setAttribute("data-nav", "open")

    tl.clear()
    .set(navWrap,{display:"block"})
    .set(menu,{xPercent:0},"<")
    // Animate Menu text up and Close text into view
    .to(menuText, {yPercent: -100}, "<")
    .to(closeText, {yPercent: -100}, "<")
    .fromTo(menuButtonIcon,{rotate:0},{rotate:315},"<")
    .fromTo(overlay,{autoAlpha:0},{autoAlpha:1},"<")
    .fromTo(bgPanels,{xPercent:101},{xPercent:0,stagger:0.12,duration: 0.575},"<")
    .fromTo(menuLinks,{yPercent:140,rotate:10},{yPercent:0, rotate:0,stagger:0.05},"<+=0.35")
    .fromTo(fadeTargets,{autoAlpha:0,yPercent:50},{autoAlpha:1, yPercent:0,stagger:0.04},"<+=0.2")
  }

  const closeNav = () =>{
    navWrap.setAttribute("data-nav", "closed")

    tl.clear()
    .to(overlay,{autoAlpha:0})
    .to(menu,{xPercent:120},"<")
    // Animate Close text down and Menu text into view
    .to(closeText, {yPercent: 100})
    .to(menuText, {yPercent: 0}, "<")
    .to(menuButtonIcon,{rotate:0},"<")
    .set(navWrap,{display:"none"})
  }

  // Toggle menu open / close depending on its current state
  menuToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      state = navWrap.getAttribute("data-nav");
      if (state === "open") {
        closeNav();
      } else {
        openNav();
      }
    });
  });

  // Menu links click handler
  menuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      closeNav();

      setTimeout(() => {
        if(targetSection) {
          targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });
        }
      }, 700);
    });
  });

  // Escape key handler
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navWrap.getAttribute("data-nav") === "open") {
      closeNav();
    }
  });
}

document.addEventListener("DOMContentLoaded",()=>{
  initMenu()
})
