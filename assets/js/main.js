/* PARTICLE ANIMATION - DUST STORM */
function initParticles() {
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 400, // Even more particles for dense dust
          density: {
            enable: true,
            value_area: 1000,
          },
        },
        color: {
          value: ["#bd892f", "#eac931", "#d0a32a", "#f4ca44", "#ffd700"],
        },
        shape: {
          type: "edge", // Edge creates more irregular shapes
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: [3, 5, 7], // More irregular shapes
          },
        },
        opacity: {
          value: 0.3, // Very subtle for depth
          random: true,
          anim: {
            enable: true,
            speed: 0.8,
            opacity_min: 0.05, // Very faint minimum
            sync: false,
          },
        },
        size: {
          value: 2,
          random: true,
          anim: {
            enable: true,
            speed: 3,
            size_min: 0.5,
            sync: false,
          },
        },
        line_linked: {
          enable: false,
        },
        move: {
          enable: true,
          speed: 1, // lower speed for dust drift
          direction: "bottom-right", // Diagonal movement
          random: true,
          straight: false,
          out_mode: "out",
          bounce: true,
          attract: {
            enable: true, // Enable attraction for swirling
            rotateX: 800,
            rotateY: 1600,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 200,
            line_linked: {
              opacity: 0.3,
            },
          },
          bubble: {
            distance: 200,
            size: 4,
            duration: 1,
            opacity: 0.6,
            speed: 2,
          },
          repulse: {
            distance: 150,
            duration: 0.5,
          },
          push: {
            particles_nb: 6,
          },
          remove: {
            particles_nb: 3,
          },
        },
      },
      retina_detect: true,
    });
  }
}

/* CUSTOM CURSOR */
$(document).ready(function () {
  // Initialize cursor
  const cursorDot = document.querySelector("[data-cursor-dot]");
  const cursorOutline = document.querySelector("[data-cursor-outline]");

  if (cursorDot && cursorOutline) {
    window.addEventListener("mousemove", function (e) {
      const posX = e.clientX;
      const posY = e.clientY;

      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;

      cursorOutline.animate(
        {
          left: `${posX}px`,
          top: `${posY}px`,
        },
        { duration: 300, fill: "forwards" }
      );
    });

    // Add hover effects
    const interactiveElements = document.querySelectorAll(
      "a, button, .menu-trigger-button"
    );
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", function () {
        cursorOutline.classList.add("grow");
      });
      element.addEventListener("mouseleave", function () {
        cursorOutline.classList.remove("grow");
      });
    });
  }

  // Check if we're on homepage (has intro animation) or case study page
  if ($("#intro-animation").length > 0) {
    console.log("Homepage detected - starting intro animation");
    setTimeout(initIntroAnimation, 100);
  } else if ($(".case-study-slider").length > 0) {
    console.log("Case study page detected - showing content immediately");
    initCaseStudyPage();
  } else {
    console.log("Other page detected - showing content immediately");
    showContentImmediately();
  }

  // Initialize particles after page type detection
  setTimeout(initParticles, 500); // Small delay to ensure DOM is ready
});

/* SCROLL TO TOP FUNCTIONALITY */
function initScrollToTop() {
  const scrollButton = document.getElementById("scrollToTop");

  if (!scrollButton) return;

  // Show/hide button based on scroll position
  function toggleScrollButton() {
    if (window.pageYOffset > 300) {
      scrollButton.classList.add("visible");
    } else {
      scrollButton.classList.remove("visible");
    }
  }

  // Scroll to top function
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Event listeners
  window.addEventListener("scroll", toggleScrollButton);
  scrollButton.addEventListener("click", scrollToTop);

  // Initialize button state
  toggleScrollButton();
}

/* INTRO ANIMATION - Only for homepage */
function initIntroAnimation() {
  console.log("Starting intro animation with dust particles");

  // Reset all states
  gsap.set("main, header, footer", { opacity: 0, visibility: "hidden" });
  gsap.set("#intro-animation", { opacity: 1, visibility: "visible" });
  gsap.set("#intro-animation img", { opacity: 0 });
  gsap.set("#particles-js", { opacity: 0 });

  // Initialize particles immediately but hidden
  initParticles();
  document.body.classList.add("intro-active");

  // Create main intro timeline
  const introTL = gsap.timeline({
    onComplete: function () {
      console.log("Intro animation complete");
      document.body.classList.add("intro-complete");
      document.body.classList.remove("intro-active");

      // Reduce particle opacity for main content
      gsap.to("#particles-js", {
        opacity: 0.6,
        duration: 1.5,
        ease: "power2.out",
      });

      initBannerAnimation();
    },
  });

  // Complete animation sequence with particles integrated
  introTL
    // Step 1: Fade in particles at the very beginning
    .to("#particles-js", {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
    })

    // Step 2: intro-line appears from top with particles visible
    .fromTo(
      ".intro-line",
      {
        opacity: 0,
        y: -200,
        height: "60vh",
        rotation: -5,
      },
      {
        opacity: 1,
        y: 50,
        height: "50vh",
        rotation: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      "-=0.3" // Overlap slightly with particle fade-in
    )

    // Step 3: intro-line disappears while particles continue
    .to(".intro-line", {
      opacity: 0,
      scale: 0.8,
      duration: 0.3,
      ease: "power2.in",
    })

    // Step 4: intro-ppl appears with enhanced particle activity
    .to(
      ".intro-ppl",
      {
        opacity: 1,
        scale: 1.1,
        duration: 0.4,
        ease: "power2.out",
      },
      "-=0.1"
    )

    // Step 5: Increase particle density temporarily during ppl display
    .to(
      "#particles-js",
      {
        opacity: 0.9,
        duration: 0.2,
        ease: "power1.inOut",
      },
      "-=0.3"
    )

    // Step 6: intro-ppl disappears
    .to(
      ".intro-ppl",
      {
        opacity: 0,
        scale: 0.9,
        duration: 0.3,
        ease: "power2.in",
      },
      "+=0.3"
    )

    // Step 7: Return particles to normal density
    .to(
      "#particles-js",
      {
        opacity: 0.7,
        duration: 0.3,
        ease: "power1.out",
      },
      "-=0.2"
    )

    // Step 8: intro-logo appears with dramatic particle backdrop
    .to(".intro-logo", {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: "back.out(1.7)",
    })

    // Step 9: Slight particle intensification during logo display
    .to(
      "#particles-js",
      {
        opacity: 0.8,
        duration: 0.5,
        ease: "power1.inOut",
      },
      "-=0.5"
    )

    // Step 10: Hold logo with particles for 1.5 seconds
    .to({}, { duration: 1.5 })

    // Step 11: intro-logo disappears with particle fade
    .to(
      ".intro-logo",
      {
        opacity: 0,
        scale: 1.2,
        duration: 0.5,
        ease: "power2.in",
      },
      "-=0.1"
    )

    // Step 12: Final particle adjustment before revealing content
    .to(
      "#particles-js",
      {
        opacity: 0.6,
        duration: 0.4,
        ease: "power2.out",
      },
      "-=0.3"
    )

    // Step 13: Hide intro container while keeping particles
    .to("#intro-animation", {
      height: 0,
      opacity: 0,
      visibility: "hidden",
      duration: 0.4,
      ease: "power2.out",
    });
}

/* CASE STUDY PAGE - Immediate content display */
function initCaseStudyPage() {
  console.log("Initializing case study page");

  // Show all content immediately
  gsap.set("main, header, footer, .slider-controls, .slider-progress", {
    opacity: 1,
    visibility: "visible",
  });

  // Initialize case study slider
  initCaseStudySlider();
}

/* IMMEDIATE CONTENT DISPLAY - For non-homepage pages */
function showContentImmediately() {
  console.log("Showing content immediately");
  gsap.set("main, header, footer", {
    opacity: 1,
    visibility: "visible",
  });
}

/* BANNER ANIMATION - Only for homepage */
function initBannerAnimation() {
  console.log("Starting banner animation");

  const bannerTL = gsap.timeline();

  bannerTL
    // Show main content
    .to("main, header, footer", {
      opacity: 1,
      visibility: "visible",
      duration: 0.5,
    })
    // Animate banner elements
    .fromTo(
      "#home-banner .banner-image",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }
    )
    .fromTo(
      "#home-banner .banner-title",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
      },
      "-=0.5"
    )
    .fromTo(
      "#home-banner .banner-content",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
      "-=0.3"
    );
}

/* OVERLAY MENU */
$(document).ready(function () {
  let menuTL;

  function createMenuAnimation() {
    return gsap.timeline({
      paused: true,
      onStart: function () {
        console.log("Menu opening started");
        $("body").addClass("hideScroll");
      },
      onReverseComplete: function () {
        console.log("Menu closing completed");
        $("body").removeClass("hideScroll");
        // Reset the timeline so it can be played again
        menuTL.progress(0).pause();
      },
    });
  }

  function initMenuAnimation() {
    menuTL = createMenuAnimation();

    // Build menu animation sequence
    menuTL
      // Hide main content
      .to("header", {
        opacity: 0,
        y: -50,
        duration: 0.4,
        ease: "power2.inOut",
      })

      // Different content hiding based on page type
      .to(
        $("#home-banner").length
          ? "#home-banner .container h1"
          : ".case-study-slider",
        {
          opacity: 0,
          y: -30,
          duration: 0.4,
          stagger: 0.1,
          ease: "power2.inOut",
        },
        "-=0.2"
      )

      .to(
        $("#home-banner").length
          ? "#home-banner .banner-content"
          : ".slider-controls",
        {
          opacity: 0,
          y: 30,
          duration: 0.4,
          ease: "power2.inOut",
        },
        "-=0.3"
      )

      .to(
        $("#home-banner").length
          ? "#home-banner .banner-image"
          : ".slider-progress",
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
        },
        "-=0.3"
      )

      // Stagger bars appear
      .to(".stagger-bars .bar", {
        scaleY: 1,
        duration: 1,
        stagger: {
          each: 0.06,
          from: "center",
          ease: "power2.inOut",
        },
      })

      // Stagger bars disappear and show menu
      .to(".stagger-bars .bar", {
        scaleY: 0,
        duration: 1,
        stagger: {
          each: 0.05,
          from: "edges",
          ease: "power2.inOut",
        },
      })

      // Show overlay menu
      .to(".overlay-menu", {
        height: "100vh",
        duration: 0.4,
        ease: "power2.out",
      })

      // Show menu content
      .to(
        ".overlay-header",
        {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.2"
      )

      .fromTo(
        ".overlay-menu-nav .menu-item",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.1"
      )
      .to(
        ".faq",
        {
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
        "-=0.2"
      )
      .fromTo(
        ".overlay-image",
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        "-=0.1"
      );
  }

  // Initialize menu animation
  initMenuAnimation();

  // Menu event handlers
  $("#open-menu").on("click", function () {
    console.log("Opening menu - timeline progress:", menuTL.progress());

    // If timeline is completed or reversed, reinitialize it
    if (menuTL.progress() === 1 || menuTL.reversed()) {
      console.log("Reinitializing menu animation");
      menuTL.kill();
      initMenuAnimation();
    }

    menuTL.play();
  });

  $("#close-menu").on("click", function () {
    console.log("Closing menu - timeline progress:", menuTL.progress());

    if (menuTL.progress() > 0) {
      menuTL.reverse();
    } else {
      forceCloseMenu();
    }
  });

  $(".overlay-menu-nav a").on("click", function (e) {
    e.preventDefault();
    console.log("Menu link clicked");

    if (menuTL.progress() > 0) {
      menuTL.reverse();
    } else {
      forceCloseMenu();
    }

    // Optional: Navigate after animation
    const href = $(this).attr("href");
    if (href && href !== "#") {
      setTimeout(() => {
        window.location.href = href;
      }, 1000);
    }
  });

  // Force close function as backup
  function forceCloseMenu() {
    console.log("Force closing menu");

    const closeTL = gsap.timeline();

    closeTL
      .to(".overlay-header, .overlay-menu-nav .menu-item, .faq", {
        opacity: 0,
        duration: 0.3,
      })
      .to(".overlay-menu", {
        height: "0",
        duration: 0.4,
      })
      .to(".stagger-bars .bar", {
        scaleY: 0,
        duration: 0.3,
      })
      .to("header", {
        opacity: 1,
        y: 0,
        duration: 0.4,
      })

      // Show different content based on page type
      .to(
        $("#home-banner").length
          ? "#home-banner .banner-image"
          : ".case-study-slider",
        {
          opacity: 1,
          duration: 0.5,
        }
      )
      .to(
        $("#home-banner").length
          ? "#home-banner .container h1"
          : ".slider-controls",
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
        }
      )
      .to(
        $("#home-banner").length
          ? "#home-banner .banner-content"
          : ".slider-progress",
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
        }
      )
      .call(function () {
        $("body").removeClass("hideScroll");
        // Reinitialize menu animation for next use
        menuTL.kill();
        initMenuAnimation();
      });
  }

  // Initialize scroll to top
  initScrollToTop();
});

/* CASE STUDY SLIDER */
function initCaseStudySlider() {
  console.log("Initializing case study slider");

  let currentSlide = 1;
  const slides = $(".slide");
  const totalSlides = slides.length;
  let isAnimating = false;

  // Update UI functions
  function updateUI() {
    $(".slider-number").text(`${currentSlide} / ${totalSlides}`);
    const progress = ((currentSlide - 1) / (totalSlides - 1)) * 100;
    $(".slider-progress-bar").css("width", `${progress}%`);

    // Update button states
    $("#prev-slide").prop("disabled", currentSlide === 1);
    $("#next-slide").prop("disabled", currentSlide === totalSlides);
  }

  // Slide navigation
  function goToSlide(slideNumber) {
    if (isAnimating || slideNumber < 1 || slideNumber > totalSlides) return;

    isAnimating = true;
    const direction = slideNumber > currentSlide ? 1 : -1;

    // Hide current active slide
    gsap.to($(".slide.active"), {
      opacity: 0,
      x: -100 * direction,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete: function () {
        $(".slide").removeClass("active");

        // Show new slide
        const newSlide = $(`.slide[data-slide="${slideNumber}"]`);
        newSlide.addClass("active");
        currentSlide = slideNumber;

        gsap.fromTo(
          newSlide,
          {
            opacity: 0,
            x: 100 * direction,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: "power2.out",
            onComplete: function () {
              isAnimating = false;
              updateUI();
            },
          }
        );
      },
    });
  }

  function nextSlide() {
    if (currentSlide < totalSlides && !isAnimating) {
      goToSlide(currentSlide + 1);
    }
  }

  function prevSlide() {
    if (currentSlide > 1 && !isAnimating) {
      goToSlide(currentSlide - 1);
    }
  }

  // Initialize slider
  function initSlider() {
    updateUI();

    // Add event listeners
    $("#next-slide").on("click", nextSlide);
    $("#prev-slide").on("click", prevSlide);

    // Keyboard navigation
    $(document).on("keydown", function (e) {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    });
  }

  // Initialize the slider
  initSlider();
}

/* TEAM BIO POPUP */
function initTeamBioPopup() {
  const popup = $("#team-bio-popup");
  const overlay = $(".popup-overlay");
  const closeBtn = $("#close-bio-popup");

  // Team member data
  const teamData = {
    lydia: {
      name: "Lydia Kakutwi",
      role: "Founding Partner",
      bio: "Lydia brings over 15 years of experience in strategic consulting with a focus on consumer insights and market analysis. Her expertise has helped numerous Fortune 500 companies transform their business strategies and achieve sustainable growth through data-driven decision making.",
    },
    njiraini: {
      name: "Njiraini Marima",
      role: "Founding Partner",
      bio: "Njiraini specializes in operational excellence and supply chain optimization. With a background in engineering and business management, he has successfully led transformation projects across multiple industries, delivering significant cost savings and efficiency improvements.",
    },
    paul: {
      name: "Paul Murugu",
      role: "Founding Partner",
      bio: "Paul is a marketing and branding expert with a proven track record of building iconic brands. His creative approach to brand strategy combined with analytical rigor has helped clients establish strong market positions and connect deeply with their target audiences.",
    },
    grace: {
      name: "Grace Roimen",
      role: "Founding Partner",
      bio: "Grace leads our financial consulting practice, bringing extensive experience in corporate finance and investment strategy. Her innovative financial models and risk assessment frameworks have been instrumental in guiding clients through complex financial decisions.",
    },
    brenda: {
      name: "Brenda Mwancha",
      role: "Founding Partner",
      bio: "Brenda is our technology and digital transformation lead. She has spearheaded numerous digital innovation projects, helping traditional businesses adapt to the digital age while maintaining their core values and customer relationships.",
    },
  };

  // Open popup function
  function openBioPopup(memberKey) {
    const memberData = teamData[memberKey];
    if (!memberData) return;

    // Update popup content
    $(".member-name").text(memberData.name);
    $(".member-role").text(memberData.role);
    $(".bio-text").text(memberData.bio);

    // Create animation timeline
    const popupTL = gsap.timeline();

    popupTL
      .set(popup, { display: "flex" }) // Use 'flex' for flexbox centering
      .fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      )
      .fromTo(
        ".popup-content",
        {
          opacity: 0,
          scale: 0.7,
          y: -20, // Slight vertical offset for better animation
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: "back.out(1.2)",
        },
        "-=0.2"
      );

    popup.addClass("active");
    $("body").addClass("hideScroll");
  }

  // Close popup function
  function closeBioPopup() {
    const closeTL = gsap.timeline({
      onComplete: function () {
        popup.removeClass("active");
        $("body").removeClass("hideScroll");
        gsap.set(popup, { display: "none" });
      },
    });

    closeTL
      .to(".popup-content", {
        opacity: 0,
        scale: 0.8,
        y: 50,
        duration: 0.4,
        ease: "power2.in",
      })
      .to(
        overlay,
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        "-=0.2"
      );
  }

  // Event listeners - FIXED VERSION
  $(document).on("click", ".view-bio-btn", function (e) {
    e.preventDefault();
    e.stopPropagation();

    const memberKey = $(this).data("member");
    console.log("View Bio clicked for:", memberKey); // Debug log

    if (memberKey && teamData[memberKey]) {
      openBioPopup(memberKey);
    }
  });

  closeBtn.on("click", closeBioPopup);
  overlay.on("click", closeBioPopup);

  // Close on ESC key
  $(document).on("keydown", function (e) {
    if (e.keyCode === 27 && popup.hasClass("active")) {
      closeBioPopup();
    }
  });
}

/* ANIMATED CASE STUDY SLIDER */
function initCaseStudySlider() {
  const pagination = $(".pagination span");
  const slides = $(".case-slide");
  let currentSlide = 1;
  let isAnimating = false;

  console.log("Initializing case study slider...");
  console.log("Pagination items:", pagination.length);
  console.log("Slides found:", slides.length);

  // Initialize first slide
  function initializeFirstSlide() {
    // Ensure first slide is visible and has proper styling
    $('.case-slide[data-slide="1"]').addClass("active").show();
    $('.pagination span[data-slide="1"]').addClass("active");
  }

  function goToSlide(slideNumber) {
    if (isAnimating || slideNumber === currentSlide) return;

    console.log("Navigating to slide:", slideNumber);
    isAnimating = true;
    const direction = slideNumber > currentSlide ? 1 : -1;

    // Update pagination
    pagination.removeClass("active");
    $(`.pagination span[data-slide="${slideNumber}"]`).addClass("active");

    // Get current and next slides
    const currentActive = $(".case-slide.active");
    const nextSlide = $(`.case-slide[data-slide="${slideNumber}"]`);

    console.log("Current active:", currentActive.length);
    console.log("Next slide:", nextSlide.length);

    if (nextSlide.length === 0) {
      console.error("Next slide not found!");
      isAnimating = false;
      return;
    }

    // Create animation timeline
    const slideTL = gsap.timeline({
      onComplete: () => {
        isAnimating = false;
        currentSlide = slideNumber;
        console.log("Slide transition complete. Current slide:", currentSlide);
      },
    });

    // Exit current slide
    slideTL
      .to(currentActive, {
        x: -100 * direction,
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
      })
      .call(
        () => {
          currentActive.removeClass("active");
        },
        null,
        "-=0.6"
      )

      // Prepare and enter new slide
      .set(nextSlide, {
        x: 100 * direction,
        opacity: 0,
        display: "flex",
      })
      .to(nextSlide, {
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power2.out",
      })
      .call(
        () => {
          nextSlide.addClass("active");
        },
        null,
        "-=0.7"
      );
  }

  // Initialize slider
  function initSlider() {
    // Initialize first slide
    initializeFirstSlide();

    // Pagination click events
    pagination.on("click", function () {
      const slideNumber = parseInt($(this).data("slide"));
      console.log("Pagination clicked, slide:", slideNumber);
      goToSlide(slideNumber);
    });

    // Keyboard navigation
    $(document).on("keydown", function (e) {
      if (e.key === "ArrowRight" && currentSlide < pagination.length) {
        goToSlide(currentSlide + 1);
      } else if (e.key === "ArrowLeft" && currentSlide > 1) {
        goToSlide(currentSlide - 1);
      }
    });

    console.log("Case study slider initialized successfully");
  }

  // Wait for DOM to be fully ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSlider);
  } else {
    initSlider();
  }
}

// Initialize team bio popup
$(document).ready(function () {
  initTeamBioPopup();

  // Initialize case study slider
  if ($("#case-studies").length) {
    initCaseStudySlider();
  }
});
