
(function(window, document, $, undefined) {
	  "use strict";
	$(function() {

		if ($('#lineChart').length) {
			
			var ctx = document.getElementById('lineChart').getContext('2d');


			var myChart = new Chart(ctx, {
				type: 'line',
				data: {
					labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
					datasets: [{
						label: 'Google',
						data: [13, 20, 14, 15, 7, 4, 8],
						backgroundColor: 'rgba(59, 165, 249, 0.44)',
						borderColor: '#3ba5f9',
						pointRadius :"0",
						borderWidth: 3
					}, {
						label: 'Facebook',
						data: [3, 30, 16, 6, 35, 14, 11],
						backgroundColor: 'rgba(241, 135, 2, 0.5)',
						borderColor: '#f18702',
						pointRadius :"0",
						borderWidth: 3
					}]
				},
			options: {
				maintainAspectRatio: false,
				legend: {
				  display: true,
				  labels: {
					fontColor: '#4e4e4e',  
					boxWidth:15
				  }
				},
				tooltips: {
				  enabled:false
				},	
			  scales: {
				  xAxes: [{
					ticks: {
						beginAtZero:true,
						fontColor: '#4e4e4e'
					},
					gridLines: {
					  display: true ,
					  borderDash: [8, 4],
					  color: "rgba(66, 59, 116, 0.15)"
					},
				  }],
				   yAxes: [{
					ticks: {
						beginAtZero:true,
						fontColor: '#4e4e4e'
					},
					gridLines: {
					  display: false ,
					  borderDash: [8, 4],
					  color: "rgba(66, 59, 116, 0.15)"
					},
				  }]
				 }

			 }
			});
			
		}


		if ($('#barChart').length) {
			var ctx = document.getElementById("barChart").getContext('2d');


			var myChart = new Chart(ctx, {
				type: 'bar',
				data: {
					labels: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
					datasets: [{
						label: 'Site A',
						data: [15, 20, 10, 18, 29, 25, 18],
						backgroundColor: '#8a51f1',
						borderColor: '#8a51f1',
						borderWidth: 1

					}, {
						label: 'Site B',
						data: [31, 30, 9, 16, 21, 64, 11],
						backgroundColor: '#1bbd61',
						borderColor: '#1bbd61',
						borderWidth: 1
					}, {
						label: 'Site C',
						data: [25, 18, 12, 6, 22, 28, 15],
						backgroundColor: '#ff3857',
						borderColor: '#ff3857',
						borderWidth: 1
					}]
				},
			options: {
				maintainAspectRatio: false,
				legend: {
				  display: true,
				  labels: {
					fontColor: '#4e4e4e',  
					boxWidth:15
				  }
				},
				tooltips: {
				  enabled:false
				},	
			  scales: {
				  xAxes: [{
					  barPercentage: .5,
					ticks: {
						beginAtZero:true,
						fontColor: '#4e4e4e'
					},
					gridLines: {
					  display: true ,
					  borderDash: [8, 4],
					  color: "rgba(66, 59, 116, 0.15)"
					},
				  }],
				   yAxes: [{
					ticks: {
						beginAtZero:true,
						fontColor: '#4e4e4e'
					},
					gridLines: {
					  display: false , 
					  borderDash: [8, 4],
					  color: "rgba(66, 59, 116, 0.15)"
					},
				  }]
				 }

			 }
			});
		}

		if ($('#polarChart').length) {
			var ctx = document.getElementById("polarChart").getContext('2d');
           

			var myChart = new Chart(ctx, {
				type: 'polarArea',
				data: {
					labels: ["Lable1", "Lable2", "Lable3", "Lable4"],
					datasets: [{
						backgroundColor: [
							'#8a51f1',
							'#3ba5f9',
							'#ff3857',
							'#1bbd61'
						],
			            hoverBackgroundColor: [
			              '#8a51f1',
						  '#3ba5f9',
						  '#ff3857',
						  '#1bbd61'
			            ],
						data: [13, 20, 11, 18],
						borderWidth: [2, 2, 2, 2]
					}]
				},
			options: {
				maintainAspectRatio: false,
			   legend: {
				 position :"left",	
				 display: true,
				    labels: {
					  fontColor: '#4e4e4e',  
					  boxWidth:15
				   }
				},
	            tooltips: {
				  displayColors:false
	            },
			scale: {
				  gridLines: {
					   color: "rgba(66, 59, 116, 0.15)" 
					 }, 
				}
			   }
			});
		}


		if ($('#radarChart').length) {
			var ctx = document.getElementById("radarChart").getContext('2d');
            
			var myChart = new Chart(ctx, {
				type: 'radar',
				data: {
					labels: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
					datasets: [{
						label: 'Twitter',
						backgroundColor: 'rgba(241, 135, 2, 0.47)',
						borderColor: '#f18702',
						data: [13, 20, 4, 18, 29, 25, 8]
					}, {
						label: 'Linkedin',
						backgroundColor: 'rgba(41, 40, 40, 0.47)',
						borderColor: '#292828',
						data: [31, 30, 6, 6, 21, 4, 11]
					}]
				},
			options: {
				maintainAspectRatio: false,
			   legend: {
				 position :"left",	
				 display: true,
				    labels: {
					  fontColor: '#4e4e4e',  
					  boxWidth:15
				   }
				},
	            tooltips: {
				  displayColors:false
	            },
			scale: {
				  gridLines: {
					   color: "rgba(66, 59, 116, 0.15)" 
					 }, 
				}
			   }
			});
		}


		if ($('#pieChart').length) {
			var ctx = document.getElementById("pieChart").getContext('2d');

			var myChart = new Chart(ctx, {
				type: 'pie',
				data: {
					labels: ["Lable1", "Lable2", "Lable3"],
					datasets: [{
						backgroundColor: [
							'#f18702',
							'#1bbd61',
							'#3ba5f9'
						],
			            hoverBackgroundColor: [
			              '#f18702',
						  '#1bbd61',
						  '#3ba5f9'
			            ],
						data: [80, 30, 10],
						borderWidth: [3, 3, 3]
					}]
				},
			options: {
			   maintainAspectRatio: false,
			   legend: {
				 position :"left",	
				 display: true,
				    labels: {
					  fontColor: '#4e4e4e',  
					  boxWidth:15
				   }
				},
	            tooltips: {
				  displayColors:false
	            }
			   }
			});
		}


		if ($('#doughnutChart').length) {
			var ctx = document.getElementById("doughnutChart").getContext('2d');
			
			var myChart = new Chart(ctx, {
				type: 'doughnut',
				data: {
					labels: ["Lable1", "Lable2", "Lable3"],
					datasets: [{
						backgroundColor: [
							'#292828',
							'#ff3857',
							'#3ba5f9'
						],
			            hoverBackgroundColor: [
			              '#292828',
						  '#ff3857',
						  '#3ba5f9'
			            ],
						data: [80, 30, 10],
						borderWidth: [3, 3, 3]
					}]
				},
			options: {
			   maintainAspectRatio: false,	
			   legend: {
				 position :"left",	
				 display: true,
				    labels: {
					  fontColor: '#4e4e4e',  
					  boxWidth:15
				   }
				},
	            tooltips: {
				  displayColors:false
	            }
			   }
			});
		}


	});

})(window, document, window.jQuery);