document.addEventListener('DOMContentLoaded', function(){
	
	let ctx = document.getElementById('myChart');
    if ( !ctx ) {
        return;
    }
    
    let year = document.getElementById('currentYear').innerHTML;
    
    ctx.getContext('2d');
	let chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: [ "Читайка", "Мама - тоже человек", "Рука помощи", "Светлица" ],
        datasets: [{
            data: chartData[year],
            backgroundColor: [
                'rgba(63, 210, 193, 1)',
                'rgba(250, 144, 84, 1)',
                'rgba(17, 131, 180, 1)',
                'rgba(69, 205, 235, 1)'
                
                
            ],
            borderColor: [
                'rgba(63, 210, 193, 1)',
                'rgba(250, 144, 84, 1)',
                'rgba(17, 131, 180, 1)',
                'rgba(69, 205, 235, 1)'
            ],
            
            borderWidth: 0,
            borderAlign: 'center',
            
            hoverBackgroundColor: [
                'rgba(63, 210, 193, 1)',
                'rgba(250, 144, 84, 1)',
                'rgba(17, 131, 180, 1)',
                'rgba(69, 205, 235, 1)'
            
            ],
            hoverBorderWidth: 10,
            hoverBorderColor: [
                'rgba(63, 210, 193, 1)',
                'rgba(250, 144, 84, 1)',
                'rgba(17, 131, 180, 1)',
                'rgba(69, 205, 235, 1)'
            ],
            
            
        }]
    },
    options: {
        aspectRatio: 1,
        responsive: false,
        cutoutPercentage: 50,
        rotation: 0.75,
        //circumference: 5,
        legend: {
           display: false,
           position: 'bottom',
           align: 'start',
           //fullWidth: true,
           reverse: false,
           labels: {
            boxWidth: 20,
            fontColor: 'black',
            usePointStyle: true,
            fontSize:14,
            padding:20
           },
           rtl: false
                             
         },
        title: {
            display: false,
            position: 'top',
            text: '',
            fontSize: 16,
            fontColor: 'black',
            padding: 20
        },
        
        /*onHover: function(){
                alert('hover');
            },*/
            
         tooltips: {
            enabled: true,
            mode: 'nearest',
            intersect: true,
            position: 'average',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            titleFontSize: 0,
            //titleFontStyle: 'bold',
            //titleAlign: 'center',
            //titleSpacing: 2,
            titleMarginBottom: 0,
            bodyFontSize: 0,
            xPadding: 0,
            yPadding: 0,
            caretPadding:0,
            caretSize:0,
            cornerRadius: 6,
            //multiKeyBackground: 'white',
            displayColors: true,
            borderColor: 'rgba(0, 0, 0, 0)',
            borderWidth: 0,
            rtl: false,
            
            callbacks: {
                label: function(tooltipItem, data) {
                    
                    let label = data.labels[tooltipItem.index] || '';
                    document.getElementById('chartItemLabel').innerHTML = label;

                    /*if (label) {
                        label += ': ';
                    }*/
                    let val = data.datasets[0].data[tooltipItem.index] || '';
                    //console.log(val);
                    if (val) {
                        val += '%';
                    }
                    
                    document.getElementById('chartItemVal').innerHTML = val;
                    
                    //label = label + val;
                    
                    //return label;
                },
                
              
                
            }           
        },
        animation: {
            //animateRotate: false,//убрать анимацию
            animateScale: true,
            duration: 1500,
            easing: 'easeInOutQuad',
            onComplete: function() {
                let innerInfID = document.getElementById('innerInfID');
                innerInfID.style.display = 'block';
                setTimeout(function(){
                    innerInfID.querySelector('span').style.display = 'block';
                    
                }, 500);
                
                setTimeout(function(){
                    document.getElementById('myLegend').style.display = '';
                }, 1000);

                
                
            }
        }
    
    }
}); 

currentChart = chart;

ctx.onmouseleave = function(){
    document.getElementById('innerInfID').innerHTML = '<div id="chartItemVal"><img alt="" src="../images/bar-chart-2.png" /></div><span id="chartItemLabel">Активность<br />по программам</span>';
};
 
});