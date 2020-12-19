/* eslint-disable no-undef, no-unused-vars */
const _AFRAME = AFRAME; // so that ESLint doesn't complain about AFRAME being undefined

function slideshow() {}
_AFRAME.registerComponent('slideshow', {
  schema: {
    project: { type: 'string', default: 'project1' },
  },
  init: function () {
    var lastIndex = -1;
    var projectSlides = {
      project1: ['1.png', '2.png', '3.png'],
      project2: [
        'slides-01.png',
        'slides-02.png',
        'slides-03.png',
        'slides-04.png',
        'slides-06.png',
        'slides-07.png',
        'slides-08.png',
        'slides-09.png',
      ],
      project3: ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '9.jpg', 'demo.mp4'],
    };

    var slides = projectSlides[this.data.project];
    var project = this.data.project;
    var t;
    this.el.addEventListener('mouseenter', function (evt) {
      lastIndex = (lastIndex + 2) % slides.length;
      this.setAttribute('src', `assets/images/${project}/${slides[lastIndex]}`);
      t = setInterval(() => {
        if (slides[lastIndex].includes('.mp4')){
          return;
        }
        lastIndex = (lastIndex + 1) % slides.length;
        this.setAttribute(
          'src',
          `assets/images/${project}/${slides[lastIndex]}`,
        );
      }, 3000);
    });

    this.el.addEventListener('mouseleave', function (evt) {
      clearTimeout(t);
    });
  },
});
