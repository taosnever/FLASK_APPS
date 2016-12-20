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




function modInfoSemana(diaActual) {
    'use strict';
	
    var diaFormato, urlDia;

    for (var i = 0; i < 7; i += 1) {
	var dia = diaActual.getDate();
        if (dia < 10) {
            dia = '0'+ dia;
        }

        var mes = diaActual.getMonth() + 1;
        diaFormato = diaActual.getFullYear() + '-' + mes + '-' + dia;


        urlDia = 'http://10.192.142.204/mediaDia/' + diaFormato;
	
        $.getJSON(urlDia, 
        (function(i_persistent) {
            return function(data){		
                $('#t' + i_persistent).html(data[0].Temperatura_media + ' ºC');
                $('#hu' + i_persistent).html(data[0].Humedad_media + '%');
                $('#p' + i_persistent).html(data[0].P_Atmos_media + ' hPa');

                return false;
            };
          }(i)) 
        );
        
	/* Actualizar el nombre del dia */ 
        $('#d' + i).text(dias[diaActual.getDay()] + ' ' + diaActual.getDate());

        diaActual.setDate(diaActual.getDate() - 1);
    };
}

$(document).ready(function () {
    'use strict';
    var hoy = new Date(),
        //dia_anterior = comprueba_dia(hoy.getDay()),
        horaElem;
    
    /* Mostar el dia actual */
    $('#hoy').text(dias[hoy.getDay()] + ' ' + hoy.getDate() + ' de ' + meses[hoy.getMonth()]);
   
  
    /* Añadir tantos elementos como horas pasadas */
    var url = "http://10.192.142.204/tiempoHoy";
    $.getJSON(url,
    function(data){
        for (var i = 0; i < data.length; i += 1) {
            $('<a id="h' + i + 'link"href="#!">' +
                '<p><strong>' + data[i].Hora + '</strong></p>' +
                '<table id="h' + i + '" class="table tableVal hideTable">' +
                    '<thead>' +
                        '<th>Temperatura</th>' +
                        '<th>Humedad relativa</th>' +
                        '<th>Presión atmosférica</th>' +
                    '</thead>' +
                    '<tbody>' +
                        '<td>' + data[i].Temperatura + ' ºC</td>' +
                        '<td>' + data[i].Humedad + '%</td>' +
                        '<td>' + data[i].P_atmos + ' hPa</td>' +
                    '</tbody>' +
                '</table>' +
              '</a>').addClass('list-group-item').appendTo('#horas');


            if (i === data.length-1) {
                $('#h' + i).toggleClass('hideTable showTable');
                $('#h' + i + 'link').addClass('active');
            }
        }
       return false;
    });

    
    /* Parametros meteorologicos para cada hora mostrados al hacer click */
    $('#horas').on('click', 'a', function () {
        $('.active').find('table').toggleClass('hideTable showTable');
        $('.active').removeClass('active');
        
        $(this).addClass('active');
        $(this).find('table').toggleClass('hideTable showTable');
        
    });
    
    /* Ajustar adecuadamente la tabla de nediciones con los ultimos 7 dias */
    /*
    $('#d7').text(dias[hoy.getDay()]);
    $('#d6').text(dias[dia_anterior]);
    dia_anterior = comprueba_dia(dia_anterior);
    $('#d5').text(dias[dia_anterior]);
    dia_anterior = comprueba_dia(dia_anterior);
    $('#d4').text(dias[dia_anterior]);
    dia_anterior = comprueba_dia(dia_anterior);
    $('#d3').text(dias[dia_anterior]);
    dia_anterior = comprueba_dia(dia_anterior);
    $('#d2').text(dias[dia_anterior]);
    dia_anterior = comprueba_dia(dia_anterior);
    $('#d1').text(dias[dia_anterior]);
*/
	
   /* Actualizar los datos de temp, hum, p.atm de toda la semana */
   modInfoSemana(hoy);


});
