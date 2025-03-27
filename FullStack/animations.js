// Add this to your existing index.js file
document.addEventListener('DOMContentLoaded', () => {
    // Create animated background
    const bgContainer = document.createElement('div');
    bgContainer.classList.add('animated-bg');
    document.body.insertBefore(bgContainer, document.body.firstChild);
  
    // Add floating shapes
    function createFloatingShapes() {
      for (let i = 0; i < 10; i++) {
        const shape = document.createElement('div');
        shape.classList.add('shape');
        
        // Randomize shape properties
        shape.style.width = `${Math.random() * 100 + 20}px`;
        shape.style.height = shape.style.width;
        shape.style.top = `${Math.random() * 100}%`;
        shape.style.left = `${Math.random() * 100}%`;
        shape.style.animationDelay = `${Math.random() * 5}s`;
        
        bgContainer.appendChild(shape);
      }
    }
  
    createFloatingShapes();
  });   