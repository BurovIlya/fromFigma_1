/*Функция-конструктор кастомной прокрутки элемента*/
	function ScrollBox(container, nameEvent) {//конструктор объекта
		// имя события прокрутки
		
        this.nameEvent = nameEvent;
		
        // родительский элемент в котором находится контент и скроллбар
		this.viewport = container.querySelector('.viewport');
        
        
		// элемент с контентом
		this.content = this.viewport.querySelector('.content');
        
		// высоты полученных элементов
		this.viewportHeight = this.viewport.offsetHeight;
        
        this.contentHeight = this.content.scrollHeight;
        
        
		// возможная максимальная прокрутка контента
		this.max = this.viewport.clientHeight - this.contentHeight;
        
        
		// соотношение между высотами вьюпорта и контента
		this.ratio = this.viewportHeight / this.contentHeight;
        
		// минимальная высота ползунка скроллбара
		this.scrollerHeightMin = 25;
        
		// шаг прокручивания контента при наступлении события 'wheel'
		// чем меньше шаг, тем медленнее и плавнее будет прокручиваться контент
		this.step = 100;
        
		// флаг нажатия на левую кнопку мыши
		this.pressed = false;
	}

	// для сокращения записи, создадим переменную, которая будет ссылаться на прототип 'ScrollBox'
	//alert( ScrollBox.prototype.constructor == ScrollBox );
    
    const fn = ScrollBox.prototype;
    
    //alert(fn);

	fn.init = function() {//добавляем метод init() к конструктору Scrollbox
		// если высота контента меньше или равна высоте вьюпорта, выходим из функции
		if (this.viewportHeight >= this.contentHeight) return;
		// формируем полосу прокрутки и полунок
		this.createScrollbar();
		// устанавливаем обработчики событий
		this.registerEventsHandler();
	};

	fn.createScrollbar = function() {
		
               
        if(!this.viewport.querySelector('.scroller')){
           // создаём новые DOM-элементы DIV из которых будет сформирован скроллбар
		let scrollbar = document.createElement('div'),
			scroller = document.createElement('div');

		// присваиваем созданным элементам соответствующие классы
		scrollbar.className = 'scrollbar';
        scroller.className = 'scroller';
        
        // вставляем созданные элементы в document
		scrollbar.appendChild(scroller);
		this.viewport.appendChild(scrollbar); 
        }
        
        // получаем DOM-объект ползунка полосы прокрутки, вычисляем и устанавливаем его высоту, создавая соответствующие свойства у текущего экземпляра конструктора Scrollbar 
		this.scroller = this.viewport.querySelector('.scroller');
        
		this.scrollerHeight = parseInt(this.ratio * this.viewportHeight);
        
		this.scrollerHeight = (this.scrollerHeight < this.scrollerHeightMin) ? this.scrollerHeightMin : this.scrollerHeight;
        
		this.scroller.style.height = this.scrollerHeight + 'px';
        
		// вычисляем максимально возможное смещение ползунка от верхней границы вьюпорта
		// это смещение зависит от высоты вьюпорта и высоты самого ползунка
		this.scrollerMaxOffset = this.viewportHeight - this.scroller.offsetHeight;
        
	};

	// регистрация обработчиков событий
	fn.registerEventsHandler = function(e) {
		// вращение колёсика мыши
		if (this.nameEvent === 'wheel') {
			this.viewport.addEventListener('wheel', this.scroll.bind(this));
		} 
        
        else {
			this.content.addEventListener('scroll', () => {//не работает!!!
				this.scroller.style.top = (this.content.scrollTop * this.ratio) + 'px';
                
			});
		}

		// нажатие на левую кнопку мыши
		this.scroller.addEventListener('mousedown', e => {
			// координата по оси Y нажатия левой кнопки мыши (относительно окна)
			this.start = e.clientY;
			// устанавливаем флаг, информирующий о нажатии левой кнопки мыши
			this.pressed = true;
            
		});
        
        this.scroller.addEventListener('click', e => {
			
            e.stopPropagation();
            
		});
        
        

		// перемещение мыши
		document.addEventListener('mousemove', this.drop.bind(this));

		// отпускание левой кнопки мыши
		document.addEventListener('mouseup', () => this.pressed = false);
	};

	fn.scroll = function(e) {//для события wheel
		e.preventDefault();
		// направление вращения колёсика мыши
		let dir = -Math.sign(e.deltaY);//deltaY - количество прокрученных пикселей по вертикали
        //Метод Math.sign() возвращает знак числа, указывающий на то, является ли число отрицательным, положительным или нулём, когда крутишь в низ страницы - deltaY имеет отрицательное значение
        
        
		// шаг прокручивания контента, в зависимости от прокручивания колёсика мыши, если прокрутка меньше чем на 3 пикселя, то отмена
		let	step = (Math.abs(e.deltaY) >= 3) ? this.step * dir : 0;

		// управляем позиционированием контента
        
		this.content.style.top = (this.content.offsetTop + step) + 'px';//offsetTop - свойство возвращает расстояние текущего элемента по отношению к верхней части offsetParent узла (offsetParent содержит ближайшего родителя, относительно которого происходит позиционирование элемента, здесь это div.viewport)
		// ограничиваем прокручивание контента вверх и вниз, когда крутим вниз offsetTop - отрицательный
        
		if (this.content.offsetTop > 0) this.content.style.top = '0px';
		if (this.content.offsetTop < this.max) this.content.style.top = this.max + 'px';

		// перемещаем ползунок пропорционально прокручиванию контента
		this.scroller.style.top = (-this.content.offsetTop * this.ratio) + 'px';
	};

	fn.drop = function(e) {
		e.preventDefault();
		// если кнопка мыши не нажата, прекращаем работу функции
		if (this.pressed === false) return;

		// величина перемещения мыши
		let shiftScroller = this.start - e.clientY;
		// изменяем положение бегунка на величину перемещения мыши
		this.scroller.style.top = (this.scroller.offsetTop - shiftScroller) + 'px';

		// ограничиваем перемещение ползунка по верхней границе вьюпорта
		if (this.scroller.offsetTop <= 0) this.scroller.style.top = '0px';
		// ограничиваем перемещение ползунка по нижней границе вьюпорта
		// сумма высоты ползунка и его текущего отступа от верхней границы вьюпорта
		let	totalHeight = this.scroller.offsetHeight + this.scroller.offsetTop;
		if (totalHeight >= this.viewportHeight) this.scroller.style.top = this.scrollerMaxOffset + 'px';

		// расстояние, на которую должен переместиться контент
		// это расстояние пропорционально смещению ползунка
		let	shiftContent = this.scroller.offsetTop / this.ratio;
		// прокручиваем контент по событию 'wheel'
		if (this.nameEvent === 'wheel') {
		// прокручиваем контент на величину пропорциональную перемещению ползунка,
		// она имеет обратный знак, т.к. ползунок и контент прокручиваются
		// в противоположных направлениях
			this.content.style.top = -shiftContent + 'px';
		// прокручиваем контент по событию 'scroll'
		} 
        else {
			this.content.scrollTo(0, shiftContent);
		}
		// устанавливаем координату Y начала движения мыши равной текущей координате Y
		this.start = e.clientY;
	};

	// выбираем все блоки на странице, в которых может понадобиться прокрутка контента
	let containers = document.querySelectorAll('[data-control]');
        
	// перебираем полученную коллекцию элементов
	for (let container of containers) {
		// имя события, используемого для прокручивания контента
		let nameEvent = container.getAttribute('data-control');
        
		// с помощью конструктора 'ScrollBox' создаём экземпляр объекта,
		// в котором будем прокручивать контент
		let scrollbox = new ScrollBox(container, nameEvent);
        
		// создание скроллбара, исходя из полученных в конструкторе высот контента и вьюпорта текущего блока, регистрация обработчиков событий
		scrollbox.init();
	}


/*функция отображения/скрытия главной страницы*/
function scrollingMainPage(elem, myInterval) {
    
    let scrollTopValue = document.documentElement.scrollTop;
    let headerMenu = elem.querySelector('.menu');
    let donutButton = headerMenu.querySelector('.donuts');
    let phone = headerMenu.querySelector('.phone');
    
    if( scrollTopValue >= myInterval ) {
         window.scrollTo(0,0);
         elem.style.top = '';
         elem.style.bottom = 0;
         headerMenu.classList.toggle('flexblock2');
         donutButton.style.display = 'none';
         phone.onmouseenter = function(){
            //return false;
        };
        phone.onmouseleave = function(){
            //return false;
        };
    }
    else {
        window.scrollTo(0,myInterval);
        elem.style.bottom = '';
        elem.style.top = 0;
        headerMenu.classList.toggle('flexblock2');
        donutButton.style.display = 'block';
        phone.onmouseenter = function(){
            donutButton.style.display = 'none';
        };
        phone.onmouseleave = function(){
            donutButton.style.display = 'block';
        };
    }
    
}

( function() {
    
    let clickableBlocks = document.querySelectorAll('[data-type="clickable"]');

for( let link of clickableBlocks ) {
    link.addEventListener('click', function(event){
        event.stopPropagation();
    });
}


document.querySelector('div.title-page div.volume').addEventListener('click', function(event) {
    //event.stopPropagation();
    this.classList.toggle('off');
});
    
    let titlePage = document.querySelector('div.title-page-main');
    let titlePageHeader = document.querySelector('div.title-page-header');
    let titlePageContent = document.querySelector('div.title-page-content');
    let interval = titlePage.clientHeight - titlePageHeader.clientHeight;
    
    
    titlePage.addEventListener('click', function(){
       scrollingMainPage(titlePageHeader, interval);
    });
    
    titlePageContent.addEventListener('click', function() {
        scrollingMainPage(titlePageHeader, interval);
    });
    
    titlePageHeader.addEventListener('click', function() {
        scrollingMainPage(this, interval);
    });
    
} )();


/*для кастомных полей input*/
function editStart(elem) {
    let inputField = elem.querySelector('input[type="text"]');
    let customInput = elem.querySelector('div.custom-input');
    let customInputInner = customInput.querySelector('div.custom-input-inner');
    let par1 = customInputInner.querySelector('p.simple-text');
    let par2 = customInputInner.querySelector('p.input-value-text');
    let clearButton = customInput.querySelector('div.clear-field');
        
    if ( !inputField ) {
        return;
    }
    inputField.style.opacity = 1;
    customInput.style.zIndex = -1;
    inputField.focus();
        
    inputField.onkeydown = function(event) {
        if (event.key == 'Enter') {
          
          this.blur();
        }
      };
      
    inputField.onblur = function() {
        inputField.style.opacity = 0;
        customInput.style.zIndex = 22;
        
        if( this.value ) {
            par2.innerHTML = this.value;
        }
        else {
            return;
        }
        
        par1.style.fontSize = '12px';
        par1.style.color = '#7E90A5';
                
        
       par2.style.display = 'block'; 
       customInputInner.classList.add('flexblock4');
       customInput.classList.add('edited');
       clearButton.style.display = 'block';
       
       
        
      };  
      
        
       clearButton.onclick = function(event) {
         event.stopPropagation();
         inputField.value = '';
         par1.style.fontSize = '';
         par1.style.color = '';
         par2.style.display = 'none';
         customInputInner.classList.remove('flexblock4');
         customInput.classList.remove('edited');
         this.style.display = 'none';
       };
    
}


function changeRadioElemValue(event) {
    let target = event.target;
    let radioWrapper = target.closest('div.custom-radio');
    radioWrapper.classList.toggle('switch-on');
}


( function(){
   let customInputFields = document.querySelectorAll('div.input-field');

for ( let field of customInputFields ) {
    field.addEventListener('click', function(){
        editStart(this);
    });
}

let customRadioButtons = document.getElementsByName('payperiod');

for ( let button of customRadioButtons ) {
    button.addEventListener('change', changeRadioElemValue);
} 

let switchers = document.querySelectorAll('div.switcher');

for ( let switcher of switchers ) {
    switcher.addEventListener('click', function(evt){
        
        let ball = this.querySelector('div.switcher-ball');
        let left = getComputedStyle(ball).left;
        
        if ( left == '2px' ){
            switcher.nextElementSibling.querySelector('input[type="radio"]').checked = 'checked';
        }
        else {
           switcher.previousElementSibling.querySelector('input[type="radio"]').checked = 'checked'; 
        }
        
        
        changeRadioElemValue(evt);
    });
} 


} )(); 


function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  let x, y, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (let i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (let i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);

let myForms = document.forms;
for ( let form of myForms ) {
    form.addEventListener("click", closeAllSelect);
}


/*Кастомный селект*/
(function(){
   
/*look for any elements with the class "custom-select":*/
let selectWrappers = document.getElementsByClassName("custom-select");

for (let i = 0; i < selectWrappers.length; i++) {
  
  let selElmnt = selectWrappers[i].querySelector('select');//оригинальный селект
  let selectedItem = selectWrappers[i].querySelector('.select-selected');
  selectedItem.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  
    
  /*for each element, create a new DIV that will contain the option list:*/
  let optionsWrapper = document.createElement("DIV");
  optionsWrapper.classList.add("select-items");
  optionsWrapper.classList.add("select-hide");
  
  for (let j = 0; j < selElmnt.length; j++) {//!!!Начинается с 1, так как option[0] здесь как заголовок
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    let myOption = document.createElement("DIV");
    myOption.innerHTML = selElmnt.options[j].innerHTML;
    myOption.setAttribute('data-value', selElmnt.options[j].value);
    optionsWrapper.appendChild(myOption);
    
    myOption.addEventListener("click", function() {
       
        let currentSelectWrapper = this.closest('.custom-select');
        
        let currentOriginSelect = currentSelectWrapper.querySelector('select');
        
        let currentSelectedItem = currentSelectWrapper.querySelector('.select-selected');
                
        for (let i = 0; i < currentOriginSelect.length; i++) {
          
          if (currentOriginSelect.options[i].value == this.getAttribute('data-value')) {
            
            currentOriginSelect.selectedIndex = i;
            currentSelectedItem.innerHTML = this.innerHTML;
            
            let currentOptionsWrapper = this.parentElement.querySelectorAll(".same-as-selected");
            
            for (let i = 0; i < currentOptionsWrapper.length; i++) {
              currentOptionsWrapper[i].classList.remove("same-as-selected");
            }
            
            this.classList.add("same-as-selected");
            
            closeAllSelect(this);
            
            break;
          }
        }
        
    });
    
  }
  
  
  selectWrappers[i].appendChild(optionsWrapper);
  
  selectedItem.addEventListener("click", function(e) {
      /*when the select box is clicked, close any other select boxes,
      and open/close the current select box:*/
      e.stopPropagation();
      closeAllSelect(this);
      this.nextElementSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
  });
}

    
})();


/*Управление всплывающими блоками*/

const popupWrapper = document.getElementById('popup-wrapper');

popupWrapper.addEventListener('click', function(){
    this.classList.add('hide');
});

let fixedBlocks = document.querySelectorAll('.fixedBlock');

for ( let block of fixedBlocks ) {
    
    block.addEventListener('click', function(e) {
    e.stopPropagation();
});
    
}


let closeButtons = document.querySelectorAll('.popup-close');

for ( let butt of closeButtons ) {
    
    butt.addEventListener('click', function(){
        let parentPopup = this.closest('.popup');
        if ( parentPopup.id == 'popup2' ){
            butt.parentElement.classList.add('hide');
        }
        parentPopup.classList.add('hide');
        
        if( butt.parentElement.id == 'popup-thanks' ) {
           
            butt.previousElementSibling.innerHTML = '';
        }
        
    });
}

function showPopup() {
    
   popupWrapper.classList.remove('hide'); 
   
}


let donutButtons = document.querySelectorAll('.donuts');

for ( let button of donutButtons ) {
    button.addEventListener('click', showPopup);
}

const popup2 = document.getElementById('popup2');

popup2.addEventListener('click', function(){
    
    let blocks = this.querySelectorAll('.fixedBlock');
    for ( let block of blocks ) {
        if( !block.classList.contains('hide') ){
            block.classList.add('hide');
            
        }
        if ( block.id == 'popup-thanks' ) {
            block.firstElementChild.innerHTML = '';
        }
    }
    
   this.classList.add('hide'); 
    
});

function showPopup2(id) {
   
   document.getElementById(id).classList.toggle('hide'); 
   popup2.classList.toggle('hide');
}

/*всплывающая форма для пожертвований*/
let myDonatForms = document.querySelectorAll('form.donut-form');

for( let form of myDonatForms ) {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        showPopup2('popup2-block');
        popup2.classList.add('appear');
        
              
        setTimeout(function(){
            
            popup2.classList.toggle('appear');
            popup2.classList.add('disappear');
            
            setTimeout(function(){
                showPopup2('popup2-block');
                
                popup2.classList.remove('disappear');
                
            }, 2500);
            
          form.submit();
         
        }, 2500);
        
      });
}

let instructId = 'popup-instruct';


function createScrollbar2(id){
    let container2 = document.getElementById(id).firstElementChild;
    let nameEvent2 = 'wheel';
    let scrollbox2 = new ScrollBox(container2, nameEvent2);
    scrollbox2.step = 50;
    scrollbox2.init();
}

function showInstructions() {
    
    showPopup2(instructId);
    createScrollbar2(instructId);    
}

let instructions = document.querySelectorAll('a.instruction');

for ( let instr of instructions ) {
    
    instr.addEventListener('click', function(event) {
        
        event.preventDefault();
        showInstructions();
        
    });
}

/*Переключение вкладок*/
function tabbing(elem, evt) {
        
        let target = evt.target;
            if ( !target.classList.contains('tabs-menu-item') ) {
                return;
            }
    
        let activeTabMenuItem = elem.querySelector('.active-tab');
        
        if ( target == activeTabMenuItem ) {
                return;
         }
        
        
        
        let activeTabValue = activeTabMenuItem.getAttribute('data-tab');
        let currentBlock = document.getElementById(activeTabValue);
        
        activeTabMenuItem.classList.remove('active-tab');
        target.classList.add('active-tab');
        
        let targetTabValue = target.getAttribute('data-tab');
        
        currentBlock.classList.add('hide');
        
        document.getElementById(targetTabValue).classList.remove('hide');
        
        if( !elem.closest('#' + instructId) ) {
            return;
        }
        else {
            createScrollbar2(instructId);
        }      
        
} 

let tabsMenu = document.querySelectorAll('.tabs-menu');

for ( let tab of  tabsMenu ) {
    tab.addEventListener('click', function(event){
        tabbing(this, event);
     });
}

let kontracts = document.querySelectorAll('.kontract');

for ( let kontr of kontracts ) {
    kontr.addEventListener('click', function(event){
        event.preventDefault();
        showPopup2('dogovor');
        createScrollbar2('dogovor');
    });
}

function showFullThanks() {
    
    showPopup2('popup-thanks');
       
}


/*Всплывающие благодарности*/
let popupThanks = document.getElementById('popup-thanks');
let popupThanksContent = popupThanks.firstElementChild;

let thanksBlock = document.querySelector('.thanks-wrapper .thanks');

thanksBlock.addEventListener('click', function(event){
    
    let target = event.target;
    
    if( !target.classList.contains('fulltext-link') ) {
        return;
    }
    
    let thanksCard = target.closest('article.thanks-card');
    let clone = thanksCard.cloneNode(true);
    
    clone.querySelector('div.fulltext-link').remove();
    
    let orgName = clone.querySelector('p.org-name');
    
    let spasibo = document.createElement('h5');
    spasibo.classList.add('spasibo');
    spasibo.innerHTML = 'Спасибо';
    
    orgName.after(spasibo);
    
    popupThanksContent.append(clone);
    
    showPopup2(popupThanks.id);
    
     
    
});


/*управление карточками блога и благодарностей*/
let sliderArrows = document.querySelectorAll('.slider-arrows');

for ( let sliderArrow of sliderArrows ) {
    
    let count = 0;
    
    sliderArrow.addEventListener('click', function(event){
        let target = event.target;
        
        if( !target.classList.contains('arrows') ) {
            return;
        }
        
        let parentSection = target.closest('section');
        
        let slides = parentSection.querySelectorAll('.slider-item');
        let allSlidesLength = slides.length;
               
        let hiddenSlidesLength = 0;
        
        for ( let i =0; i < slides.length; i++ ) {
            if ( slides[i].classList.contains('hide') ) {
                hiddenSlidesLength++;
            }
        }
        
        let visibleSlides = allSlidesLength - hiddenSlidesLength;
        
        let direction = target.getAttribute('data-name');
        
        switch(direction) {
            case 'left':
            
                if ( count == 0 ) {
                    return false;
                }
                
                if ( count == 1 ) {
                    target.classList.remove('active');
                }
                
                if( !target.nextElementSibling.classList.contains('active') ) {
                    target.nextElementSibling.classList.add('active');
                }
                
                slides[count + 1].classList.add('hide');
                slides[count - 1].classList.remove('hide');
                count--;
                            
            break;
            
            case 'right':
            
                if ( count >= hiddenSlidesLength ) {
                    return false;
                }
                
                if ( count == hiddenSlidesLength - 1 ) {
                    target.classList.remove('active');
                }
                
                if( !target.previousElementSibling.classList.contains('active') ) {
                    target.previousElementSibling.classList.add('active');
                }
                
                slides[count].classList.add('hide');
                slides[count + visibleSlides].classList.remove('hide');
                
                
                count++;
                
            
            break;
        }
        
        
    });
}






















