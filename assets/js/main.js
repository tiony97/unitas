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
