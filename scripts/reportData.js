let years = [2015, 2016, 2017, 2018, 2019];

let reportButton = document.getElementById('watch-report');

reportButton.addEventListener('click', function(){
    
    let vitrina = document.getElementById('vitrina');
    vitrina.classList.add('hide');
    let detailedReport = document.getElementById('detailed-report');
    detailedReport.classList.remove('hide');
    let selectedYearStr = document.getElementById('currentYear').innerHTML;
        
    let reportTitle = detailedReport.querySelector('.year-big');
    reportTitle.innerHTML = selectedYearStr;
    
    const elems = document.querySelectorAll('[data-report]');
    
    let index = years.indexOf(parseInt(selectedYearStr));
    
    for ( let elem of elems ){
        let json = elem.dataset.report;
        
        if(!json){
           continue;
        }
        
        let data = JSON.parse(json);
        elem.innerHTML = data.vals[index]; 

    }
    
    
});



