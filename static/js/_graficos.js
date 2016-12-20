var dias = new Array(7);
dias[0] = 'Domingo';
dias[1] = 'Lunes';
dias[2] = 'Martes';
dias[3] = 'Miércoles';
dias[4] = 'Jueves';
dias[5] = 'Viernes';
dias[6] = 'Sábado';

var meses = new Array(12);
meses[0] = 'Enero';
meses[1] = 'Febrero';
meses[2] = 'Marzo';
meses[3] = 'Abril';
meses[4] = 'Mayo';
meses[5] = 'Junio';
meses[6] = 'Julio';
meses[7] = 'Agosto';
meses[8] = 'Setiembre';
meses[9] = 'Octubre';
meses[10] = 'Noviembre';
meses[11] = 'Diciembre';

var hoy = new Date();
var diaActual = dias[hoy.getDay()] + ' ' + hoy.getDate() + ' de ' + meses[hoy.getMonth()];

    
function horasVecFunc() {
    'use strict';
    var temp = [],
        i;
    //((a < b) ? 2 : 3); i = hoy.getHours() - 11
    for (i = 0; i <= hoy.getHours(); i += 1) {
        temp.push(i);
    }
    
    return temp;
}
var horasVec = horasVecFunc();

$(window).load(function() {
    'use strict';
    if (finished === 'true') {alert('yes');}
    else {alert('no');}
    
    alert(arrInfoAemet.length);
});


$(function () {
    'use strict';
    Highcharts.chart('contenedorTemp', {
        title: {
            text: 'Temperatura en Barcelona',
            x: -20 //center
        },
        subtitle: {
            text: diaActual,
            x: -20
        },
        xAxis: {
            categories: horasVec
        },
        yAxis: {
            title: {
                text: 'Temperatura (°C)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '°C'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Estación',
            //data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6, 1.1, 2.2, 3.3, 4.4, 3.3, 2.2, 1.1, 2.2, 3.3, 4.4]
        }, {
            name: 'Aemet',
            //data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]  
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }]
    });
});