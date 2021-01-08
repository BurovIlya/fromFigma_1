function changeChildImages(count) {
  let position = -step*count;
  imagesContainer.style.left = position + 'px';
  title.innerHTML = images[count].getAttribute('title'); 
}
    
function start() {
   if ( images.length > 1 ) {
     arrowRight.classList.add('active');
     changeChildImages(count);
   }
    
   else {
     title.innerHTML = images[count].getAttribute('title'); 
     return;
   }
}    
    
    
const control = document.querySelector('.child-avatar-slider');
const arrowLeft = control.querySelector('div[data-name="left"]');
const arrowRight = control.querySelector('div[data-name="right"]');
const parentBlock = control.parentElement;
const imagesContainer = parentBlock.querySelector('.child-avatar-inner');
const title = control.querySelector('p');
let images = imagesContainer.children;
const step = parentBlock.clientWidth;

let count = 0;
   
start();

control.addEventListener('click', function(event) {
    
    let target = event.target;
    
      if( !target.classList.contains('arrows') ) {
        return;
      }
    
      let direction = target.getAttribute('data-name');
        
      switch(direction){
            
        case 'left':
            
          if ( count == 0 ){
            return;
          }
          
          if ( count == 1 ){
            target.classList.remove('active');
          }
          
          if (!arrowRight.classList.contains('active')) {
            arrowRight.classList.add('active');
      }
          
          count--;
          changeChildImages(count);
                
                
            
        break;
            
        case 'right':
        
            if ( count == images.length - 1 ) {
                return;
            }
            
            if ( count == images.length - 2 ) {
                target.classList.remove('active');
            }
            
            if (!arrowLeft.classList.contains('active')) {
                arrowLeft.classList.add('active');
            }
            
            count++;
            changeChildImages(count);
            
        break;
            
        }
    
    
    });
    


