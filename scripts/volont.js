(function() {
    
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
        
        
        //alert(myInput.name);
    }
    
})();