let buttons = document.querySelectorAll('.video-play-button');

for ( let button of buttons ) {
    button.addEventListener('click', function () {
        
        let wrapper = this.parentElement;
        let video = this.previousElementSibling;
        
        video.setAttribute('controls', true);
        video.play();
        this.classList.add('hide');
        
                
    });
}
