// Active Menu Style Functionality
jQuery(document).ready(function ($) {
  // Add active class to current menu item
  function setActiveMenuItem() {
    const currentPath = window.location.pathname;
    const currentUrl = window.location.href;

    // Remove existing active classes from all menu items
    $(".menu-item").removeClass("active");

    // Handle homepage specifically
    if (
      currentPath === "/" ||
      currentPath === "/index.html" ||
      currentPath.endsWith("index.html")
    ) {
      $(".top-bar__menu .menu-item:first-child").addClass("active");
      $('.menu-item a[href="/"]').parent(".menu-item").addClass("active");
      return;
    }

    // Check each menu link for other pages
    $(".menu-item > a").each(function () {
      const linkHref = $(this).attr("href");

      if (!linkHref || linkHref === "#" || linkHref === "/") {
        return;
      }

      if (
        currentUrl.indexOf(linkHref) !== -1 ||
        currentPath.indexOf(linkHref) !== -1
      ) {
        const pathSegments = currentPath.split("/").filter((s) => s);
        const linkSegments = linkHref.split("/").filter((s) => s);

        if (linkSegments.length > 0) {
          const lastLinkSegment = linkSegments[linkSegments.length - 1];
          if (
            pathSegments.includes(lastLinkSegment) ||
            currentPath.endsWith(linkHref) ||
            currentPath === linkHref
          ) {
            $(this).parent(".menu-item").addClass("active");
            $(this).parents(".menu-item").addClass("active");
          }
        }
      }
    });
  }

  // Initialize active menu item
  setActiveMenuItem();

  // Top bar dropdown hover enhancement
  $(".top-bar .menu-item-has-children").hover(
    function () {
      $(this).find("> .sub-menu").stop(true, true).slideDown(200);
    },
    function () {
      $(this).find("> .sub-menu").stop(true, true).slideUp(200);
    },
  );

  // Mega menu hover enhancement with submenu switching
  $(".main-header .menu-item-has-children").hover(
    function () {
      const $megaMenu = $(this).find("> .mega-menu");
      $megaMenu.stop(true, true).fadeIn(200);

      // Add hover class to parent for background color
      $(this).addClass("hover");
    },
    function () {
      const $megaMenu = $(this).find("> .mega-menu");
      $megaMenu.stop(true, true).fadeOut(200);

      // Remove hover class
      $(this).removeClass("hover");
    },
  );

  // Mega menu item hover to show corresponding submenu
  $(".mega-menu__items .menu-item").hover(function () {
    const submenuId = $(this).data("submenu");

    // Hide all submenus first
    $(this)
      .closest(".mega-menu")
      .find(".submenu-container")
      .removeClass("active");

    // Show the corresponding submenu
    if (submenuId) {
      $(this)
        .closest(".mega-menu")
        .find("#" + submenuId)
        .addClass("active");
    }
  });

  // Search functionality
  $(".top-bar__search button").on("click", function (e) {
    e.preventDefault();
    const searchTerm = $(this).siblings("input").val();
    if (searchTerm) {
      console.log("Searching for:", searchTerm);
    }
  });

  // Handle window resize
  $(window).on("resize", function () {
    if ($(window).width() <= 1024) {
      // Tablet menu logic here
    }
    if ($(window).width() <= 768) {
      // Mobile menu logic here
    }
  });

  // Re-check active class on page load
  $(window).on("load", function () {
    setActiveMenuItem();
  });

  // Handle menu items without links
  $(".menu-item-has-children").each(function () {
    if (!$(this).find("> a").length) {
      $(this).prepend('<a href="#">Menu</a>');
    }
  });
});

// Home Page Swiper Js Banner Slider
jQuery(document).ready(function ($) {
  // Initialize Swiper banner
  const bannerSwiper = new Swiper(".banner-swiper", {
    // Direction
    direction: "vertical",

    // Loop mode
    loop: true,

    // Auto play
    // autoplay: {
    //   delay: 5000,
    //   disableOnInteraction: false,
    // },

    // Speed of transition
    speed: 1000,

    // Effect
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },

    // Pagination (vertical on left)
    pagination: {
      el: ".banner-pagination",
      clickable: true,
      type: "bullets",
      dynamicBullets: false,
    },

    // Vertical pagination
    direction: "horizontal",

    // No navigation arrows
    navigation: false,

    // Touch interaction
    grabCursor: true,

    // Pause on hover
    pauseOnMouseEnter: true,
  });
});

$(document).ready(function () {
  $(".tab-links li").click(function () {
    var tabID = $(this).data("tab");

    $(".tab-links li").removeClass("active");
    $(this).addClass("active");

    $(".tab").removeClass("active");
    $("#" + tabID).addClass("active");
  });
});

//Home Page Testimonials Slider
jQuery(document).ready(function ($) {
  // Initialize Testimonial Swiper
  const testimonialSwiper = new Swiper(".testimonial-swiper", {
    // Slides configuration
    //centeredSlides: true,
    slidesPerView: "auto",
    spaceBetween: 30,
    loop: true,

    // Auto scroll
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },

    // Speed
    speed: 1000,

    // Cursor control
    grabCursor: true,

    // No navigation or pagination
    navigation: false,
    pagination: false,

    // Allow touch move
    simulateTouch: true,
    touchRatio: 1,
    touchAngle: 45,

    // Free mode for smooth scrolling
    //freeMode: true,
    //freeModeMomentum: true,
    //freeModeMomentumRatio: 1,

    // Breakpoints for responsive
    breakpoints: {
      320: {
        slidesPerView: "auto",
        spaceBetween: 20,
      },
      768: {
        slidesPerView: "auto",
        spaceBetween: 30,
      },
    },
  });

  // Optional: Pause autoplay on hover
  $(".testimonial-swiper").hover(
    function () {
      testimonialSwiper.autoplay.stop();
    },
    function () {
      testimonialSwiper.autoplay.start();
    },
  );
});

// About Page Sticky Section Links and Active State Functionality
jQuery(document).ready(function ($) {
  // Get the section links element
  const $sectionLinks = $("#section-links");
  const $links = $("#section-links .links a");
  const $sections = $("main section[id]"); // Get all sections with IDs

  // Store original position of section links
  let stickyOffset = $sectionLinks.offset().top;
  let linksHeight = $sectionLinks.outerHeight();

  // Function to handle sticky behavior
  function handleStickyLinks() {
    const scrollTop = $(window).scrollTop();

    if (scrollTop >= stickyOffset) {
      if (!$sectionLinks.hasClass("sticky")) {
        $sectionLinks.addClass("sticky");
        // Add padding to body to prevent content jump
        $("body").css("padding-top", linksHeight + "px");
      }
    } else {
      if ($sectionLinks.hasClass("sticky")) {
        $sectionLinks.removeClass("sticky");
        $("body").css("padding-top", "0");
      }
    }
  }

  // Function to update active link based on scroll position
  function updateActiveLink() {
    const scrollPosition = $(window).scrollTop();
    const windowHeight = $(window).height();

    // Get the sticky header height if it exists
    const headerHeight = $("#site-header").outerHeight() || 0;
    const stickyLinksHeight = $sectionLinks.hasClass("sticky")
      ? $sectionLinks.outerHeight()
      : 0;
    const offset = headerHeight + stickyLinksHeight + 100; // 100px offset for better UX

    let activeSet = false;

    // Check each section to see if it's in view
    $sections.each(function () {
      const $section = $(this);
      const sectionId = $section.attr("id");
      const sectionTop = $section.offset().top;
      const sectionBottom = sectionTop + $section.outerHeight();

      // Check if we've scrolled past the top of this section (with offset)
      if (scrollPosition >= sectionTop - offset) {
        // Remove active class from all links
        $links.removeClass("active");

        // Add active class to corresponding link
        $(`#section-links .links a[href="#${sectionId}"]`).addClass("active");
        activeSet = true;
      }
    });

    // Handle case when at the top of the page - activate first section
    if (scrollPosition < 100) {
      $links.removeClass("active");
      $($links[0]).addClass("active"); // Activate first link
    }

    // Handle case when at the bottom of the page
    if ($(window).scrollTop() + windowHeight >= $(document).height() - 100) {
      const lastSection = $sections.last();
      const lastSectionId = lastSection.attr("id");
      $links.removeClass("active");
      $(`#section-links .links a[href="#${lastSectionId}"]`).addClass("active");
    }
  }

  // Smooth scroll when clicking section links
  $links.on("click", function (e) {
    e.preventDefault();

    const targetId = $(this).attr("href"); // Get the target section ID
    const $targetSection = $(targetId);

    if ($targetSection.length) {
      // Calculate scroll position accounting for sticky elements
      const headerHeight = $("#site-header").outerHeight() || 0;
      const linksHeight = $sectionLinks.outerHeight() || 0;

      // If section links are sticky, they're part of the offset
      // If not sticky, they'll scroll away so we don't need to account for them
      const offset = $sectionLinks.hasClass("sticky")
        ? headerHeight + linksHeight + 20
        : headerHeight + 20;

      const targetPosition = $targetSection.offset().top - offset;

      // Smooth scroll to target
      $("html, body").animate(
        {
          scrollTop: targetPosition,
        },
        800,
        "swing",
      );

      // Update active link immediately on click
      $links.removeClass("active");
      $(this).addClass("active");
    }
  });

  // Function to recalculate sticky offset on window resize
  function recalcStickyOffset() {
    stickyOffset = $sectionLinks.offset().top;
    linksHeight = $sectionLinks.outerHeight();
    handleStickyLinks();
    updateActiveLink();
  }

  // Throttle function to limit scroll event calls
  function throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  // Initial calls
  setTimeout(() => {
    recalcStickyOffset();
    updateActiveLink();
  }, 100);

  // Listen for scroll events with throttling for better performance
  $(window).on(
    "scroll",
    throttle(function () {
      handleStickyLinks();
      updateActiveLink();
    }, 100),
  );

  // Listen for resize events
  $(window).on("resize", function () {
    recalcStickyOffset();
  });

  // Handle cases where images might load after page load
  $(window).on("load", function () {
    recalcStickyOffset();
    updateActiveLink();
  });

  // Handle dynamic content changes
  setTimeout(function () {
    recalcStickyOffset();
    updateActiveLink();
  }, 500);
});

// About Page Statements Accordion Functionality for Statements Section
jQuery(document).ready(function ($) {
  // Initialize accordion - first item active by default
  const $accordionItems = $("#statements .accordion-item");

  // First item active by default
  $accordionItems.first().addClass("active");

  // Handle accordion item click
  $accordionItems.on("click", function () {
    const $this = $(this);

    // If clicked item is already active, do nothing
    if ($this.hasClass("active")) {
      return;
    }

    // Remove active class from all items
    $accordionItems.removeClass("active");

    // Add active class to clicked item
    $this.addClass("active");
  });

  // Optional: Add hover effect for better UX
  $accordionItems.hover(
    function () {
      if (!$(this).hasClass("active")) {
        $(this).css("opacity", "0.8");
      }
    },
    function () {
      if (!$(this).hasClass("active")) {
        $(this).css("opacity", "0.6");
      }
    },
  );
});

// History Section - Step-based Timeline Navigation
jQuery(document).ready(function ($) {
  // Cache DOM elements
  const $stages = $(".timeline-stages .stage");
  const $progressFill = $("#progress-fill");
  const $phaseTitle = $("#phase-title-display");
  const $phaseDescription = $("#phase-description-display");

  // Phase data from hidden elements
  const phaseData = [];
  $(".phase-item").each(function () {
    phaseData.push({
      title: $(this).find(".phase-title-data").text(),
      description: $(this).find(".phase-description-data").text(),
    });
  });

  // Calculate progress percentage based on active stage
  function calculateProgress(activeIndex) {
    const totalStages = $stages.length;
    // Progress = (active stage index + 1) / total stages * 100%
    return ((activeIndex + 1) / totalStages) * 100;
  }

  // Update stage classes and progress bar
  function setActiveStage(index) {
    // Remove all classes first
    $stages.removeClass("active completed");

    // Add classes based on index
    $stages.each(function (i) {
      if (i < index) {
        $(this).addClass("completed");
      } else if (i === index) {
        $(this).addClass("active");
      }
    });

    // Update progress bar
    const progress = calculateProgress(index);
    $progressFill.css("width", progress + "%");

    // Update phase content
    updatePhaseContent(index);
  }

  // Update phase title and description with animation
  function updatePhaseContent(index) {
    if (phaseData[index]) {
      // Fade out current content
      gsap.to([$phaseTitle, $phaseDescription], {
        opacity: 0,
        y: 20,
        duration: 0.3,
        onComplete: function () {
          // Update text
          $phaseTitle.text(phaseData[index].title);
          $phaseDescription.text(phaseData[index].description);

          // Fade in new content
          gsap.to([$phaseTitle, $phaseDescription], {
            opacity: 1,
            y: 0,
            duration: 0.4,
            delay: 0.1,
          });
        },
      });
    }
  }

  // Handle stage click
  $stages.on("click", function () {
    const $this = $(this);
    const stageIndex = $this.data("stage") - 1; // Convert to 0-based index

    // Don't do anything if clicking the active stage
    if ($this.hasClass("active")) {
      return;
    }

    // Set the clicked stage as active
    setActiveStage(stageIndex);

    // Optional: Add a subtle bounce effect to the clicked year
    gsap.fromTo(
      $this.find(".stage-year"),
      { scale: 1 },
      {
        scale: 1.4,
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
      },
    );
  });

  // Initialize with first stage active
  setActiveStage(0);

  // Add keyboard navigation (optional)
  $(document).on("keydown", function (e) {
    const currentActive = $stages.filter(".active").data("stage") - 1;

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      // Next stage
      const nextIndex = Math.min(currentActive + 1, $stages.length - 1);
      if (nextIndex !== currentActive) {
        setActiveStage(nextIndex);
      }
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      // Previous stage
      const prevIndex = Math.max(currentActive - 1, 0);
      if (prevIndex !== currentActive) {
        setActiveStage(prevIndex);
      }
    }
  });

  // Add touch swipe for mobile (optional)
  let touchstartX = 0;
  let touchendX = 0;

  $("#history").on("touchstart", function (e) {
    touchstartX = e.changedTouches[0].screenX;
  });

  $("#history").on("touchend", function (e) {
    touchendX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const currentActive = $stages.filter(".active").data("stage") - 1;
    const swipeThreshold = 50;

    if (touchendX < touchstartX - swipeThreshold) {
      // Swipe left - next stage
      const nextIndex = Math.min(currentActive + 1, $stages.length - 1);
      if (nextIndex !== currentActive) {
        setActiveStage(nextIndex);
      }
    }

    if (touchendX > touchstartX + swipeThreshold) {
      // Swipe right - previous stage
      const prevIndex = Math.max(currentActive - 1, 0);
      if (prevIndex !== currentActive) {
        setActiveStage(prevIndex);
      }
    }
  }

  // Handle window resize - ensure progress bar stays behind steps
  $(window).on("resize", function () {
    // Recalculate anything needed on resize
    const currentActive = $stages.filter(".active").data("stage") - 1;
    const progress = calculateProgress(currentActive);
    $progressFill.css("width", progress + "%");
  });
});
