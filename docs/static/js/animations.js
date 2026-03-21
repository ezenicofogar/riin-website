function gsapKillChildTweensOf(ancestor) {
  ancestor = gsap.utils.toArray(ancestor)[0];
  gsap.globalTimeline
    .getChildren(true, true, false)
    .forEach((tween) =>
      tween
        .targets()
        .forEach((e) => e.nodeType && ancestor.contains(e) && tween.kill(e)),
    );
}

function attachPreload(onFinish) {
  const toPreload = Array.from(
    document.getElementsByClassName("preload-script"),
  );
  let loadCount = toPreload.length;
  let loaded = 0;
  const checkAllLoaded = () => {
    if (loadCount === loaded) {
      for (const el of toPreload) {
        el.classList.remove("preload-script");
        console.log(`preload removed from ${el.src}`);
      }
      console.log("All preload completed");
      onFinish();
      // debug timer:
      // setTimeout(() => {
      //   onFinish();
      // }, 200);
    }
  };
  if (loadCount > 0) {
    for (const el of toPreload) {
      if (el.tagName === "IMG") {
        if (!el.complete) {
          el.addEventListener("load", () => {
            loaded++;
            console.log("Image loaded");
            checkAllLoaded();
          });
        } else {
          loaded++;
          console.log("Image already loaded");
        }
      } else {
        loadCount--;
        console.error("Only use preload-script on <img> elements");
      }
    }
  }
  checkAllLoaded();
}

function runAnimations() {
  // HIDE LOADING SCREEN
  const loadingScreen = document.getElementById("loading-screen");
  gsap.to(loadingScreen, {
    opacity: 0,
    ease: "power3.in",
    duration: 0.4,
    onComplete: () => {
      gsapKillChildTweensOf(loadingScreen);
      loadingScreen.remove();
    },
  });

  // RUN HERO BACKGROUND ANIMATION
  const logoFadeDelay = 1.2;
  const logoFadeDuration = 1.3;
  const logoShadowDiff = document.getElementById("hero-base-shadow-difference");
  const logoCutNormal = document.getElementById("hero-text-cut-normal");
  gsap.from(logoShadowDiff, {
    opacity: 0,
    filter: "blur(32px)",
    delay: logoFadeDelay,
    duration: logoFadeDuration,
    ease: "power1.in",
  });
  gsap.from(logoCutNormal, {
    y: "-100vh",
    delay: logoFadeDelay,
    duration: logoFadeDuration,
    ease: "power2.out",
  });

  const lightLineDuration = 0.9;
  const lights = document.getElementsByClassName("hero-light");
  for (let i = 0; i < lights.length; i++) {
    const light = lights[i];
    let tl = gsap.timeline({
      repeat: -1,
      // scrollTrigger: {
      //   trigger: "#hero",
      //   // markers: true,
      // },
    });
    tl.fromTo(
      light,
      {
        "--hero-light-grad1color": "white",
        "--hero-light-grad2color": "black",
        "--hero-light-grad1deg": "-10deg",
        "--hero-light-grad2deg": "10deg",
      },
      {
        "--hero-light-grad1color": "white",
        "--hero-light-grad2color": "black",
        "--hero-light-grad1deg": "-10deg",
        "--hero-light-grad2deg": "10deg",
        duration: Math.random() * (i + 1) + logoFadeDuration + logoFadeDelay,
      },
    );
    tl.fromTo(
      light,
      {
        "--hero-light-grad1color": "white",
        "--hero-light-grad2color": "black",
        "--hero-light-grad1deg": "-10deg",
        "--hero-light-grad2deg": "10deg",
      },
      {
        "--hero-light-grad1color": "white",
        "--hero-light-grad2color": "black",
        "--hero-light-grad1deg": "350deg",
        "--hero-light-grad2deg": "370deg",
        duration: lightLineDuration,
        ease: "linear",
      },
    );
    tl.fromTo(
      light,
      {
        "--hero-light-grad1color": "black",
        "--hero-light-grad2color": "white",
        "--hero-light-grad1deg": "-10deg",
        "--hero-light-grad2deg": "10deg",
      },
      {
        "--hero-light-grad1color": "black",
        "--hero-light-grad2color": "white",
        "--hero-light-grad1deg": "350deg",
        "--hero-light-grad2deg": "370deg",
        duration: lightLineDuration,
        delay: Math.random() * (lights.length - i) + 0.5,
        ease: "linear",
      },
    );
  }

  // SHOW TEXT
  const mainTextDelay = logoFadeDelay + logoFadeDuration + 1.9;
  const heroBackground = document.getElementById("hero-background");
  const heroTitleMain = document.getElementById("hero-main-title");
  const heroTitleOver = document.getElementById("hero-main-title-over");
  const heroMainParag = document.getElementById("hero-main-paragraph");
  const heroTitles = ["modernizacion", "optimizacion", "sistemas"];
  const scrambleDuration = 0.8;
  const scrambleSeparation = 3;
  gsap.fromTo(
    heroBackground,
    {
      filter: "brightness(100%)",
    },
    {
      filter: "brightness(85%)",
      duration: 2,
      ease: "power1.inOut",
      delay: mainTextDelay - 1,
    },
  );
  gsap.to(heroTitleMain, {
    scrambleText: {
      text: heroTitles[0],
    },
    ease: "linear",
    duration: 1.5 * scrambleDuration,
    delay: mainTextDelay,
    onComplete: () => {
      let mainTitleTl = gsap.timeline({ repeat: -1 });
      for (let i = 1; i <= heroTitles.length; i++) {
        const idx = i === heroTitles.length ? 0 : i;
        const element = heroTitles[idx];
        mainTitleTl.to(
          heroTitleMain,
          {
            scrambleText: {
              text: element,
            },
            ease: "linear",
            duration: scrambleDuration,
          },
          i * (scrambleDuration + scrambleSeparation) - scrambleDuration,
        );
      }
    },
  });
  gsap.from(heroTitleOver, {
    opacity: 0,
    x: -50,
    duration: scrambleDuration,
    delay: mainTextDelay - 0.2,
  });
  gsap.from(heroMainParag, {
    opacity: 0,
    x: -50,
    duration: scrambleDuration,
    delay: mainTextDelay + 0.9,
  });

  // mainTitleTl.fromTo("#hero-main-title", {}, {
  //   scrambleText: {
  //     text: "modernizacion",
  //   },
  //   ease: "linear",
  //   duration: 1,
  // }, 1)
}

document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrambleTextPlugin, ScrollTrigger);
  attachPreload(runAnimations);
});
