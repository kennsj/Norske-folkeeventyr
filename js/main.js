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

close.addEventListener('mousedown', function(event){

    event.preventDefault()
    popup.classList.remove('show')

})



// Transition home – 3D

var section = document.querySelector('section')
