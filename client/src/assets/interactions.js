/* eslint-disable no-undef, no-unused-vars */
const _AFRAME = AFRAME; // so that ESLint doesn't complain about AFRAME being undefined
console.log("loading interactions")
_AFRAME.registerComponent('cursor-listener', {
  init: function () {
    var lastIndex = -1;
    var COLORS = ['red', 'green', 'blue'];
    this.el.addEventListener('mouseenter', function (evt) {
      lastIndex = (lastIndex + 1) % COLORS.length;
      this.setAttribute('material', 'color', COLORS[lastIndex]);
      console.log('I was clicked at: ', evt.detail.intersection.point);
    });
  }
});

_AFRAME.registerComponent('slideshow', {
  init: function () {
    var lastIndex = -1;
    var slides = ["1.jpg", "2.jpg"];
    var t;
    this.el.addEventListener('mouseenter', function (evt) {
      console.log("entered")
        t = setInterval(() => {
        lastIndex = (lastIndex + 1) % slides.length;
        this.setAttribute('src', "assets/images/" + slides[lastIndex]);
      }, 5000)
    });

    this.el.addEventListener('mouseleave', function (evt) {
      console.log('left')
      clearTimeout(t);
  });
  }
});