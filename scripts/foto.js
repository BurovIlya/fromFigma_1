/*для картинок со счетами*/
(function() {
    
    let galleries = document.querySelectorAll('.gallery');
    
    if ( !galleries ) {
        return false;
    }
    
    let popup = document.getElementById('popup-thanks');
    
    let popupContent = popup.firstElementChild;
    
    for ( let gallery of galleries ) {
        
        gallery.addEventListener('click', function(evt) {
            
            let target = evt.target;
            if ( target.tagName != 'FIGURE' ) {
                return;
            }
            
            let img = target.querySelector('img');
            let proportion = img.clientWidth / img.clientHeight;
            let docHeight = document.documentElement.clientHeight;
            
            let cloneImg = img.cloneNode(true);
            cloneImg.style.width = '100%';
            cloneImg.style.height = '100%';
            
            popupContent.append(cloneImg);
            
            popup.style.height = docHeight * 0.95 + 'px';
            popup.style.width = docHeight * 0.95 * proportion + 'px';
            popup.style.borderRadius = '0px';
            popup.style.boxShadow = 'none';
            
            showPopup2(popup.id);
            
            //alert(popupContent.className);
            
        });
        
    }
    
})();