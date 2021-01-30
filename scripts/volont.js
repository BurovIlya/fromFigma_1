function changeProgs(ind, st){
       
       let pos = -st * ind;
       
       wrapper.style.left = pos + 'px';
       let blockHeight = sections[ind].clientHeight;
       container.style.height = blockHeight + 'px';
       
       if(window.pageYOffset > 0) {
          window.scrollTo(0,0);
       }
   }
    
    let fields = document.querySelectorAll('.other-input');
    //alert(fields.length);
    for ( let field of fields ) {
        let prevElem = field.previousElementSibling;
        let myCheck = prevElem.querySelector('input[type="checkbox"]');
        let myInput = field.querySelector('input[type="text"]');
        
        myCheck.onclick = function(){
            
            if( this.checked ) {
                myInput.removeAttribute('disabled');
                myInput.focus();
            }
            else {
                myInput.setAttribute('disabled', 'disabled');
            }
            
        };
        
        
        
    }
    
    
   
   let container = document.querySelector('#volonters-form > .volonters-form-wrapper');
   let wrapper = container.firstElementChild;
   let sections = container.querySelectorAll('.form-part');
      
   const step = container.clientWidth;
   
   let index = 0;
   
   changeProgs(index, step);
   
   let forwardElems = wrapper.querySelectorAll('div[data-direct="forward"]');
   
   for( let elem of forwardElems ) {
    
      elem.addEventListener('click', function() {
        index++;
        changeProgs(index, step);
      })
    
   }
   
   let backElems = wrapper.querySelectorAll('a[data-direct="back"]');
   
   for( let elem of backElems ) {
    
      elem.addEventListener('click', function(evt) {
        
        evt.preventDefault();
        index--;
        changeProgs(index, step);
      })
    
   }
   
   
   
    
