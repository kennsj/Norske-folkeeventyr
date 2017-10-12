
var load_left = document.querySelector('.load-left-bg')
var load_right = document.querySelector('.load-right-bg')
var loader = document.querySelector('.loading')

setTimeout(function(){
    loader.classList.add('fade-out')
    setTimeout(function(){
        load_left.classList.add('slide-left', 'fade-out')
        load_right.classList.add('slide-right', 'fade-out')
        setTimeout(function(){
            document.querySelector('.preloader').style.display = 'none'
        }, 1000)
    }, 500)
}, 1000)


var popup = document.querySelector('.story-popup')
var close = document.querySelector('.exit')

close.addEventListener('mousedown', function(event){
    event.preventDefault()
    console.log('work');
    popup.classList.remove('show').velocity({
        duration: '1s'
    }, {
        delay: 500
    })
})
