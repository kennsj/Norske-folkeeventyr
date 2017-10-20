// Animate in elements on the front page

var logo = document.querySelector('.logo')
var article_h2 = document.querySelector('article h2')
var article_p = document.querySelector('article p')
var tutorial = document.querySelector('.tutorial')
var button_start = document.querySelector('article button')
var article_divider = document.querySelector('.article-divider')

window.onload = function() {
	Velocity(logo, {
		opacity: 1,
		translateY: 0,
	}, {
		duration: 700,
		delay: 0
	})
	Velocity(article_divider, {
		opacity: 1,
		// translateY: '-35px'
	}, {
		duration: 200,
		delay: 300
	})
	Velocity(article_h2, {
		opacity: 1,
		translateY: 0,
	}, {
		duration: 700,
		delay: 600
	})
	Velocity(article_p, {
		opacity: 1,
		translateY: 0,
	}, {
		duration: 700,
		delay: 900
	})
	Velocity(tutorial, {
		opacity: 1,
		translateY: 0
	}, {
		duration: 700,
		delay: 1200
	})
	Velocity(button_start, {
		opacity: 1,
		translateY: 0
	}, {
		duration: 700,
		delay: 1500
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

// ADD SOUND TO HOVER EFFECT

var buttons = document.querySelectorAll('button')
var social_icons = document.querySelectorAll('.social-icon')
var sound_hover = document.querySelector('audio')
sound_hover.volume = 0.05

/*

button_start.addEventListener('mouseenter', function() {
	sound_hover.play()
})

*/



for (var i = 0; i < buttons.length; i++){
	buttons[i].addEventListener('mouseenter', function(){
		sound_hover.play()
	})
}

for (var i = 0; i < social_icons.length; i++){
	social_icons[i].addEventListener('mouseenter', function(){
		sound_hover.play()
	})
}

var popup = document.querySelector('.story-popup')
// var close = document.querySelector('.exit')
var close = document.querySelector('.close-button')

close.addEventListener('mouseover', function(){
	sound_hover.play()
})

close.addEventListener('mousedown', function(event) {

	event.preventDefault()

	Velocity(popup, {
		opacity: 0
	}, {
		duration: 100,
		delay: 0
	})
	setTimeout(function() {
		popup.classList.remove('show')
	}, 1000)

})
