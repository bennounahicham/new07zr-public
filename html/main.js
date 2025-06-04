document.addEventListener('DOMContentLoaded', function () {
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdownParent = document.querySelector('.dropdown');
  const dropdownMenu = document.querySelector('.dropdown-menu');

  // Toggle dropdown when clicking the toggle button
  dropdownToggle?.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    dropdownParent.classList.toggle('active');
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', function (e) {
    // If click is outside the dropdown
    if (dropdownParent?.contains && !dropdownParent.contains(e.target)) {
      dropdownParent.classList.remove('active');
    }
  });

  // Prevent dropdown from closing when clicking inside it
  dropdownMenu?.addEventListener('click', function (e) {
    e.stopPropagation();
  });
  
  // Handle the infinite marquee animation
  const workshops = document.querySelector('.workshops');
  if (workshops) {
    function adjustMarqueeSpeed() {
      // Adjust speed based on screen size
      const speed = window.innerWidth < 768 ? '20s' : '30s';
      workshops.style.animationDuration = speed;
      
      // Make sure we have enough logos for a seamless loop
      const firstSetCount = workshops.children.length / 2;
      
      // Check if we need more items to ensure smooth animation
      if (firstSetCount < 6) {
        console.warn("For best results, provide at least 6 workshop logos");
      }
    }
    
    // Initial setup
    adjustMarqueeSpeed();
    
    // Update on window resize
    window.addEventListener('resize', adjustMarqueeSpeed);
  }
  
  // Handle brand slider animation
  const brandsSlider = document.querySelector('.brands-slider');
  if (brandsSlider) {
    function adjustBrandsSlider() {
      // Adjust animation speed based on screen size
      if (window.innerWidth < 768) {
        brandsSlider.style.animationDuration = '25s';
      } else {
        brandsSlider.style.animationDuration = '0s'; // No animation on desktop
      }
    }
    
    // Initial setup
    adjustBrandsSlider();
    
    // Update on window resize
    window.addEventListener('resize', adjustBrandsSlider);
  }
  
  // Mobile hamburger menu functionality
  const hamburgerBtn = document.querySelector('.hamburger-menu');
  const mobileNav = document.querySelector('.mobile-nav');
  
  if (hamburgerBtn && mobileNav) {
    hamburgerBtn.addEventListener('click', function() {
      hamburgerBtn.classList.toggle('open');
      mobileNav.classList.toggle('open');
      
      // Prevent body scrolling when menu is open
      document.body.classList.toggle('no-scroll', mobileNav.classList.contains('open'));
    });
    
    // Close mobile menu when clicking on a nav item
    const mobileNavLinks = mobileNav.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburgerBtn.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.classList.remove('no-scroll');
      });
    });
  }
  
  // Add resize handler to close mobile menu on desktop view
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && mobileNav?.classList.contains('open')) {
      hamburgerBtn?.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.classList.remove('no-scroll');
    }
  });
});