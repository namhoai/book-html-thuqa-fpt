$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        loop:true,
      margin:30,
      nav: true,
      center: true,
      responsive:{
          0:{
              items:1
          },
          600:{
              items:2
          },
          1000:{
              items:3
          }
      }
    });
  });

  // $(".more").toggle(function() {
  //   $(this).text("less..").siblings(".complete").show();
  // }, function() {
  //   $(this).text("more..").siblings(".complete").hide();
  // });

  let mybutton = document.getElementById("btn-back-to-top");
  
  window.onscroll = function () {
    scrollFunction();
  };
  
  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.style.display = "block";
    } else {
      mybutton.style.display = "none";
    }
  }

  mybutton.addEventListener("click", backToTop);
  
  function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
