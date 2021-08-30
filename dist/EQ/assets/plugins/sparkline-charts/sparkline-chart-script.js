
  $(function() {
    "use strict";

    $('#sparklinechart1').sparkline([4,5,6,7,4,5,8,7,6,6,4,7,6,4,7], {
            type: 'bar',
            height: '45',
            barWidth: '3',
            resize: true,
            barSpacing: '4',
            barColor: '#ffffff',
			spotColor: '#ffffff',
            minSpotColor: '#ffffff',
            maxSpotColor: '#ffffff',
            highlightSpotColor: '#ffffff',
            highlightLineColor: '#ffffff'
        });
		
		
	$('#sparklinechart2').sparkline([4,5,6,7,4,5,8,7,6,6,4,7,6,4,7], {
            type: 'bar',
            height: '45',
            barWidth: '3',
            resize: true,
            barSpacing: '4',
            barColor: '#ffffff',
            spotColor: '#ffffff',
            minSpotColor: '#ffffff',
            maxSpotColor: '#ffffff',
            highlightSpotColor: '#ffffff',
            highlightLineColor: '#ffffff'
        });

    $('#sparklinechart3').sparkline([4,5,6,7,4,5,8,7,6,6,4,7,6,4,7], {
            type: 'bar',
            height: '45',
            barWidth: '3',
            resize: true,
            barSpacing: '4',
            barColor: '#ffffff',
            spotColor: '#ffffff',
            minSpotColor: '#ffffff',
            maxSpotColor: '#ffffff',
            highlightSpotColor: '#ffffff',
            highlightLineColor: '#ffffff'
        });
		
		
	$("#sparklinechart4").sparkline([1,4,4,7,5,9,10,1,4,4,7,5,9,10], {
            type: 'line',
            width: '150',
            height: '65',
            lineWidth: '2',
            lineColor: '#ffffff',
            fillColor: 'transparent',
            spotColor: '#ffffff',
            minSpotColor: '#ffffff',
            maxSpotColor: '#ffffff',
            highlightSpotColor: '#ffffff',
            highlightLineColor: '#ffffff'
    }); 	
		
		
	  $("#sparklinechart5").sparkline([1,4,4,7,5,9,10,1,4,4,7,5,9,10], {
            type: 'line',
            width: '150',
            height: '65',
            lineWidth: '2',
            lineColor: '#ffffff',
            fillColor: 'transparent',
            spotColor: '#ffffff',
            minSpotColor: '#ffffff',
            maxSpotColor: '#ffffff',
            highlightSpotColor: '#ffffff',
            highlightLineColor: '#ffffff'
    });   

     $("#sparklinechart6").sparkline([1,4,4,7,5,9,10,1,4,4,7,5,9,10], {
            type: 'line',
            width: '150',
            height: '65',
            lineWidth: '2',
            lineColor: '#ffffff',
            fillColor: 'transparent',
            spotColor: '#ffffff',
            minSpotColor: '#ffffff',
            maxSpotColor: '#ffffff',
            highlightSpotColor: '#ffffff',
            highlightLineColor: '#ffffff'
    });    

  
   $('#sparklinechart7').sparkline([20, 20, 20], {
            type: 'pie',
            height: '200',
            resize: true,
            sliceColors: ['#f1076f', '#f7971e', '#0072ff']
        }); 


	$('#sparklinechart8').sparkline([40, 40, 40], {
		  type: 'pie',
		  height: '200',
		  resize: true,
		  sliceColors: ['#38ef7d', '#e100ff', '#03d0ea']
	  });
	  
  
  $("#sparklinechart9").sparkline([15,16,20,18,16,14,20,16,20,22,25,14,17,14,30,15], {
    type: 'bar',
    width: '100%',
    height: '200',
    barWidth: 6,
    barSpacing: 10,
    barColor: '#ffffff'
 });
  


   });