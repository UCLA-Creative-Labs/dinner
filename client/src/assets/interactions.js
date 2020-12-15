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

function slideshow(){
  
}
_AFRAME.registerComponent('slideshow', {
  schema: {
    project : {type: 'string', default: 'project1'}
  },
  init: function () {
    console.log("yeet")
    var lastIndex = -1;
    var projectSlides = {
      "project1": ["1.jpg", "2.jpg"],
      "project2": ["1.jpg", "2.jpg"],
      "project3": ["1.jpg", "2.jpg"],
    }
    var slides = projectSlides[this.data.project];
    var project = this.data.project;
    var t;
    this.el.addEventListener('mouseenter', function (evt) {
        lastIndex = (lastIndex + 2) % slides.length;
        this.setAttribute('src', `assets/images/${project}/${slides[lastIndex]}`);
        t = setInterval(() => {
        lastIndex = (lastIndex + 1) % slides.length;
        this.setAttribute('src', `assets/images/${project}/${slides[lastIndex]}`);
      }, 2000)
    });

    this.el.addEventListener('mouseleave', function (evt) {
      clearTimeout(t);
  });
  }
});