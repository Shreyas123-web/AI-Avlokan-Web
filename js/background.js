// Premium Deep-Space Particle Field Background
(function() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { alpha: true });
  
  // Style and inject canvas
  canvas.id = 'global-starfield';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none';
  document.body.prepend(canvas);

  let width, height;
  let particles = [];
  let shootingStars = [];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // UPGRADE: Smooth mouse tracking for 3D parallax
  let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  
  window.addEventListener('mousemove', (e) => {
    if (prefersReducedMotion) return;
    // Calculate mouse offset from center
    mouse.targetX = (e.clientX - width / 2) * 0.05;
    mouse.targetY = (e.clientY - height / 2) * 0.05;
  });

  // Colors based on theme
  function getThemeColors() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    return isLight ? [
      '#64748b', // darker slate
      '#0284c7', // darker cyan
      '#0369a1', // deeper cyan
      '#ca8a04', // darker gold
      '#6d28d9'  // darker violet
    ] : [
      '#ffffff', // white
      '#22d3ee', // cyan
      '#0ea5e9', // deep cyan
      '#facc15', // gold
      '#8b5cf6'  // violet
    ];
  }

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
  }

  function initParticles() {
    particles = [];
    // Increased density slightly for a richer field
    const particleCount = Math.floor((width * height) / 800); 
    
    for (let i = 0; i < particleCount; i++) {
      // Exploding from bottom-left corner bias, smoothed out slightly
      const x = Math.pow(Math.random(), 2) * width; 
      const y = height - Math.pow(Math.random(), 2) * height;
      
      // UPGRADE: Added Z-depth for 3D parallax and scaling
      const z = Math.random(); 
      const size = Math.random() > 0.95 ? (Math.random() * 2 + 1.5) * z : (Math.random() * 1.2 + 0.3) * z;
      const colorIndex = Math.floor(Math.random() * 5);
      
      particles.push({
        x, y, z, size, colorIndex,
        baseAlpha: Math.random() * 0.5 + 0.1,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        isGlow: size > 1.5,
        // Closer particles (higher z) move faster
        vx: (Math.random() - 0.2) * 0.4 * (z + 0.5), 
        vy: (Math.random() - 0.8) * 0.4 * (z + 0.5)  
      });
    }
  }

  function spawnShootingStar() {
    if (prefersReducedMotion || document.visibilityState === 'hidden') return;
    
    // Start from bottom-left region
    const startY = height - (Math.random() * height * 0.4);
    const startX = Math.random() * width * 0.4;
    
    shootingStars.push({
      x: startX,
      y: startY,
      length: Math.random() * 150 + 100, // longer tail
      speed: Math.random() * 15 + 10,    // faster snap
      angle: (-Math.PI / 4) + (Math.random() * 0.2 - 0.1), // Up and to the right
      life: 1,
      decay: Math.random() * 0.015 + 0.008
    });

    // Randomize next spawn (2-6s)
    setTimeout(spawnShootingStar, Math.random() * 4000 + 2000);
  }

  function draw() {
    if (document.visibilityState === 'hidden') {
      requestAnimationFrame(draw);
      return;
    }

    ctx.clearRect(0, 0, width, height);
    
    // Smooth out mouse interpolation for fluid parallax
    mouse.x += (mouse.targetX - mouse.x) * 0.08;
    mouse.y += (mouse.targetY - mouse.y) * 0.08;

    const time = Date.now();
    const currentColors = getThemeColors();
    
    // Draw particles
    particles.forEach(p => {
      let alpha = p.baseAlpha;
      
      if (!prefersReducedMotion) {
        // Move particles
        p.x += p.vx;
        p.y += p.vy;
        
        // Wrap around screen seamlessly
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        if (p.isGlow) {
          alpha = p.baseAlpha + Math.sin(p.twinklePhase + time * p.twinkleSpeed) * 0.4;
          alpha = Math.max(0.1, Math.min(1, alpha));
        }
      }

      // UPGRADE: Calculate parallax position based on Z-depth
      const renderX = p.x - (mouse.x * p.z);
      const renderY = p.y - (mouse.y * p.z);

      ctx.fillStyle = currentColors[p.colorIndex];
      
      // UPGRADE: High-performance fake glow (No expensive shadowBlur)
      if (p.isGlow && !prefersReducedMotion) {
        ctx.globalAlpha = alpha * 0.3;
        ctx.beginPath();
        ctx.arc(renderX, renderY, p.size * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Core particle
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.arc(renderX, renderY, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw shooting stars
    if (!prefersReducedMotion) {
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const star = shootingStars[i];
        
        const endX = star.x - Math.cos(star.angle) * star.length;
        const endY = star.y - Math.sin(star.angle) * star.length;

        // Draw trail
        const grad = ctx.createLinearGradient(star.x, star.y, endX, endY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${star.life})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(endX, endY);
        ctx.stroke();

        // UPGRADE: Draw glowing head of the shooting star
        ctx.fillStyle = `rgba(255, 255, 255, ${star.life})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Update position
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;
        star.life -= star.decay;

        if (star.life <= 0) {
          shootingStars.splice(i, 1);
        }
      }
    }

    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => {
    // Debounce resize
    clearTimeout(window.resizeTimer);
    window.resizeTimer = setTimeout(resize, 200);
  });

  resize();
  draw();
  setTimeout(spawnShootingStar, 2000);
})();
