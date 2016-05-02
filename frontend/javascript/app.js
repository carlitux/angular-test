import $ from 'jquery';
import foundation from 'foundation';
import slick from 'slick';
import fancybox from 'fancybox';
import pwstrength from 'pwstrength';

import app from './angular-app';


// Theme object

class Theme {

  constructor () {
    this.init();
    this.sliderInit();
  }

  init () {
    $(document).foundation();
    $('#password-registration').pwstrength({
      common: {
        onKeyUp: function (evt, data) {
          console.log(data);
          $('#strengh-indicator').html(data.verdictText);
        }
      },
      ui: {
        showProgressBar: false
      }
    });

    $(".fancybox").fancybox();
  }

  sliderInit () {
    $("#slider_home_search").slick({
      centerMode: false,
      vertical: false,
      pauseOnHover: false,
      slidesToShow: 1,
      slideToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 4000,
      dots: false,
      fade: true,
      centerPadding: '0px'
    });

    $("#slider_home_featured").slick({
      centerMode: false,
      vertical: false,
      pauseOnHover: true,
      slidesToShow: 1,
      slideToScroll: 1,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 4000,
      dots: false,
      fade: false,
      centerPadding: '0px'
    });

    $("#slider_home_car_day").slick({
      centerMode: false,
      vertical: false,
      pauseOnHover: true,
      slidesToShow: 5,
      slideToScroll: 5,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 4000,
      dots: false,
      fade: false,
      centerPadding: '0px',
      responsive: [
        {
          breakpoint: 1000,
          settings: {
            vertical: false,
            centerMode: false,
            slidesToShow: 4,
            slideToScroll: 1,
            arrows: true,
            dots: false,
            centerPadding: '0px'
          }
        }, {
          breakpoint: 840,
          settings: {
            vertical: false,
            centerMode: false,
            slidesToShow: 3,
            slideToScroll: 1,
            arrows: true,
            dots: false,
            centerPadding: '0px'
          }
        }, {
          breakpoint: 768,
          settings: {
            vertical: false,
            centerMode: false,
            slidesToShow: 2,
            slideToScroll: 1,
            arrows: true,
            dots: false,
            centerPadding: '0px'
          }
        }, {
          breakpoint: 640,
          settings: {
            vertical: false,
            centerMode: false,
            slidesToShow: 1,
            slideToScroll: 1,
            arrows: true,
            dots: false,
            centerPadding: '0px'
          }
        }
      ]
    });

    $("#slider_car_preview").slick({
      centerMode: false,
      vertical: false,
      pauseOnHover: false,
      slidesToShow: 1,
      slideToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 4000,
      dots: true,
      fade: false,
      centerPadding: '0px'
    });
  }
}


new Theme();
