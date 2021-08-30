$(function() {
    "use strict";


window.Apex = {
      stroke: {
        width: 3
      },
      markers: {
        size: 0
      },
      tooltip: {
        fixed: {
          enabled: true,
        }
      }
    };
    
    var randomizeArray = function (arg) {
      var array = arg.slice();
      var currentIndex = array.length,
        temporaryValue, randomIndex;

      while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    // data for the sparklines that appear below header area
    var sparklineData = [47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46];

    var spark1 = {
      chart: {
        foreColor: 'rgba(0, 0, 0, 0.85)',
        type: 'area',
        height: 160,
        sparkline: {
          enabled: true
        },
      },
      stroke: {
        width: 2,
        curve: 'straight'
      },
      colors: ["#009efd"],
      dataLabels: {
            enabled: false
        },
      tooltip: {
            enabled: true,
            theme: 'dark',
        },
      series: [{
        data: randomizeArray(sparklineData)
      }],
      yaxis: {
        min: 0
      },
      title: {
        text: '$424,652',
        offsetX: 0,
        style: {
          fontSize: '24px',
          cssClass: 'apexcharts-yaxis-title'
        }
      },
      subtitle: {
        text: 'Sales',
        offsetX: 0,
        style: {
          fontSize: '14px',
          cssClass: 'apexcharts-yaxis-title'
        }
      }
    }

    var spark2 = {
      chart: {
        foreColor: 'rgba(0, 0, 0, 0.85)',
        type: 'area',
        height: 160,
        sparkline: {
          enabled: true
        },
      },
      stroke: {
        width: 2,
        curve: 'straight'
      },
      colors: ["#ff0844"],
      dataLabels: {
            enabled: false
        },
      tooltip: {
            enabled: true,
            theme: 'dark',
        },
      series: [{
        data: randomizeArray(sparklineData)
      }],
      yaxis: {
        min: 0
      },
      title: {
        text: '$235,312',
        offsetX: 0,
        style: {
          fontSize: '24px',
          cssClass: 'apexcharts-yaxis-title'
        }
      },
      subtitle: {
        text: 'Expenses',
        offsetX: 0,
        style: {
          fontSize: '14px',
          cssClass: 'apexcharts-yaxis-title'
        }
      }
    }

    var spark3 = {
      chart: {
        foreColor: 'rgba(0, 0, 0, 0.85)',
        type: 'area',
        height: 160,
        sparkline: {
          enabled: true
        },
      },
      stroke: {
        width: 2,
        curve: 'straight'
      },
      colors: ["#fc4a1a"],
      dataLabels: {
            enabled: false
        },
      tooltip: {
            enabled: true,
            theme: 'dark',
        },
      series: [{
        data: randomizeArray(sparklineData)
      }],
      xaxis: {
        crosshairs: {
          width: 1
        },
      },
      yaxis: {
        min: 0
      },
      title: {
        text: '$135,965',
        offsetX: 0,
        style: {
          fontSize: '24px',
          cssClass: 'apexcharts-yaxis-title'
        }
      },
      subtitle: {
        text: 'Profits',
        offsetX: 0,
        style: {
          fontSize: '14px',
          cssClass: 'apexcharts-yaxis-title'
        }
      }
    }

    var spark1 = new ApexCharts(document.querySelector("#spark1"), spark1);
    spark1.render();
    var spark2 = new ApexCharts(document.querySelector("#spark2"), spark2);
    spark2.render();
    var spark3 = new ApexCharts(document.querySelector("#spark3"), spark3);
    spark3.render();




    var options1 = {
      chart: {
        type: 'line',
        width: '100%',
        height: 55,
        sparkline: {
          enabled: true
        }
      },
      colors: ["#ff5447"],
      series: [{
        data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
      }],
      tooltip: {
        theme: 'dark',
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function (seriesName) {
              return ''
            }
          }
        },
        marker: {
          show: false
        }
      }
    }

    var options2 = {
      chart: {
        type: 'line',
        width: '100%',
        height: 55,
        sparkline: {
          enabled: true
        }
      },
      colors: ["#cddc35"],
      series: [{
        data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14]
      }],
      tooltip: {
        theme: 'dark',
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function (seriesName) {
              return ''
            }
          }
        },
        marker: {
          show: false
        }
      }
    }

    var options3 = {
      chart: {
        type: 'line',
        width: '100%',
        height: 55,
        sparkline: {
          enabled: true
        }
      },
      colors: ["#38ef7d"],
      series: [{
        data: [47, 45, 74, 14, 56, 74, 14, 11, 7, 39, 82]
      }],
      tooltip: {
        theme: 'dark',
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function (seriesName) {
              return ''
            }
          }
        },
        marker: {
          show: false
        }
      }
    }


    var options4 = {
      chart: {
        type: 'bar',
        width: '100%',
        height: 55,
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '50%'
        }
      },
      dataLabels: {
            enabled: false
        },
      colors: ["#fc4a1a"],
      series: [{
        data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
      }],
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      xaxis: {
        crosshairs: {
          width: 1
        },
      },
      tooltip: {
        theme: 'dark',
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function (seriesName) {
              return ''
            }
          }
        },
        marker: {
          show: false
        }
      }
    }



    var options5 = {
      chart: {
        type: 'bar',
        width: '100%',
        height: 55,
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '50%'
        }
      },
      dataLabels: {
            enabled: false
        },
      series: [{
        data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14]
      }],
     colors: ["#009efd"],
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      xaxis: {
        crosshairs: {
          width: 1
        },
      },
      tooltip: {
		theme: 'dark',
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function (seriesName) {
              return ''
            }
          }
        },
        marker: {
          show: false
        }
      }
    }

    var options6 = {
      chart: {
        type: 'bar',
        width: '100%',
        height: 55,
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '50%'
        }
      },
      colors: ["#799f0c"],
      dataLabels: {
            enabled: false
        },
      series: [{
        data: [47, 45, 74, 14, 56, 74, 14, 11, 7, 39, 82]
      }],
      labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      xaxis: {
        crosshairs: {
          width: 1
        },
      },
      tooltip: {
        theme: 'dark',
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function (seriesName) {
              return ''
            }
          }
        },
        marker: {
          show: false
        }
      }
    }

    new ApexCharts(document.querySelector("#chart1"), options1).render();
    new ApexCharts(document.querySelector("#chart2"), options2).render();
    new ApexCharts(document.querySelector("#chart3"), options3).render();
    new ApexCharts(document.querySelector("#chart4"), options4).render();
    new ApexCharts(document.querySelector("#chart5"), options5).render();
    new ApexCharts(document.querySelector("#chart6"), options6).render();



    });