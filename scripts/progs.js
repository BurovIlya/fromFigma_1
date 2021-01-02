  function changeProgs(ind, st){
       
       logo.src = logotips[ind];
       
       progTitle.innerText = progNames[ind];
       
       if ( ind == 0 ) {
          progPrevLabel.innerText = progNames[progNames.length - 1];
       }
       
       else {
          progPrevLabel.innerText = progNames[ind - 1];
       }
       
       if ( ind == progNames.length - 1 ) {
          progNextLabel.innerText = progNames[0];
       }
       
       else {
          progNextLabel.innerText = progNames[ind + 1];
       }
       
       let pos = -st * ind;
       
       wrapper.style.left = pos + 'px';
       let blockHeight = sections[ind].clientHeight;
       container.style.height = blockHeight + 'px';
       
       
   }
  
  
   let prog1 = document.getElementById('programms');
   
   let logotips = ['prog_svetl.png', 'prog_handhelp.png', 'prog_chitaika.png', 'prog_mother.png'];
   
   let path = '../images/';
   
   logotips.forEach(function(logo, ind, arr){
      arr[ind] = path + arr[ind];
   });
   
   let prog2 = document.getElementById('progsBlock');
   
   let container = document.getElementById('container-inner');
   
   let wrapper = container.firstElementChild;
   
   let sections = container.querySelectorAll('.progs-slider-item');
      
   let progNames = [];
   
   let logo = prog2.querySelector('.prog-logo > img');
   
   let progTitle = prog2.querySelector('.prog-title > h4');
   
   let progPrev = document.getElementById('prog-prev');
   let progPrevLabel = progPrev.querySelector('span');
       
   let progNext = document.getElementById('prog-next');
   let progNextLabel = progNext.querySelector('span');
      
   prog1.addEventListener('click', function(event){
    
       let target = event.target;
       
       if( target.className != 'prog-link' ){
          return;
       }
       
       this.classList.add('hide');
       
       prog2.classList.remove('hide');
       
       let step = container.clientWidth;
       
       for( let section of sections ){
         section.style.width = step + 'px';
       }
       
       let names = this.querySelectorAll('header.prog-header');
       
       for ( let name of names ) {
          let str = name.innerText;
          progNames.push(str);
       }
       
       let progLinks = this.querySelectorAll('a.prog-link');
       progLinks = Array.from(progLinks);
       
       let index = progLinks.indexOf(target);
       
       
       changeProgs(index, step);
       
       progPrev.onclick = function(){
        
         if ( index == 0 ) {
            index = progNames.length - 1;
         }
         
         else {
            index--;
         } 
         
         changeProgs(index, step);
        
       };
       
        progNext.onclick = function(){
        
         if ( index == progNames.length - 1 ) {
            index = 0;
         }
         
         else {
            index++;
         } 
         
         changeProgs(index, step);
        
       };
       
      
    
    }); 
    


