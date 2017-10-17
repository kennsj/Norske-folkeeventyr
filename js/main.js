// Animate in elements on the front page

var logo = document.querySelector('.logo')
var article_h2 = document.querySelector('article h2')
var article_p = document.querySelector('article p')
var tutorial = document.querySelector('.tutorial')
var button_start = document.querySelector('article button')

window.onload = function() {
	Velocity(logo, {
		opacity: 1,
		translateY: 0,
	}, {
        duration: 700,
        delay: 0
    })
    Velocity(article_h2, {
        opacity: 1,
        translateY: 0,
    }, {
        duration: 700,
        delay: 300
    })
    Velocity(article_p, {
        opacity: 1,
        translateY: 0,
    }, {
        duration: 700,
        delay: 600
    })
    Velocity(tutorial, {
        opacity: 1,
        translateY: 0
    }, {
        duration: 700,
        delay: 900
    })
    Velocity(button_start, {
        opacity: 1,
        translateY: 0
    }, {
        duration: 700,
        delay: 1200
    })
}

/*
var load_left = document.querySelector('.load-left-bg')
var load_right = document.querySelector('.load-right-bg')
var loader = document.querySelector('.loading')

function loader(){

    // loader.classList.add('fade-out')

    setTimeout(function(){
        Velocity(load_left, {
            translateX: '-50vw',
            duration: '2s'
        })
        setTimeout(function(){
            document.querySelector('.preloader').style.display = 'none'
        }, 1000)
    }, 500)
}
*/

var popup = document.querySelector('.story-popup')
var close = document.querySelector('.exit')

close.addEventListener('mousedown', function(event) {

	event.preventDefault()
	console.log('work');
	popup.classList.remove('show')

})
