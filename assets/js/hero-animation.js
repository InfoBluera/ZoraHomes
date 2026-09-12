/**
 * ZORA HOMES — HERO LOGO SEQUENCE ANIMATOR
 * 229-Frame Image Sequence Controller with Canvas Rendering,
 * Auto-play on load, Interactive Hover Replay & Static Final Frame Persistence.
 */

class HeroLogoSequence {
  constructor(options = {}) {
    this.canvas = document.getElementById(options.canvasId || 'heroLogoCanvas');
    this.container = document.getElementById(options.containerId || 'heroLogoContainer');
    this.totalFrames = options.totalFrames || 229;
    this.fps = options.fps || 36; // ~6.3 seconds for 229 frames of fluid luxury motion
    this.framePathPattern = options.framePathPattern || 'assets/hero-section/ezgif-frame-';
    this.fallbackPathPattern = options.fallbackPathPattern || 'assets/heroSection/ezgif-frame-';
    
    this.frames = [];
    this.loadedFramesCount = 0;
    this.currentFrame = 0;
    this.isPlaying = false;
    this.animationFrameId = null;
    this.lastFrameTime = 0;
    this.frameInterval = 1000 / this.fps;
    
    if (!this.canvas || !this.container) return;
    this.ctx = this.canvas.getContext('2d', { alpha: true });

    this.init();
  }

  init() {
    this.setupCanvasDPI();
    this.preloadFrames();
    this.bindEvents();
  }

  setupCanvasDPI() {
    const dpr = window.devicePixelRatio || 1;
    const baseWidth = 576;
    const baseHeight = 606;
    
    this.canvas.width = baseWidth * dpr;
    this.canvas.height = baseHeight * dpr;
    this.ctx.scale(dpr, dpr);
    this.renderWidth = baseWidth;
    this.renderHeight = baseHeight;
  }

  getFrameUrl(index, useFallback = false) {
    const paddedIndex = String(index).padStart(3, '0');
    const base = useFallback ? this.fallbackPathPattern : this.framePathPattern;
    return `${base}${paddedIndex}.png`;
  }

  preloadFrames() {
    for (let i = 1; i <= this.totalFrames; i++) {
      const img = new Image();
      img.src = this.getFrameUrl(i);
      
      img.onload = () => {
        this.loadedFramesCount++;
        // If the first frame loaded, draw it immediately to avoid blank space
        if (i === 1 && !this.isPlaying && this.currentFrame === 0) {
          this.drawFrame(1);
        }
        // Once we have enough initial buffer (e.g. 10 frames), kick off auto-play
        if (this.loadedFramesCount === 10 && !this.hasAutoPlayed) {
          this.hasAutoPlayed = true;
          this.play();
        }
      };

      img.onerror = () => {
        // Fallback check
        img.src = this.getFrameUrl(i, true);
      };

      this.frames[i] = img;
    }

    // Safety fallback: if all loaded quickly or cached
    setTimeout(() => {
      if (!this.hasAutoPlayed) {
        this.hasAutoPlayed = true;
        this.play();
      }
    }, 400);
  }

  drawFrame(frameIndex) {
    if (!this.ctx) return;
    const clampedIndex = Math.max(1, Math.min(this.totalFrames, frameIndex));
    const img = this.frames[clampedIndex];

    if (img && img.complete && img.naturalWidth > 0) {
      this.ctx.clearRect(0, 0, this.renderWidth, this.renderHeight);
      
      // Calculate centered aspect ratio
      const imgAspect = img.naturalWidth / img.naturalHeight;
      const canvasAspect = this.renderWidth / this.renderHeight;
      let drawW, drawH, drawX, drawY;

      if (imgAspect > canvasAspect) {
        drawW = this.renderWidth;
        drawH = this.renderWidth / imgAspect;
        drawX = 0;
        drawY = (this.renderHeight - drawH) / 2;
      } else {
        drawH = this.renderHeight;
        drawW = this.renderHeight * imgAspect;
        drawX = (this.renderWidth - drawW) / 2;
        drawY = 0;
      }

      this.ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }
  }

  play() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.currentFrame = 1;
    this.lastFrameTime = performance.now();

    const animate = (now) => {
      if (!this.isPlaying) return;

      const elapsed = now - this.lastFrameTime;

      if (elapsed >= this.frameInterval) {
        this.drawFrame(this.currentFrame);
        this.currentFrame++;

        this.lastFrameTime = now - (elapsed % this.frameInterval);

        if (this.currentFrame > this.totalFrames) {
          // Playback completed: lock on final static frame
          this.currentFrame = this.totalFrames;
          this.drawFrame(this.totalFrames);
          this.isPlaying = false;
          if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
          }
          return;
        }
      }

      this.animationFrameId = requestAnimationFrame(animate);
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }

  replay() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.isPlaying = false;
    this.play();
  }

  bindEvents() {
    // Hover event on the logo container
    this.container.addEventListener('mouseenter', () => {
      this.replay();
    });

    // Touch interaction for mobile devices
    this.container.addEventListener('click', () => {
      this.replay();
    });

    // Optional 3D magnetic tilt micro-interaction
    this.container.addEventListener('mousemove', (e) => {
      const rect = this.container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const tiltX = (y / (rect.height / 2)) * -6;
      const tiltY = (x / (rect.width / 2)) * 6;
      
      this.canvas.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    this.container.addEventListener('mouseleave', () => {
      this.canvas.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });

    // Handle resize
    window.addEventListener('resize', () => {
      this.setupCanvasDPI();
      this.drawFrame(this.currentFrame || this.totalFrames);
    }, { passive: true });
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.zoraHeroAnimation = new HeroLogoSequence({
    canvasId: 'heroLogoCanvas',
    containerId: 'heroLogoContainer',
    totalFrames: 229,
    fps: 40 // 40fps for high-end cinematic smoothness (~5.7 seconds duration)
  });
});
