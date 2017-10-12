$.fn.parallax = function (resistance, mouse) {
    $el = $(this);
    TweenLite.to($el, 0.2, {
        x: -((mouse.clientX - (window.innerWidth / 2)) / resistance),
        y: -((mouse.clientY - (window.innerHeight / 2)) / resistance)
    });

};

// Hover parallax - home



// Hover parallax - article

$(document).mousemove(function (e) {
    $('h1').parallax(250, e)
    $('p').parallax(-250, e)
    $('.grid').parallax(200, e)
    $('.imgOne, .imgTwo, .imgThree, .imgFour, .imgFive').parallax(80, e)
    $('.img-parallax').parallax(180, e)
})
