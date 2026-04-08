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

// Sticky Section Links and Active State Functionality
jQuery(document).ready(function ($) {
  // Get the section links element
  const $sectionLinks = $("#section-links");
  const $links = $("#section-links .links a");
  const $sections = $("main section[id]"); // Get all sections with IDs
  const $header = $("#site-header");
  const $main = $("main"); // Get the main content

  // Store original position and dimensions
  let stickyOffset = 0;
  let headerHeight = 0;
  let linksHeight = 0;
  let sectionLinksTop = 0;

  // Create a spacer element to prevent content jump
  let $spacer = $("#section-links-spacer");
  if (!$spacer.length) {
    $spacer = $('<div id="section-links-spacer"></div>');
    $sectionLinks.after($spacer);
  }

  // Function to recalculate all dimensions
  function recalcDimensions() {
    headerHeight = $header.outerHeight() || 0;
    linksHeight = $sectionLinks.outerHeight() || 0;
    sectionLinksTop = $sectionLinks.offset().top;

    // The offset at which links become sticky
    // This should be when the top of the section links hits the top of the viewport
    stickyOffset = sectionLinksTop;

    // Set spacer height to match section links
    $spacer.css("height", linksHeight + "px");
  }

  // Function to handle sticky behavior
  function handleStickyLinks() {
    const scrollTop = $(window).scrollTop();

    if (scrollTop >= stickyOffset) {
      if (!$sectionLinks.hasClass("sticky")) {
        $sectionLinks.addClass("sticky");
        // Hide spacer when not needed
        $spacer.show();
      }
    } else {
      if ($sectionLinks.hasClass("sticky")) {
        $sectionLinks.removeClass("sticky");
        // Hide spacer when not sticky
        $spacer.hide();
      }
    }
  }

  // Function to update active link based on scroll position
  function updateActiveLink() {
    const scrollPosition = $(window).scrollTop();
    const windowHeight = $(window).height();

    // Calculate current header height (might be different if sticky)
    const currentHeaderHeight = $header.outerHeight() || 0;
    const currentLinksHeight = $sectionLinks.hasClass("sticky")
      ? $sectionLinks.outerHeight()
      : 0;

    // Offset for detecting section visibility
    // We want to activate the link when the section top hits the bottom of the sticky elements
    const offset = currentHeaderHeight + currentLinksHeight + 50; // 50px extra for better UX

    let activeFound = false;

    // Check each section to see if it's in view
    $sections.each(function () {
      const $section = $(this);
      const sectionId = $section.attr("id");
      const sectionTop = $section.offset().top;
      const sectionBottom = sectionTop + $section.outerHeight();

      // Check if we've scrolled past the top of this section (with offset)
      if (
        scrollPosition >= sectionTop - offset &&
        scrollPosition < sectionBottom - offset
      ) {
        // Remove active class from all links
        $links.removeClass("active");

        // Add active class to corresponding link
        $(`#section-links .links a[href="#${sectionId}"]`).addClass("active");
        activeFound = true;
        return false; // Break the loop
      }
    });

    // If no active section found, check if we're at the top
    if (!activeFound && scrollPosition < 100) {
      $links.removeClass("active");
      $($links[0]).addClass("active");
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
      // Get current heights
      const currentHeaderHeight = $header.outerHeight() || 0;

      // Calculate offset - always use header height plus a small buffer
      // Don't include links height in offset when scrolling
      const offset = currentHeaderHeight + 20;

      const targetPosition = $targetSection.offset().top - offset;

      // Smooth scroll to target
      $("html, body").animate(
        {
          scrollTop: targetPosition,
        },
        800,
        "swing",
        function () {
          // After scrolling, update active link
          $links.removeClass("active");
          $(`#section-links .links a[href="${targetId}"]`).addClass("active");

          // Update sticky state after scroll
          setTimeout(() => {
            handleStickyLinks();
          }, 100);
        },
      );
    }
  });

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

  // Debounce function for resize events
  function debounce(func, wait) {
    let timeout;
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, arguments), wait);
    };
  }

  // Initial calculations
  recalcDimensions();

  // Initial active link
  setTimeout(() => {
    updateActiveLink();
  }, 100);

  // Listen for scroll events with throttling
  $(window).on(
    "scroll",
    throttle(function () {
      handleStickyLinks();
      updateActiveLink();
    }, 50),
  );

  // Listen for resize events with debouncing
  $(window).on(
    "resize",
    debounce(function () {
      recalcDimensions();
      handleStickyLinks();
      updateActiveLink();
    }, 150),
  );

  // Handle cases where images might load after page load
  $(window).on("load", function () {
    recalcDimensions();
    handleStickyLinks();
    updateActiveLink();
  });

  // Handle dynamic content changes
  setTimeout(function () {
    recalcDimensions();
    handleStickyLinks();
    updateActiveLink();
  }, 500);

  // Also recalc when any images load (they can affect heights)
  $("img").on("load", function () {
    recalcDimensions();
    handleStickyLinks();
  });
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
    return ((activeIndex + 1) / totalStages) * 95;
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

// Difference Section Accordion
jQuery(document).ready(function ($) {
  const $accordionItems = $(".difference-accordion .accordion-item");

  // Optional: Set first item as active by default
  // $accordionItems.first().addClass('active');

  // Handle accordion header click
  $accordionItems.find(".accordion-header").on("click", function (e) {
    e.preventDefault();

    const $parentItem = $(this).closest(".accordion-item");
    const $content = $parentItem.find(".accordion-content");

    // Check if clicked item is already active
    if ($parentItem.hasClass("active")) {
      // Close this accordion
      $parentItem.removeClass("active");

      // Animate content closing
      $content.css({
        "max-height": "0",
        opacity: "0",
      });
    } else {
      // Close any other open accordions first (for single open at a time)
      $accordionItems.each(function () {
        if ($(this).hasClass("active")) {
          $(this).removeClass("active");
          $(this).find(".accordion-content").css({
            "max-height": "0",
            opacity: "0",
          });
        }
      });

      // Open this accordion
      $parentItem.addClass("active");

      // Get content height for smooth animation
      const contentHeight = $content.find(".content-wrapper").outerHeight();

      $content.css({
        "max-height": contentHeight + "px",
        opacity: "1",
      });
    }
  });

  // Handle window resize - update max-height for open accordions
  $(window).on("resize", function () {
    $accordionItems.each(function () {
      if ($(this).hasClass("active")) {
        const $content = $(this).find(".accordion-content");
        const contentHeight = $content.find(".content-wrapper").outerHeight();

        $content.css("max-height", contentHeight + "px");
      }
    });
  });

  // Optional: Add smooth hover effect for icons
  $accordionItems.find(".accordion-header").hover(
    function () {
      $(this).find(".accordion-icon").css("transform", "scale(1.1)");
    },
    function () {
      $(this).find(".accordion-icon").css("transform", "scale(1)");
    },
  );
});

// Drive Section - Swiper Cards Slider
jQuery(document).ready(function ($) {
  // Check if Swiper is available and element exists
  if (typeof Swiper !== "undefined" && $(".drive-swiper").length) {
    const driveSwiper = new Swiper(".drive-swiper", {
      // Cards effect
      effect: "cards",

      // Enable grabbing cursor
      grabCursor: true,

      // Disable navigation/pagination
      navigation: false,
      pagination: false,
      scrollbar: false,

      // Cards effect configuration
      cardsEffect: {
        // Rotate the cards slightly
        rotate: false,
        // Stretch between cards
        stretch: 10,
        // Depth of the cards effect
        depth: 100,
        // Modify the modifier
        modifier: 1,
        // Slide shadows
        slideShadows: false, // Disable default shadows since we have custom box-shadow
      },

      // Allow touch move
      simulateTouch: true,
      touchRatio: 1,
      touchAngle: 45,

      // Speed of transition
      speed: 400,

      // Loop mode
      loop: true,

      // Auto height (adjusts based on content)
      autoHeight: false,

      // Space between slides
      spaceBetween: 0,

      // Initial slide
      initialSlide: 0,

      // Breakpoints for responsive behavior
      breakpoints: {
        320: {
          cardsEffect: {
            depth: 60,
          },
        },
        768: {
          cardsEffect: {
            depth: 80,
          },
        },
        1024: {
          cardsEffect: {
            depth: 100,
          },
        },
      },

      // Events
      on: {
        init: function () {
          console.log("Drive swiper initialized");
        },
        slideChange: function () {
          // Optional: Add any custom behavior when slide changes
        },
      },
    });

    // Optional: Pause autoplay on hover (if you enable autoplay later)
    $(".drive-swiper").hover(
      function () {
        // Uncomment if you enable autoplay
        // driveSwiper.autoplay.stop();
      },
      function () {
        // Uncomment if you enable autoplay
        // driveSwiper.autoplay.start();
      },
    );

    // Handle window resize
    $(window).on("resize", function () {
      driveSwiper.update(); // Update swiper on resize
    });
  }
});

// Accordion for entire site (e.g. strategic plan page)
jQuery(document).ready(function ($) {
  const $accordionItems = $(".unaitas-accordion .accordion-item");

  // Set first item as active by default
  $accordionItems.first().addClass("active");

  // Handle accordion header click
  $accordionItems.find(".accordion-header").on("click", function (e) {
    e.preventDefault();

    const $parentItem = $(this).closest(".accordion-item");
    const $content = $parentItem.find(".accordion-content");

    // Check if clicked item is already active
    if ($parentItem.hasClass("active")) {
      // Close this accordion
      $parentItem.removeClass("active");

      // Animate content closing
      $content.css({
        "max-height": "0",
        opacity: "0",
      });
    } else {
      // Close any other open accordions first (for single open at a time)
      $accordionItems.each(function () {
        if ($(this).hasClass("active")) {
          $(this).removeClass("active");
          $(this).find(".accordion-content").css({
            "max-height": "0",
            opacity: "0",
          });
        }
      });

      // Open this accordion
      $parentItem.addClass("active");

      // Get content height for smooth animation
      const contentHeight = $content.find(".content-wrapper").outerHeight();

      $content.css({
        "max-height": contentHeight + "px",
        opacity: "1",
      });
    }
  });

  // Handle window resize - update max-height for open accordions
  $(window).on("resize", function () {
    $accordionItems.each(function () {
      if ($(this).hasClass("active")) {
        const $content = $(this).find(".accordion-content");
        const contentHeight = $content.find(".content-wrapper").outerHeight();

        $content.css("max-height", contentHeight + "px");
      }
    });
  });

  // Optional: Add smooth hover effect for icons
  $accordionItems.find(".accordion-header").hover(
    function () {
      $(this).find(".accordion-icon").css("transform", "scale(1.1)");
    },
    function () {
      $(this).find(".accordion-icon").css("transform", "scale(1)");
    },
  );
});

// Become Member Accordion
jQuery(document).ready(function ($) {
  const $accordionItems = $(".member-accordion .accordion-item");

  // Set first item as active by default
  $accordionItems.first().addClass("active");

  // Handle accordion header click
  $accordionItems.find(".accordion-header").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    const $parentItem = $(this).closest(".accordion-item");

    // If clicked item is already active, close it
    if ($parentItem.hasClass("active")) {
      $parentItem.removeClass("active");
    } else {
      // Close other open accordions (for single open at a time)
      $accordionItems.removeClass("active");

      // Open this accordion
      $parentItem.addClass("active");

      // Optional: Smooth scroll to the opened accordion
      setTimeout(function () {
        const offset = $parentItem.offset().top;
        const headerHeight = $("header").outerHeight() || 0;

        if ($(window).scrollTop() > offset - 100) {
          $("html, body").animate(
            {
              scrollTop: offset - headerHeight - 20,
            },
            300,
          );
        }
      }, 100);
    }
  });

  // Handle requirement item hover for better UX
  $(".requirement-item").hover(
    function () {
      $(this).css("transform", "translateX(5px)");
    },
    function () {
      $(this).css("transform", "translateX(0)");
    },
  );

  // Optional: Add keyboard accessibility
  $accordionItems
    .find(".accordion-header")
    .on("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        $(this).trigger("click");
      }
    })
    .attr("tabindex", "0")
    .attr("role", "button")
    .attr("aria-expanded", function () {
      return $(this).closest(".accordion-item").hasClass("active");
    });

  // Update ARIA attributes when accordion state changes
  $accordionItems.on("accordionToggle", function () {
    const $header = $(this).find(".accordion-header");
    const isActive = $(this).hasClass("active");
    $header.attr("aria-expanded", isActive);
  });

  // Trigger ARIA update on initial load
  $accordionItems.each(function () {
    $(this).trigger("accordionToggle");
  });
});

// Savings Page Accordion
jQuery(document).ready(function ($) {
  const $accordionItems = $(".savings-accordion .accordion-item");

  // Optional: Set first item as active by default
  $accordionItems.first().addClass("active");

  // Handle accordion header click
  $accordionItems.find(".accordion-header").on("click", function (e) {
    e.preventDefault();

    const $parentItem = $(this).closest(".accordion-item");
    const $content = $parentItem.find(".accordion-content");

    // Check if clicked item is already active
    if ($parentItem.hasClass("active")) {
      // Close this accordion
      $parentItem.removeClass("active");

      // Animate content closing
      $content.css({
        "max-height": "0",
        opacity: "0",
      });
    } else {
      // Close any other open accordions first (for single open at a time)
      $accordionItems.each(function () {
        if ($(this).hasClass("active")) {
          $(this).removeClass("active");
          $(this).find(".accordion-content").css({
            "max-height": "0",
            opacity: "0",
          });
        }
      });

      // Open this accordion
      $parentItem.addClass("active");

      // Get content height for smooth animation
      const contentHeight = $content.find(".content-wrapper").outerHeight();

      $content.css({
        "max-height": contentHeight + "px",
        opacity: "1",
      });
    }
  });

  // Handle window resize - update max-height for open accordions
  $(window).on("resize", function () {
    $accordionItems.each(function () {
      if ($(this).hasClass("active")) {
        const $content = $(this).find(".accordion-content");
        const contentHeight = $content.find(".content-wrapper").outerHeight();

        $content.css("max-height", contentHeight + "px");
      }
    });
  });

  // Optional: Add smooth hover effect for icons
  $accordionItems.find(".accordion-header").hover(
    function () {
      $(this).find(".accordion-icon").css("transform", "scale(1.1)");
    },
    function () {
      $(this).find(".accordion-icon").css("transform", "scale(1)");
    },
  );
});

// Loan Calculator Functionality
jQuery(document).ready(function ($) {
  // Cache DOM elements
  const $loanAmount = $("#loan-amount");
  const $repaymentPeriod = $("#repayment-period");
  const $periodUnit = $("#period-unit");
  const $interestRate = $("#interest-rate");
  const $interestValue = $("#interest-value");
  const $calculateBtn = $("#calculate-btn");
  const $monthlyRepayment = $("#monthly-repayment");
  const $totalInterest = $("#total-interest");
  const $totalPayable = $("#total-payable");
  const $principal = $("#principal");
  const $effectiveRate = $("#effective-rate");

  // Format number as currency (with commas)
  function formatCurrency(value) {
    return value.toLocaleString("en-KE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }

  // Calculate loan repayment
  function calculateLoan() {
    // Get input values - no defaults, use actual input values
    let loanAmount = parseFloat($loanAmount.val()) || 0;
    let period = parseFloat($repaymentPeriod.val()) || 0;
    let unit = $periodUnit.val();
    let annualRate = parseFloat($interestRate.val()) || 0;

    // Check if any required fields are empty or zero
    if (loanAmount <= 0 || period <= 0 || annualRate <= 0) {
      // Clear summary fields if inputs are invalid
      $monthlyRepayment.text("0.00");
      $totalInterest.text("0.00");
      $totalPayable.text("0.00");
      $principal.text("0.00");
      $effectiveRate.text("0.00");
      return;
    }

    // Convert period to months
    let months = unit === "years" ? period * 12 : period;

    // Calculate monthly interest rate
    let monthlyRate = annualRate / 100 / 12;

    let monthlyPayment = 0;
    let totalPayment = 0;
    let totalInterestPaid = 0;

    if (monthlyRate === 0) {
      monthlyPayment = loanAmount / months;
      totalPayment = loanAmount;
      totalInterestPaid = 0;
    } else {
      // Calculate EMI using formula: P * r * (1+r)^n / ((1+r)^n - 1)
      const denominator = Math.pow(1 + monthlyRate, months) - 1;
      if (denominator !== 0) {
        monthlyPayment =
          (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
          denominator;
      } else {
        monthlyPayment = loanAmount / months;
      }

      totalPayment = monthlyPayment * months;
      totalInterestPaid = totalPayment - loanAmount;
    }

    // Update display values with formatted currency
    $monthlyRepayment.text(formatCurrency(monthlyPayment));
    $totalInterest.text(formatCurrency(totalInterestPaid));
    $totalPayable.text(formatCurrency(totalPayment));
    $principal.text(formatCurrency(loanAmount));
    $effectiveRate.text(formatCurrency(loanAmount));
  }

  // Handle loan amount input (number input)
  $loanAmount.on("input", function () {
    let value = parseFloat($(this).val());

    // Ensure value is not negative
    if (value < 0) {
      $(this).val(0);
      value = 0;
    }

    // Auto-calculate on input
    calculateLoan();
  });

  // Update interest rate display
  function updateInterestDisplay() {
    const value = $interestRate.val();
    $interestValue.text(value + "%");
    calculateLoan();
  }

  // Handle interest rate slider
  $interestRate.on("input", function () {
    updateInterestDisplay();
  });

  // Handle repayment period input
  $repaymentPeriod.on("input", function () {
    let value = parseFloat($(this).val());

    // Ensure period is at least 1
    if (value < 1 && $(this).val() !== "") {
      $(this).val(1);
    }

    calculateLoan();
  });

  // Handle unit change
  $periodUnit.on("change", function () {
    calculateLoan();
  });

  // Handle calculate button click
  $calculateBtn.on("click", function (e) {
    e.preventDefault();
    calculateLoan();

    // Add a subtle animation effect
    $(this).addClass("calculating");
    setTimeout(() => {
      $(this).removeClass("calculating");
    }, 300);
  });

  // Handle loan amount blur - ensure proper formatting
  $loanAmount.on("blur", function () {
    let value = parseFloat($(this).val());
    if (isNaN(value) || value < 0) {
      $(this).val("");
      value = 0;
    }
    calculateLoan();
  });

  // Handle repayment period blur
  $repaymentPeriod.on("blur", function () {
    let value = parseFloat($(this).val());
    if (isNaN(value) || value < 1) {
      $(this).val("");
      calculateLoan();
    }
  });

  // Handle Enter key press on any input
  $("input, select").on("keypress", function (e) {
    if (e.which === 13) {
      e.preventDefault();
      calculateLoan();
    }
  });

  // Clear all fields (optional reset functionality)
  window.resetCalculator = function () {
    $loanAmount.val("");
    $repaymentPeriod.val("");
    $periodUnit.val("months");
    $interestRate.val(11);
    $interestValue.text("11.0%");

    // Clear summary
    $monthlyRepayment.text("0.00");
    $totalInterest.text("0.00");
    $totalPayable.text("0.00");
    $principal.text("0.00");
    $effectiveRate.text("0.00");

    // Update slider marks
    updateSliderMarks();
  };

  // Add custom styling for the slider marks
  const $slider = $(".interest-slider");
  const $marks = $(".slider-marks .mark");
  const accentColor =
    getComputedStyle(document.documentElement)
      .getPropertyValue("--accent-main")
      .trim() || "#ff0000";

  function updateSliderMarks() {
    const value = parseFloat($slider.val());
    const max = parseFloat($slider.attr("max"));

    $marks.each(function () {
      const markValue = parseFloat($(this).text());

      if (value >= markValue) {
        $(this).css("color", accentColor);
      } else {
        $(this).css("color", "#999");
      }
    });
  }

  $slider.on("input", updateSliderMarks);
  updateSliderMarks();

  // Initial calculation - only if values exist
  // Check if any inputs have values
  const hasInitialValues =
    $loanAmount.val() !== "" &&
    $repaymentPeriod.val() !== "" &&
    parseFloat($interestRate.val()) > 0;

  if (hasInitialValues) {
    calculateLoan();
  } else {
    // Clear summary fields initially
    $monthlyRepayment.text("0.00");
    $totalInterest.text("0.00");
    $totalPayable.text("0.00");
    $principal.text("0.00");
    $effectiveRate.text("0.00");
  }
});

// Location Section Functionality
jQuery(document).ready(function ($) {
  // Branch data for dynamic summary update
  const branchData = {
    "cardinal-otunga": {
      name: "Cardinal Otunga Branch",
      address: [
        "Cardinal Otunga Plaza",
        "Next to Holy Family Basilica,",
        "Kaunda Street, Nairobi",
      ],
      contact: {
        poBox: "P.O. Box 38721-00100 Nairobi, Kenya",
        phone: "+254771198565",
        email: "cardinal@unaitas.com",
      },
      hours: "Open until 5:00 PM",
    },
    kawangware: {
      name: "Kawangware Branch",
      address: ["Muhu Holdings house", "Along Naivasha Road"],
      contact: {
        poBox: "P.O. Box 123-00100 Nairobi, Kenya",
        phone: "+254712345678",
        email: "kawangware@unaitas.com",
      },
      hours: "Open until 5:00 PM",
    },
    thika: {
      name: "Thika Branch",
      address: ["Kwame Nkrumah Road", "Thika"],
      contact: {
        poBox: "P.O. Box 456-01000 Thika, Kenya",
        phone: "+254723456789",
        email: "thika@unaitas.com",
      },
      hours: "Open until 5:00 PM",
    },
    kasarani: {
      name: "Kasarani Branch",
      address: ["Kasarani Mwiki Rd", "300 Metres Off Thika Super Highway"],
      contact: {
        poBox: "P.O. Box 789-00200 Nairobi, Kenya",
        phone: "+254734567890",
        email: "kasarani@unaitas.com",
      },
      hours: "Open until 5:00 PM",
    },
    "temple-road": {
      name: "Temple Road Branch",
      address: ["Gatkim Plaza", "Temple Road, Nairobi"],
      contact: {
        poBox: "P.O. Box 321-00100 Nairobi, Kenya",
        phone: "+254745678901",
        email: "templeroad@unaitas.com",
      },
      hours: "Open until 5:00 PM",
    },
    kangari: {
      name: "Kangari Branch",
      address: ["Unaitas Building", "Kangari"],
      contact: {
        poBox: "P.O. Box 654-10200 Kangari, Kenya",
        phone: "+254756789012",
        email: "kangari@unaitas.com",
      },
      hours: "Open until 5:00 PM",
    },
    gatura: {
      name: "Gatura Branch",
      address: ["Unaitas Building", "Gatura"],
      contact: {
        poBox: "P.O. Box 987-10100 Gatura, Kenya",
        phone: "+254767890123",
        email: "gatura@unaitas.com",
      },
      hours: "Open until 5:00 PM",
    },
  };

  // Update location details summary
  function updateLocationSummary(branchKey) {
    const data = branchData[branchKey];
    if (!data) return;

    const $summary = $("#location-details-summary");

    // Build summary HTML
    const summaryHTML = `
      <div class="summary-content">
        <h3>${data.name}</h3>
        <div class="summary-address">
          ${data.address.map((line) => `<p>${line}</p>`).join("")}
        </div>
        <a href="#" class="directions-link" data-branch="${branchKey}">Get Directions</a>
        <div class="summary-contact">
          <p><strong>${data.contact.poBox}</strong></p>
          <p>${data.contact.phone}</p>
          <p>${data.contact.email}</p>
        </div>
        <div class="summary-hours">
          <span>${data.hours}</span>
        </div>
      </div>
    `;

    // Animate the update
    $summary.fadeOut(200, function () {
      $(this).html(summaryHTML);
      $summary.fadeIn(200);
    });
  }

  // Handle location item click
  $(".location-item").on("click", function () {
    const $this = $(this);
    const branchKey = $this.data("branch");

    // Remove active class from all items
    $(".location-item").removeClass("active");

    // Add active class to clicked item
    $this.addClass("active");

    // Update summary with branch details
    updateLocationSummary(branchKey);
  });

  // Handle search functionality
  $("#location-search").on("input", function () {
    const searchTerm = $(this).val().toLowerCase();

    $(".location-item").each(function () {
      const branchName = $(this).find(".branch-name").text().toLowerCase();
      const branchAddress = $(this)
        .find(".branch-address")
        .text()
        .toLowerCase();

      if (
        branchName.includes(searchTerm) ||
        branchAddress.includes(searchTerm)
      ) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });

  // Handle directions link click (delegated event)
  $(document).on("click", ".directions-link", function (e) {
    e.preventDefault();
    e.stopPropagation();

    const branchKey = $(this).data("branch");
    const branch = branchData[branchKey];

    if (branch) {
      // Encode address for Google Maps URL
      const address = branch.address.join(", ");
      const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
      window.open(mapsUrl, "_blank");
    }
  });

  // Handle book a chat button
  $(".site-btn-lg-accent").on("click", function (e) {
    const btnText = $(this).text();

    if (btnText === "Book A Chat") {
      // Open chat modal or redirect
      console.log("Opening chat...");
    } else if (btnText === "Find a Branch") {
      // Scroll to locations section
      e.preventDefault();
      $("#location-section").length &&
        $("html, body").animate(
          {
            scrollTop: $("#location-section").offset().top - 100,
          },
          500,
        );
    }
  });

  // Handle call us section interactions
  $(".card-extended .info").on("click", function () {
    // Handle phone or hours click
    console.log("Info clicked");
  });

  // Initialize with first branch active
  updateLocationSummary("cardinal-otunga");
});
