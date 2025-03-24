// Initialize Lottie animation when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load the animation
    const animationContainer = document.getElementById('lottieAnimation');
    
    // You can replace this URL with any Lottie JSON animation file
    // This is an example animation of students/education theme
    const animationPath = 'https://assets5.lottiefiles.com/packages/lf20_zw0djhar.json';
    
    // Alternative animations you could use:
    // const animationPath = 'https://assets7.lottiefiles.com/packages/lf20_49rdyysj.json'; // Calendar events
    // const animationPath = 'https://assets2.lottiefiles.com/private_files/lf30_p2u7ccss.json'; // Community
    
    const anim = lottie.loadAnimation({
        container: animationContainer,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: animationPath,
    });
    
    // Optional: Add interactivity
    animationContainer.addEventListener('mouseenter', function() {
        anim.setSpeed(1.5); // Speed up on hover
    });
    
    animationContainer.addEventListener('mouseleave', function() {
        anim.setSpeed(1); // Return to normal speed
    });
});

// Add to your script.js file
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll animations
    initScrollAnimations();
    
    // Set up smooth scrolling for all navigation links
    setupSmoothScrolling();
  });
  
  function setupSmoothScrolling() {
    // Get all links that have hash (#) in them
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        // Only process if the link actually points to an element on the page
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          
          // Add active class to clicked link and remove from siblings
          const navLinks = document.querySelectorAll('.md\\:flex a');
          navLinks.forEach(navLink => {
            navLink.classList.remove('text-custom', 'border-custom', 'border-b-2');
            navLink.classList.add('text-gray-500');
          });
          
          this.classList.remove('text-gray-500');
          this.classList.add('text-custom', 'border-custom', 'border-b-2');
          
          // Scroll to the target element
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
  
  function initScrollAnimations() {
    // Add the animation-hidden class to elements we want to animate
    const animatedElements = document.querySelectorAll('.testimonial-grid > div, .key-feature');
    animatedElements.forEach(el => {
      el.classList.add('animation-hidden');
    });
    
    // Set up the Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add animation-visible class when element becomes visible
          entry.target.classList.add('animation-visible');
          // Once animation is complete, stop observing this element
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1 // Trigger when at least 10% of the element is visible
    });
    
    // Start observing all animated elements
    animatedElements.forEach(el => {
      observer.observe(el);
    });
  }
  // Add to your script.js file
document.addEventListener('DOMContentLoaded', function() {
    // Initialize scroll animations
    initScrollAnimations();
    
    // Set up smooth scrolling for all navigation links
    setupSmoothScrolling();
  });
  
  function setupSmoothScrolling() {
    // Get all links that have hash (#) in them
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        // Only process if the link actually points to an element on the page
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          
          // Add active class to clicked link and remove from siblings
          const navLinks = document.querySelectorAll('.md\\:flex a');
          navLinks.forEach(navLink => {
            navLink.classList.remove('text-custom', 'border-custom', 'border-b-2');
            navLink.classList.add('text-gray-500');
          });
          
          this.classList.remove('text-gray-500');
          this.classList.add('text-custom', 'border-custom', 'border-b-2');
          
          // Scroll to the target element
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
  
  function initScrollAnimations() {
    // Add the animation-hidden class to elements we want to animate
    const animatedElements = document.querySelectorAll('.testimonial-grid > div, .key-feature');
    animatedElements.forEach(el => {
      el.classList.add('animation-hidden');
    });
    
    // Set up the Intersection Observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add animation-visible class when element becomes visible
          entry.target.classList.add('animation-visible');
          // Once animation is complete, stop observing this element
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1 // Trigger when at least 10% of the element is visible
    });
    
    // Start observing all animated elements
    animatedElements.forEach(el => {
      observer.observe(el);
    });
  }
  // Login form handling
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
      loginForm.addEventListener('submit', async function(e) {
          e.preventDefault();
          
          const submitBtn = document.getElementById('loginSubmit');
          const loader = document.getElementById('loginLoader');
          submitBtn.disabled = true;
           loader.classList.remove('hidden');

          const formData = new FormData(loginForm);
          const data = {
              email: formData.get('email'),
              password: formData.get('password')
          };

          try {
              const response = await fetch('http://localhost:3000/api/login', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(data)
              });
              const result = await response.json();

              loader.classList.add('hidden');
              submitBtn.disabled = false;

              if (result.success) {
                  // Show success modal
                  const successModal = document.getElementById('loginSuccessModal');
                  successModal.classList.remove('hidden');
                  successModal.classList.add('active');

                  // Redirect after 2 seconds or on button click
                  setTimeout(redirectUser, 2000, result.role);
                  document.getElementById('loginSuccessClose').addEventListener('click', () => redirectUser(result.role));
              } else {
                  alert(result.message || 'Login failed');
              }
          } catch (error) {
              console.error('Login error:', error);
              loader.classList.add('hidden');
              submitBtn.disabled = false;
              alert('An error occurred. Please try again.');
          }
      });
  }
});

function redirectUser(role) {
  if (role === 'organizer') {
      window.location.href = 'organizer-dashboard.html';
  } else if (role === 'participant') {
      window.location.href = 'participant-events.html';
  }
}