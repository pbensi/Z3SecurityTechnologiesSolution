class CircularDots {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            count: options.count || 3,
            duration: options.duration || 5000,
            activeIndex: options.activeIndex || 0,
            onDotClick: options.onDotClick || null,
            onProgressComplete: options.onProgressComplete || null,
            ...options
        };

        this.state = {
            activeIndex: this.options.activeIndex,
            animationFrame: null,
            startTime: null,
            isAnimating: false
        };

        this.CIRCUMFERENCE = 57;

        this.init();
    }

    init() {
        if (!this.container) {
            console.error('CircularDots: Container element not provided');
            return;
        }

        this.generateDots();
        this.setupEventListeners();
        this.setActiveDot(this.state.activeIndex, true);
    }

    generateDots() {
        this.container.innerHTML = '';

        for (let i = 0; i < this.options.count; i++) {
            const dot = document.createElement('button');
            dot.className = 'circular-dot';
            dot.setAttribute('data-index', i);
            dot.setAttribute('aria-label', `Go to item ${i + 1}`);
            
            dot.innerHTML = `
                <svg class="circular-dot-progress" viewBox="0 0 25 25">
                    <!-- Radius 9 for 25px container -->
                    <circle class="circular-dot-progress-bg" cx="12.5" cy="12.5" r="9"></circle>
                    <circle class="circular-dot-progress-fill" cx="12.5" cy="12.5" r="9"></circle>
                </svg>
                <span class="circular-dot-indicator"></span>
            `;
            
            this.container.appendChild(dot);
        }
    }

    setupEventListeners() {
        this.container.addEventListener('click', (e) => {
            const dot = e.target.closest('.circular-dot');
            if (dot) {
                const index = parseInt(dot.getAttribute('data-index'));
                
                if (index === this.state.activeIndex) {
                    return;
                }
                
                this.stopAnimation();
                this.setActiveDot(index);
                
                if (this.options.onDotClick) {
                    this.options.onDotClick(index);
                }
            }
        });
    }

    setActiveDot(index, immediate = false) {
        const dots = this.container.querySelectorAll('.circular-dot');
        
        dots.forEach(dot => {
            dot.classList.remove('active');
            const progress = dot.querySelector('.circular-dot-progress-fill');
            if (progress) {
                progress.style.strokeDashoffset = `${this.CIRCUMFERENCE}`;
                progress.style.transition = 'none';
            }
        });

        if (dots[index]) {
            dots[index].classList.add('active');
            this.state.activeIndex = index;

            if (!immediate) {
                this.startAnimation(dots[index]);
            } else {
                const progress = dots[index].querySelector('.circular-dot-progress-fill');
                if (progress) {
                    progress.style.strokeDashoffset = '0';
                    progress.style.transition = 'none';
                }
            }
        }
    }

    startAnimation(dot) {
        this.stopAnimation();
        
        const progress = dot.querySelector('.circular-dot-progress-fill');
        if (!progress) return;

        progress.style.transition = 'none';
        progress.style.strokeDashoffset = `${this.CIRCUMFERENCE}`;

        progress.offsetHeight;

        this.state.startTime = Date.now();
        this.state.isAnimating = true;

        const animate = () => {
            if (!this.state.isAnimating) return;

            const elapsed = Date.now() - this.state.startTime;
            const progressAmount = Math.min(elapsed / this.options.duration, 1);
            
            const dashoffset = this.CIRCUMFERENCE - (this.CIRCUMFERENCE * progressAmount);
            progress.style.strokeDashoffset = `${dashoffset}`;
            
            if (progressAmount < 1) {
                this.state.animationFrame = requestAnimationFrame(animate);
            } else {
                this.state.isAnimating = false;
                this.state.animationFrame = null;
                if (this.options.onProgressComplete) {
                    this.options.onProgressComplete(this.state.activeIndex);
                }
            }
        };
        
        this.state.animationFrame = requestAnimationFrame(animate);
    }

    stopAnimation() {
        this.state.isAnimating = false;
        if (this.state.animationFrame) {
            cancelAnimationFrame(this.state.animationFrame);
            this.state.animationFrame = null;
        }
    }

    restartAnimation() {
        const dots = this.container.querySelectorAll('.circular-dot');
        const activeDot = dots[this.state.activeIndex];
        if (activeDot && activeDot.classList.contains('active')) {
            this.startAnimation(activeDot);
        }
    }

    next() {
        this.stopAnimation();
        const nextIndex = (this.state.activeIndex + 1) % this.options.count;
        this.setActiveDot(nextIndex);
        return nextIndex;
    }

    prev() {
        this.stopAnimation();
        const prevIndex = (this.state.activeIndex - 1 + this.options.count) % this.options.count;
        this.setActiveDot(prevIndex);
        return prevIndex;
    }

    updateCount(newCount) {
        this.stopAnimation();
        this.options.count = newCount;
        this.generateDots();
        this.setActiveDot(0, true);
    }

    updateDuration(newDuration) {
        this.stopAnimation();
        this.options.duration = newDuration;
        this.restartAnimation();
    }

    destroy() {
        this.stopAnimation();
        if (this.container) {
            this.container.innerHTML = '';
        }
    }
}

export { CircularDots };