;(function(){
    'use strict';
    
    function YearsSlider(sliderWrapper, currentYear){
        
        this.sliderWrapper = sliderWrapper;
        this.currentYear = currentYear;
        this.content = this.sliderWrapper.querySelector('.years-slider-data-content');
        this.viewport = this.content.parentElement;
        this.years = this.content.querySelectorAll('p');
        this.yearsLength = this.years.length;
        
		this.viewportHeight = this.viewport.clientHeight;
        this.contentHeight = this.content.scrollHeight;
        
		this.max = this.viewportHeight - this.contentHeight;
        this.step = 24;
        this.count = 0;
        this.maxCount = this.yearsLength - 1;
        
        this.visibleYearsLength = 3;
        this.possibleClicks = this.yearsLength - this.visibleYearsLength;
        
        
        
        this.topArrow = this.sliderWrapper.querySelector('.arrows[data-name="up"]');
        this.bottomArrow = this.sliderWrapper.querySelector('.arrows[data-name="down"]');
        //alert(this.maxCount);
    }
    
    const fn = YearsSlider.prototype;
    
    fn.init = function() {//добавляем метод init() к конструктору Scrollbox
		
        this.years[this.count].classList.add('active-year');
        
        if(this.yearsLength > 1) {
            this.bottomArrow.classList.add('active');
        }
		
		this.registerEventsHandler();
	};
    
    fn.registerEventsHandler = function() {
		
		if (this.yearsLength > 1) {
			this.sliderWrapper.addEventListener('click', this.click.bind(this));
		} 
        
       
	};
    
    fn.click = function(event){
       
       let target = event.target;
       if( !target.classList.contains('arrows') ){
        return;
       }
       
       let direction = target.getAttribute('data-name');       
       
       switch(direction) {
        
         case 'up':
         
            if ( this.count == 0 ) {
                    return false;
                }
                
            if ( this.count == 1 ) {
                    target.classList.remove('active');
                }
                
            if( !this.bottomArrow.classList.contains('active') ) {
                    this.bottomArrow.classList.add('active');
                }
                
            if( this.yearsLength > this.visibleYearsLength && this.count <= this.possibleClicks) {
                    
                    this.content.style.top = (this.content.offsetTop + this.step) + 'px';
                    this.years[this.count].classList.remove('active-year');
                    this.years[this.count - 1].classList.add('active-year');
                }
                
            else {
                    this.years[this.count].classList.remove('active-year');
                    this.years[this.count - 1].classList.add('active-year');
                }    
                
                this.currentYear.innerHTML = this.years[this.count - 1].innerHTML;
                
                this.count--;
            
            break;
            
         case 'down':
         
            if ( this.count >= this.maxCount ) {
                    return false;
                }
                
            if ( this.count == this.maxCount - 1 ) {
                    target.classList.remove('active');
                }
                
            if( !this.topArrow.classList.contains('active') ) {
                    this.topArrow.classList.add('active');
                }
                
            if( this.yearsLength > this.visibleYearsLength && this.count < this.possibleClicks) {
                    
                    this.content.style.top = (this.content.offsetTop - this.step) + 'px';
                    this.years[this.count].classList.remove('active-year');
                    this.years[this.count + 1].classList.add('active-year');
                }
                
            else {
                    this.years[this.count].classList.remove('active-year');
                    this.years[this.count + 1].classList.add('active-year');
                }    
                
                this.currentYear.innerHTML = this.years[this.count + 1].innerHTML;
                
                this.count++;
            //alert(target.className);
            
            break;
        
       }
       
       
       if( currentChart ){
                    changeChartData(currentChart, this.currentYear.innerHTML);
        }
        
    };
    
    let sliderWrapper = document.querySelector('.years-slider');

    let currentYear = document.getElementById('currentYear');

    let yearsSlider = new YearsSlider(sliderWrapper, currentYear);
        
    yearsSlider.init();
    
})();


