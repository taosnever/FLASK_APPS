
$(document).ready(function () {
    'use strict';

    /************** Interpretar información del XML ******************/
    $.ajax({
        type: "GET",
        url: "static/xml/aemet.xml",
        dataType: "xml",
        success: function (xml) {
            var arrInfoAemet = [];

            $(xml).find('dia').each(function () {
                var diaInfo = {
                    fecha: $(this).attr('fecha'),
                    horasInfo: []
                };

                $(this).find('temperatura').each(function () {
                    var info = {
                        hora: parseInt($(this).attr('periodo')),
                        temp: parseInt($(this).text())
                    };
                    diaInfo.horasInfo.push(info);
                });

                var i = 0;
                $(this).find('humedad_relativa').each(function () {
                    diaInfo.horasInfo[i].hum = parseInt($(this).text());
                    i += 1;
                });

                arrInfoAemet.push(diaInfo);
            });

            /************** Obtener datos de la estacion ******************/
            var url = "http://10.192.142.204/tiempoHoy";
            $.getJSON(url,
            function(data){

                /************** Dibujar la gráfica de comparación ******************/
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


                /************** Info ejes de las graficas ******************/
                function infoAemetFunc() {
                    'use strict';
                    var horasA = [],
                        tempA = [],
                        humA = [];

                    for (var i = 0; i <= hoy.getHours(); i += 1) {
                        horasA.push(i);
                        tempA.push(arrInfoAemet[1].horasInfo[i].temp);
                        humA.push(arrInfoAemet[1].horasInfo[i].hum);
                    }

                    return [horasA, tempA, humA];
                }
                var infoAemet = infoAemetFunc();


                function infoEstacionFunc () {
                    var tempE = new Array(infoAemet[0].length),
                        humE = new Array(infoAemet[0].length);

                    tempE.fill(0);
                    humE.fill(0);

                    for (var i = 0; i < data.length; i += 1) {
                        tempE[parseInt(data[i].Hora)] = parseFloat(data[i].Temperatura);
                        humE[parseInt(data[i].Hora)] = parseFloat(data[i].Humedad);
                    }
                    return [tempE, humE];
                }

                var infoEstacion = infoEstacionFunc();


                /************** Graficas ******************/
                $(function () {
                    Highcharts.chart('contenedorTemp', {
                        title: {
                            text: 'Temperatura en Sabadell',
                            x: -20
                        },
                        subtitle: {
                            text: diaActual,
                            x: -20
                        },
                        xAxis: {
                            categories: infoAemet[0]
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
                            data: infoEstacion[0]

                        }, {
                            name: 'Aemet',
                            data: infoAemet[1]
                        }]
                    });
                });

                $(function () {
                    Highcharts.chart('contenedorHum', {
                        title: {
                            text: 'Humedad relativa en Sabadell',
                            x: -20
                        },
                        subtitle: {
                            text: diaActual,
                            x: -20
                        },
                        xAxis: {
                            categories: infoAemet[0]
                        },
                        yAxis: {
                            title: {
                                text: 'Humedad relativa (°%)'
                            },
                            plotLines: [{
                                value: 0,
                                width: 1,
                                color: '#808080'
                            }]
                        },
                        tooltip: {
                            valueSuffix: '%'
                        },
                        legend: {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'middle',
                            borderWidth: 0
                        },
                        series: [{
                            name: 'Estación',
                            data: infoEstacion[1]
                        }, {
                            name: 'Aemet',
                            data: infoAemet[2]
                        }]
                    });
                });
            });
        }
    });
});

