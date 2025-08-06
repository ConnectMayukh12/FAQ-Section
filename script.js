$(document).ready(function () {
  // Check for saved theme preference or default to 'light'
  const savedTheme = localStorage.getItem("theme") || "light";

  // Apply the saved theme on page load
  applyTheme(savedTheme);

  // Function to apply theme
  function applyTheme(theme) {
    const $body = $("body");
    const $themeIcon = $("#theme-icon");
    const $themeText = $("#theme-text");

    if (theme === "dark") {
      $body.removeClass("light").addClass("dark");
      $themeIcon.removeClass("fa-moon").addClass("fa-sun");
      $themeText.text("Light Mode");
    } else {
      $body.removeClass("dark").addClass("light");
      $themeIcon.removeClass("fa-sun").addClass("fa-moon");
      $themeText.text("Dark Mode");
    }
  }

  // Theme toggle button click event
  $("#theme-toggle").on("click", function () {
    const currentTheme = $("body").hasClass("light") ? "light" : "dark";
    const newTheme = currentTheme === "light" ? "dark" : "light";

    // Apply the new theme
    applyTheme(newTheme);

    // Save theme preference to localStorage
    localStorage.setItem("theme", newTheme);

    // Add click animation effect
    $(this).addClass("clicked");
    setTimeout(() => {
      $(this).removeClass("clicked");
    }, 200);
  });

  // Accessibility Font Size Controls
  let accessibilityButtons = () => {
    let currentSize =
      parseFloat(localStorage.getItem("accessibility_size")) || 1.0;
    const incrementValue = 0.1;

    $("body").get(0).style.setProperty("--multi", currentSize);

    $(".zoom_in").click(function () {
      currentSize = Math.round((currentSize + incrementValue) * 10) / 10;

      $("body").get(0).style.setProperty("--multi", currentSize);
      localStorage.setItem("accessibility_size", currentSize);
    });

    $(".zoom_out").click(function () {
      if (currentSize == 1) return;

      currentSize = Math.round((currentSize - incrementValue) * 10) / 10;

      $("body").get(0).style.setProperty("--multi", currentSize);
      localStorage.setItem("accessibility_size", currentSize);
    });

    $(".zoom_normal").click(function () {
      currentSize = 1;
      $("body").get(0).style.setProperty("--multi", currentSize);
      localStorage.setItem("accessibility_size", currentSize);
    });
  };

  // Initialize accessibility buttons
  accessibilityButtons();

  // FAQ functionality
  $(".faq-question").on("click", function () {
    const targetId = $(this).attr("data-bs-target");
    const $targetAnswer = $(targetId);
    const $icon = $(this).find(".faq-icon i");
    const isActive = $(this).hasClass("active");

    // Close all other FAQ items
    $(".faq-question").each(function () {
      const $otherTarget = $($(this).attr("data-bs-target"));
      const $otherIcon = $(this).find(".faq-icon i");
      $(this).removeClass("active");
      $otherTarget.removeClass("active");
      $otherIcon.removeClass().addClass("fas fa-plus");
    });

    // Toggle clicked FAQ item
    if (!isActive) {
      $(this).addClass("active");
      $targetAnswer.addClass("active");
      $icon.removeClass().addClass("fas fa-times");
    }
  });

  // Animation fade-in observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          $(entry.target).css("animation-play-state", "running");
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  $(".fade-in").each(function () {
    observer.observe(this);
  });
});
