const imageSlider = {
  frame: document.querySelector('.main-frame'),
  slidesContainer: document.querySelector('.slides-container'),

  next() {
    this.display(this.getCurrentSlideIndex() + 1);
  },
  boundNext() {},
  previous() {
    this.display(this.getCurrentSlideIndex() - 1);
  },
  display(index) {
    this.boundResetInterval();
    let finalIndex = index;
    finalIndex = finalIndex < 0 ? this.getMaxIndex() : finalIndex;
    finalIndex = finalIndex > this.getMaxIndex() ? 0 : finalIndex;
    this.slidesContainerStyles.left = `calc(-${this.frameVW}vw * ${finalIndex})`;

    this.handleNavDots(finalIndex);
  },
  getCurrentContainerOffset() {
    return parseInt(getComputedStyle(this.slidesContainer).left, 10);
  },
  getCurrentSlideIndex() {
    // abs gives positive value if negative, round cause vw computation might not be exact
    return Math.round(Math.abs(this.getCurrentContainerOffset() / this.getFrameWidth()));
  },
  getFrameWidth() {
    return parseInt(getComputedStyle(this.frame).width, 10);
  },
  getMaxIndex() {
    return this.slidesContainer.children.length - 1;
  },
  getFrameVW() {
    return Math.round((this.getFrameWidth() / document.documentElement.clientWidth) * 100);
  },
  handleNavDots(current) {
    if (typeof current !== 'number') return;
    this.navDots.forEach((dot) => dot.classList.remove('current-dot'));
    this.navDots[current].classList.add('current-dot');
  },
  handleAction(event) {
    const { target } = event;
    if (!target.closest('.main-content')) return;

    if (target.classList.contains('left-arrow')) {
      imageSlider.previous();
      return;
    }
    if (target.classList.contains('right-arrow')) {
      imageSlider.next();
    }

    if (target.parentElement.classList.contains('navigation-dots')) {
      const parentArray = target.parentElement.children;
      this.display([...parentArray].indexOf(target));
    }
  },
  boundHandleAction() {},
  setInterval() {
    this.interval = window.setInterval(this.boundNext, 3000);
  },
  resetInterval() {
    window.clearInterval(this.interval);
    this.setInterval();
  },
  boundResetInterval() {},
  init() {
    this.slidesContainerStyles = this.slidesContainer.style;
    this.slidesContainerStyles.left = 0;
    this.navDots = document.querySelectorAll('.navigation-dots > *');
    this.navDots = [...this.navDots];
    this.handleNavDots(0);
    this.boundNext = this.next.bind(this);
    this.boundResetInterval = this.resetInterval.bind(this);
    this.boundHandleAction = this.handleAction.bind(this);
    this.frameVW = this.getFrameVW();
    this.setInterval();
    document.addEventListener('click', this.boundHandleAction);
  },
};

imageSlider.init();

// export { imageSlider }
