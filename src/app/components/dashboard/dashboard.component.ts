import { Component, OnInit, ViewChild} from '@angular/core';
import { DarkService } from '../../services/darkmode/dark.service';
import { CorsService } from '../../services/cors/cors.service';
import { Chart } from "chart.js";
import { Calendar } from 'primeng/calendar';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('monthPicker') myCalendar?: Calendar;


    fechasFiltro: any[] = [];
    fechaIni: string = '';
    fechaFin: string = '';
    tipo: string = 'Servicios';

    mesIni: any;
    mesFin: any;

    anhoIni: any;
    anhoFin: any;
    /* Resumen */
    totalAudiosCargados: number = 0;

    /* Páginador */
    paginaUno: boolean = true;
    paginaDos: boolean = false;
    paginaTres: boolean = false;
    paginaCuatro: boolean = false;

    retrocede: boolean = false;
    adelanta: boolean = true;

    paginaActual: string = '';

    mode: boolean = false;
    userName: any;

    botones: any[] = [
                        {tipo: 'Servicios',
                        active: true},
                        {tipo: 'soporte'},
                        // {tipo: 'Televentas'},
                        // {tipo: 'Cobranza'},
                        {tipo: 'retenciones'}
                    ];

    categoria: string = 'Servicios';

    resumen: any[] = [
                        {nombre: 'Audios cargados',
                         icon: 'pi-cloud-upload',
                         data: ''},
                        {nombre: 'Audios evaluados',
                         icon: 'pi-sync',
                         data: '' },
                        {nombre: 'Nota de calidad',
                         icon: 'pi-verified',
                         data: ''},
                         {nombre: 'Ejecutivos Evaluados',
                         icon: 'pi-users',
                         data: ''},
                         {nombre: 'Montitoreo x Asesor',
                         icon: 'pi-file-edit',
                         data: ''}
                    ];

    headersIndicador: string[] = [
        'Mes',
        'Audios Cargados',
        'Evaluaciones MarIAna',
        '% Llamadas evaluadas',
        '% Llamadas no evaluadas',
        '# Ejecutivos evaluados',
        'Monitoreos por asesor',
        'Nota de Calidad',
        '% Precisión/Calibrado'
    ];

    llamadasEvaluadasData: any[] = [];
    llamadasEvaluadasLabels: any[] = [];
    llamadasEvaluadasOptions: any;

    headersOperativos: string[] = [
        'Mes',
        'Nota de Calidad',
        'Evaluaciones MarIAna',
        'Clientes reincidentes',
        '% Clientes reincidentes',
        'Clientes Insatisfechos',
        '% Clientes Insatisfechos',
        'Sentimiento Negativo',
        'Sentimiento Neutro',
        'Sentimiento Positivo',
        'Indice de sentimiento'

    ]

    dataIndicador: any[] = [];

    basicData: any;
    basicData2: any;
    calificacionesData: any;
    basicOptions: any;

    /* Fecha Dashboard */
    fullFecha: any;
    audiosCargadosMes: any = 0;
    audiosAnalizadosMes: any = 0;
    mesActualGrafico: string = '';

    mensajeBienvenida: string = '';



    /* Gráficas */
    cumplimientoOptions: any = {};
    cumplimientoLabels: string[] = [];
    cumplimientoLegend: boolean = false;
    cumplimientoData: any[] = [];

    cargadosAnalizadosOptions: any;
    cargadosAnalizadosLabels: any[] = [];
    cargadosAnalizadosLegend: boolean = true;
    cargadosAnalizadosData: any[] = [];

    cargadosAnalizadosStackedOptions: any = {};
    cargadosAnalizadosStackedLabels: any[] = [];
    cargadosAnalizadosStackedLegend: boolean = false;
    cargadosAnalizadosStackedData: any;
    notaCalidadData: any[] = [];

    miGraficaOptions: any = {};
    miGraficaData: any;

    statsCalifData: any = [];
    statsCalifOptions: any ;

    solucionClienteData: any = [];
    solucionClienteOptions: any = [];

    monitoreoPorDivisionData: any = [];
    monitoreoPorDivisionOptions: any = [];

    notaCalidadOptions: any = [];

    notaCalidadLabels: string[] = [];
    notaCalidadLegend: boolean = true;

    headersIndicadorGeneral: any[] = ["Año","Cargados", "Analizados", "%Analizados", "Nota", "Ejecutivos", ">80", "%>80", "70-80", "%70-80", "60-69", "%60-69", "<60", "%<60", "%No Solución"];
    headersAreasOportunidad: any[] = ["Año", "Apertura y Cierre", "Habilidades de escucha y comunicación", "Cortesía y etiqueta", "Manejo de tiempos", "Validación de datos", "Sondeo y análisis", "Apego a políticas y procedimientos", "Solución y confirmación", "Manejo de información"];
    headersEmociones: any[] = ["Año", "Negatividad", "Neutralidad", "Positividad", "Sentimiento General"];

    audios: any[] = [{anho: '2023', cargados: 1500}];

    reload: boolean = true;

    sinDatos: boolean = false;

    mesesLetra: string[] = ['nada', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    mesesNum: string[] = ['nada', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12']
    mesesCalidadMonitoreoLetra: string[] = [];
    mesesCalidadMonitoreoNumero: string[] = [];
    calidadMonitoreoNota: any[] = [];
    calidadMonitoreoMonitoreo: any[] = [];


    /* Gráfica Cargados vs Analizados */
    audiosCargados: any;
    audiosAnalizados: any;

    /* Gráfica cargados vs analizados stacker */
    audiosCargadosStacked: any;
    audiosAnalizadosStacked: any;
    labelStacked: any[] = [];

    areasOportunidadData: any[] = [];


    /* Fecha tablas */
    fechaIniTab: string = '';
    fechaFinTab: string = '';

    subcategorias: any[] = [];

    rotationDegrees: any = 90;

    constructor(private dark: DarkService, private cors: CorsService) {

    }

    ngAfterViewInit() {
        const canvasPie = document.getElementById('myChart') as HTMLCanvasElement;
        if (canvasPie) {
            const ctxPie = canvasPie.getContext('2d');
            if (ctxPie) {
                const myPieChart = new Chart(ctxPie, {
                    type: 'pie',
                    data: this.monitoreoPorDivisionData,
                    options: this.monitoreoPorDivisionOptions
                });
            }
        }
    
        const canvasBar = document.getElementById('myBarChart') as HTMLCanvasElement;
        if (canvasBar) {
            const ctxBar = canvasBar.getContext('2d');
            if (ctxBar) {
                const myBarChart = new Chart(ctxBar, {
                    type: 'bar',
                    data: {
                        labels: this.llamadasEvaluadasLabels,
                        datasets: this.llamadasEvaluadasData
                    },
                    options: this.llamadasEvaluadasOptions
                });
            }
        }

        const canvasNota = document.getElementById('myNotaChart') as HTMLCanvasElement;
        if (canvasNota) {
            const ctxNota = canvasNota.getContext('2d');
            if (ctxNota) {
                const myNotaChart = new Chart(ctxNota, {
                    type: 'bar', // Cambia esto al tipo de gráfico que necesites
                    data: {
                        labels: this.notaCalidadLabels,
                        datasets: this.notaCalidadData
                    },
                    options: this.notaCalidadOptions
                });
            }
        }

        const canvasCumplimiento = document.getElementById('myCumplimientoChart') as HTMLCanvasElement;
        if (canvasCumplimiento) {
            const ctxCumplimiento = canvasCumplimiento.getContext('2d');
            if (ctxCumplimiento) {
                const myCumplimientoChart = new Chart(ctxCumplimiento, {
                    type: 'bar', // Cambia esto al tipo de gráfico que necesites
                    data: {
                        labels: this.cumplimientoLabels,
                        datasets: this.cumplimientoData
                    },
                    options: this.cumplimientoOptions
                });
            }
        }

        const canvasStatsCalif = document.getElementById('myStatsCalifChart') as HTMLCanvasElement;
        if (canvasStatsCalif) {
            const ctxStatsCalif = canvasStatsCalif.getContext('2d');
            if (ctxStatsCalif) {
                const myStatsCalifChart = new Chart(ctxStatsCalif, {
                    type: 'doughnut',
                    data: this.statsCalifData,
                    options: this.statsCalifOptions
                });
            }
        }

        const canvasSolucionCliente = document.getElementById('mySolucionClienteChart') as HTMLCanvasElement;
        if (canvasSolucionCliente) {
            const ctxSolucionCliente = canvasSolucionCliente.getContext('2d');
            if (ctxSolucionCliente) {
                const mySolucionClienteChart = new Chart(ctxSolucionCliente, {
                    type: 'doughnut',
                    data: this.solucionClienteData,
                    options: this.solucionClienteOptions
                });
            }
        }

        const canvasCargadosAnalizados = document.getElementById('myCargadosAnalizadosChart') as HTMLCanvasElement;
    if (canvasCargadosAnalizados) {
        const ctxCargadosAnalizados = canvasCargadosAnalizados.getContext('2d');
        if (ctxCargadosAnalizados) {
            const myCargadosAnalizadosChart = new Chart(ctxCargadosAnalizados, {
                type: 'bar',
                data: {
                    labels: this.cargadosAnalizadosLabels,
                    datasets: this.cargadosAnalizadosData
                },
                options: this.cargadosAnalizadosOptions
            });
        }
    }

    const canvasCargadosAnalizadosStacked = document.getElementById('myCargadosAnalizadosStackedChart') as HTMLCanvasElement;
    if (canvasCargadosAnalizadosStacked) {
        const ctxCargadosAnalizadosStacked = canvasCargadosAnalizadosStacked.getContext('2d');
        if (ctxCargadosAnalizadosStacked) {
            const myCargadosAnalizadosStackedChart = new Chart(ctxCargadosAnalizadosStacked, {
                type: 'doughnut',
                data: this.cargadosAnalizadosStackedData,
                options: this.solucionClienteOptions
            });
        }
    }

    const canvasMiGrafica = document.getElementById('miGrafica') as HTMLCanvasElement;
    if (canvasMiGrafica) {
        const ctxMiGrafica = canvasMiGrafica.getContext('2d');
        if (ctxMiGrafica) {
            const myMiGraficaChart = new Chart(ctxMiGrafica, {
                type: 'line',
                // Aquí necesitarás proporcionar tus propios datos y opciones para este gráfico
                data: this.miGraficaData,
                options: this.miGraficaOptions
            });
        }
    }
    }
    

    ngOnInit(): void {
        this.getFecha();

        this.darkModeSubscription();
        this.userName = sessionStorage.getItem('user_id');


        this.detectarPagina();

        this.fetchAudiosUploaded();

        this.fetchStatsCalif();

        this.fetchSolucionCliente();

        this.fetchCalidadMonitoreo();

        this.fetchcargadosAnalizados();

        this.fetchIndicadorGeneral();

        this.fetchCumplimiento();

        this.fetchShortSubs();

        this.fetchTotalesZonas();


        this.labelStacked = [this.mesActualGrafico];

    }

    categoriaSelect(cat: any) {
        this.botones.forEach((boton: any) => {
            if(boton.active) {
                console
                boton.active = false;
            }
            this.sinDatos = true;
        })

        cat.active = true;
        this.tipo = '';
        this.tipo = cat.tipo;
        this.fetchData();

    }

    fetchAudiosUploaded() {
        const data = {
            ini: this.fechaIni,
            fin: this.fechaFin,
            tipo: this.tipo,
            owner: this.userName
        }

        this.cors.post('DashboardController/fetchAudiosUploaded', data).subscribe(
            (res: any) => {
                if(res.res > 0) {
                    this.sinDatos = false;
                     this.fetchEmociones(data);

                    this.totalAudiosCargados = 0;

                    this.resumen[0].data = res.res;
                    this.totalAudiosCargados = res.res;
                    this.fetchAudiosAnalyzed(data);
                    this.fetchEmociones(data);
                    this.nivelCalidad()

                } else {
                    console.log()
                    this.resumen[0].data = 0;
                    this.resumen[1].data = 0 + '%';
                    this.resumen[2].data = 0 + '%';
                    this.resumen[3].data = 0;
                    this.resumen[4].data = 0;
                    this.porcentajeTotales = 0;
                    this.rotationDegrees = 90;

                }
            },
            (err: any) => {
                console.log(err)
            }
        )
    }

    sumaTotales: number = 0
    porcentajeTotales: any = 0;

    nivelCalidad() {
        this.sumaTotales = 0;

        const data = {
            ini: this.fechaIni,
            fin: this.fechaFin,
            tipo: this.tipo,
            owner: this.userName
        }

        this.cors.post('dashboardController/fetchCalidad', data).subscribe(
            (res: any) => {
                const data = res.data;

                this.calcularNotaCalidad(data);
                let conteosNull = 0;

                data.forEach( (e: any) => {
                    if(e['suma_resultados'] != null) {
                        this.sumaTotales = this.sumaTotales + (e['suma_resultados'] / e['total_elementos']);
                    } else {
                        conteosNull++;
                    }
                })

                this.sumaTotales = this.sumaTotales / (data.length - conteosNull);

                if(!isNaN(this.sumaTotales)) {
                    // this.porcentajeTotales = (this.sumaTotales * 100) / 85;

                    // this.rotationDegrees = (this.porcentajeTotales * 180) / 100;

                    // this.rotationDegrees = this.rotationDegrees + 90;

                    // this.porcentajeTotales = parseInt(this.porcentajeTotales);
                } else {
                    this.rotationDegrees = 90;
                }


            },
            (err: any) => {
                console.log(err)
            }
        )
    }

    calcularNotaCalidad(data: any) {
        let sumaTotales = 0;
        let totalContadosAnalizados = 0;


        data.forEach((element: any) => {
            sumaTotales = sumaTotales + Number(element.suma_resultados);
            totalContadosAnalizados = totalContadosAnalizados + Number(element.total_elementos);
        })


        let totalEsperado = totalContadosAnalizados * 100;

        let notaCalidadDash = (sumaTotales * 100) / totalEsperado;

        if(notaCalidadDash > 0) {
            this.resumen[2].data = Number(notaCalidadDash.toFixed(2)) + '%';
            this.porcentajeTotales = Number(notaCalidadDash.toFixed(2)) + '%';
            this.rotationDegrees = (Number(notaCalidadDash.toFixed(2)) * 180) / 100;

            this.rotationDegrees = this.rotationDegrees + 100;
        } else {
            this.rotationDegrees = 90;
        }

    }

    fetchEjecutivosEvaluados() {
        const data = {
            ini: this.fechaIni,
            fin: this.fechaFin,
            tipo: this.tipo,
            owner: this.userName
        }

        this.cors.post('DashboardController/fetchEjecutivosEvaluados', data).subscribe(
            (res: any) => {
                if(res.data > 0 ) {
                    this.resumen[3].data = res.data;
                    let notaCalidad = Number(this.audiosAnalizados[0]) / Number(res.data);
                    this.resumen[4].data = Number(notaCalidad.toFixed(2));
                } else {
                    this.resumen[3].data = 0
                    this.resumen[4].data = 0
                }

            },
            (err: any) => {
                console.log(err)
            }
        )
    }


    fetchAudiosAnalyzed(data: any) {
        this.cors.post('DashboardController/fetchAudiosAnalyzed', data).subscribe(
            (res: any) => {
                if(res.status) {
                    this.audiosAnalizadosMes = res.res;

                    const porcentaje = ((res.res * 100) / this.totalAudiosCargados);

                    this.resumen[1].data = Math.floor(porcentaje) + '%'
                } else {
                    this.resumen[1].data = 0 + '%';
                }
            },
            (err: any) => {
                console.log(err)
            }
        )
    }

    fetchStatsCalif() {
        const data = {
            ini: this.fechaIni,
            fin: this.fechaFin,
            tipo: this.tipo,
            owner: this.userName
        }

        this.cors.post('dashboardController/getStatsCalif', data).subscribe(
            (res: any) => {
                this.statsCalif(res);
            },
            (err: any) => {
                console.log(err)
            }
        )
    }

    /* Genera la gráfica */
    statsCalif(res: any) {
        let mayor80 = 0;
        let entre7080 = 0;
        let entre6069 = 0;
        let menor60 = 0;

        if(res.status) {
            const rangos = res.rangos;
            this.sinDatos = false;
            mayor80 = rangos.mayor80;
            entre7080 = rangos.entre7080;
            entre6069 = rangos.entre6069;
            menor60 = rangos.menorigual59;
        } else {
            this.sinDatos = true;
        }

        this.statsCalifData = {
            labels: ['Mayor a 80', 'Entre 70 y 80', 'Entre 60 y 70', 'Menor de 60'],
            datasets: [
                {
                  data: [mayor80, entre7080, entre6069, menor60], // Datos inventados
                  backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)', 'rgba(255, 206, 86, 0.5)', 'rgba(75, 192, 192, 0.5)'], // Colores pastel
                  borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)'], // Bordes del mismo color que el relleno
                  borderWidth: 1 // Grosor del borde
                }
            ]
        };

        this.statsCalifOptions = {
            plugins: {
              legend: {
                labels: {
                  color: 'white', // Color de texto para las leyendas
                }
              },
              tooltip: {
                titleFont: {
                  size: 16,
                  weight: 'bold',
                },
                bodyFont: {
                  size: 14,
                },
                bodyColor: 'white', // Color de texto para los tooltips
                titleColor: 'white'
              }
            }
        };


    }

    crearGrafica() {
        const canvas = document.getElementById('miGrafica') as HTMLCanvasElement;
        if (!canvas) return;

        const ctxTres = canvas.getContext('2d');
        if (!ctxTres) return;

        const miGrafica = new Chart(ctxTres, {
          type: 'line',

          data: {
            labels: [this.mesActualGrafico, 'Febrero'],
            datasets: [{
              label: '% Negatividad',
              data: [Number(this.negatividadTotal),0],
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
            },
            {
              label: '% Neutralidad',
              data: [this.neutralidadTotal,0],

              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            },
            {
                label: '% Positividad',
                data: [this.positividadTotal,0],

                backgroundColor: 'rgba(4, 182, 100, 1)',
                borderColor: 'rgba(4, 182, 100, 1)',
                borderWidth: 1
              },
            {
                label: '% Sentimiento general',
                data: [32,0], // Datos de ejemplo para el Producto C
                backgroundColor: 'rgba(128, 128, 128, 0.3)', // Color gris con opacidad
                borderColor: 'rgba(128, 128, 128, 1)',
                borderWidth: 1,
                fill: 'start' // Rellena el área debajo de la línea
            }]
          },

          options: {
            scales: {
              y: {
                stacked: false,
                ticks: {
                    callback: function(value, index, values) {
                        // Asegurarse de que 'value' sea un número
                        const numericValue = Number(value);
                        return numericValue.toFixed(0) + '%';
                      },
                  color: 'white' // Color de los textos de las marcas del eje Y
                },
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)' // Color de las líneas de la cuadrícula
                }
              },
              x: {
                ticks: {
                  color: 'white' // Color de los textos de las marcas del eje X
                },
                grid: {
                  color: 'rgba(255, 255, 255, 0.1)' // Color de las líneas de la cuadrícula
                }
              }
            },
            plugins: {
              legend: {
                labels: {
                  color: 'white' // Color de los textos de la leyenda
                }
              },
              tooltip: {
                callbacks: {
                  label: function(context) {
                    let label = context.dataset.label || '';

                    if (label) {
                      label += ': ';
                    }
                    if (context.parsed.y !== null) {
                      label += context.parsed.y.toFixed(2) + '%';
                    }
                    return label;
                  }
                }
            }}
          }
        });
    }

    fetchSolucionCliente() {
        const data = {
            ini: this.fechaIni,
            fin: this.fechaFin,
            tipo: this.tipo,
            owner: this.userName
        }

        this.cors.post('dashboardController/fetchSolucionCliente', data).subscribe(
            (res: any) => {
                this.solucionCliente(res)
            },
            (err: any) => {
                console.log(err)
            }
        )
    }

    solucionCliente(res: any) {
        const totalAudiosAn = res.res;
        const noSolucion = Math.round((res.noSolucion * 100) / totalAudiosAn);
        const solucion = Math.round((res.solucion * 100) / totalAudiosAn);

        this.solucionClienteData = {
          labels: ['No Solución', 'Solución'],
          datasets: [
            {
              data: [noSolucion, solucion],
              backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)'],
              borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
              borderWidth: 1,
            },
          ],
        };

        this.solucionClienteOptions = {
          plugins: {
            legend: {
              labels: {
                color: 'white',
              },
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem: any) => {
                  const value = tooltipItem.formattedValue
                  return value + '%'; // Agrega el símbolo '%' al valor del tooltip
                },
              },
              titleFont: {
                size: 16,
                weight: 'bold',
              },
              bodyFont: {
                size: 14,
              },
              bodyColor: 'white',
              titleColor: 'white',
            },
          },
        };
    }


    async fetchCalidadMonitoreo() {
        this.calidadMonitoreoNota = [];
        this.calidadMonitoreoMonitoreo = [];

        this.mesesCalidadMonitoreoLetra = this.mesesLetra.slice(this.mesIni, this.mesFin + 1);
        this.mesesCalidadMonitoreoNumero = this.mesesNum.slice(this.mesIni, this.mesFin + 1);



        try {
            for (const mes of this.mesesCalidadMonitoreoNumero) {
                const data = {
                    ini: `${this.anhoIni}-${mes}-01 00:00:00`,
                    fin: `${this.anhoFin}-${mes}-${this.obtenerDiasEnElMes(Number(mes) - 1)} 23:59:59`,
                    tipo: this.tipo,
                    owner: this.userName
                };

                const res: any = await this.cors.post('dashboardController/fetchCalidadMonitoreo', data).toPromise();
                if (res.status) {
                    this.calidadMonitoreoNota.push(Number(res.cargados));
                    this.calidadMonitoreoMonitoreo.push(res.analizados);
                } else {
                    this.calidadMonitoreoNota.push(0);
                    this.calidadMonitoreoMonitoreo.push(0);
                }
            }

            this.calidadyMonitoreo();
        } catch (error) {
            console.log(error);
        }
    }

    calidadyMonitoreo() {
        this.notaCalidadLabels = this.mesesCalidadMonitoreoLetra;
        this.notaCalidadData = [
            {
              data: this.calidadMonitoreoNota,
              label: 'Nota',
              type: 'bar'
            },
            {
              data: this.calidadMonitoreoMonitoreo,
              label: 'Monitoreo',
              type: 'line',
              fill: true
            }
        ];

        this.notaCalidadOptions = {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    labels: {
                        color: 'white' // Color de las leyendas (si es necesario)
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: 'white' // Cambia el color de las etiquetas del eje X a blanco
                    }
                },
                y: {
                    ticks: {
                        color: 'white' // Cambia el color de las etiquetas del eje Y a blanco
                    }
                }
            }
        };
    }

    fetchCumplimiento() {
        const data = {
            ini: this.fechaIni,
            fin: this.fechaFin,
            tipo: this.tipo,
            owner: this.userName
        }

        this.cors.post('dashboardController/fetchCumplimiento', data).subscribe(
            (res: any) => {
                const subs = res.subcat;
                this.subcategorias = res.subcat;

                const resultado = this.subcategorias.filter(subcategoria => subcategoria.nombre_subcategoria != 'Groserias' && subcategoria.nombre_subcategoria != 'Manejo de Herramientas');
                this.subcategorias = resultado;

                const agrup = res.data;

                let labels: any[] = [];
                let agrupadas: any[] = [];

                subs.forEach( (sub: any) => {
                    if(sub.nombre_subcategoria != 'Groserias') {
                        labels.push(sub.nombre_subcategoria);
                    }
                })

                const sumBySubcategoria: any = {};

                let nuevoArray: any[] = [];

                agrup.forEach((element: any) => {

                    if (!sumBySubcategoria[element.subcategoria]) {
                        sumBySubcategoria[element.subcategoria] = 0;
                    }

                    sumBySubcategoria[element.subcategoria] += parseInt(element.Valor, 10);
                });

                for(let i = 1 ; i<=9; i++) {
                    if( sumBySubcategoria[i] != undefined ) {
                        nuevoArray.push(sumBySubcategoria[i]);
                        agrupadas.push(sumBySubcategoria[i]);
                    }

                }

                this.creaGraficasSemi(nuevoArray);



                this.cumplimento(labels, nuevoArray);

                this.cumplimientoLabels = labels;

                this.fetchAreasOportunidad(agrupadas);



            },
            (err: any) => {
                console.log(err);
            }
        );

    }

    creaGraficasSemi(calificacionSubs: any) {

        if(calificacionSubs.length > 0) {
            let esperado = this.audiosAnalizadosMes;
            let may90 = '#01b8aa';
            let entre8090 = '#f2c80f';
            let menor80 = '#fd625e';

            this.subcategorias.forEach((sub: any, index: number) => {
                let porcSub = Math.round( ( calificacionSubs[index] * 100 ) / esperado );
                let rotate = (porcSub / 100) / 2;

                sub.porc = porcSub;
                sub.rotate = rotate;
                if(porcSub >= 90) {
                    sub.color = may90;
                }

                if(porcSub >= 80 && porcSub < 90 ) {
                    sub.color = entre8090;
                }

                if(porcSub < 80 ) {
                    sub.color = menor80;
                }
            })
        } else {
            this.subcategorias.forEach((sub: any, index: number) => {

                sub.porc = 0;

            })
        }
    }

    cumplimento(labels: any, dataC: any) {
        this.cumplimientoOptions = {
            scales: {
                x: {
                    ticks: {
                        color: 'white' // Cambia el color de las etiquetas del eje X a blanco
                    }
                },
                y: {
                    ticks: {
                        color: 'white' // Cambia el color de las etiquetas del eje Y a blanco
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            barPercentage: 0.2,
            categoryPercentage: 1,
            plugins: {
                legend: {
                    labels: {
                        color: 'white'
                    }
                }
            }
        };


        this.cumplimientoLegend = true;

        this.cumplimientoData = [
            {
                data: dataC,
                label: '% de cumplimiento',
                backgroundColor: 'rgba(255, 99, 132, 1)'
            }
        ];

    }

    async fetchcargadosAnalizados() {
        this.audiosCargados = [];
        this.audiosAnalizados = [];

        this.mesesCalidadMonitoreoLetra = this.mesesLetra.slice(this.mesIni, this.mesFin + 1);
        this.mesesCalidadMonitoreoNumero = this.mesesNum.slice(this.mesIni, this.mesFin + 1);



        try {
            for (const mes of this.mesesCalidadMonitoreoNumero) {
                const data = {
                    ini: `${this.anhoIni}-${mes}-01 00:00:00`,
                    fin: `${this.anhoFin}-${mes}-${this.obtenerDiasEnElMes(Number(mes) - 1)} 23:59:59`,
                    tipo: this.tipo,
                    owner: this.userName
                };

                const res: any = await this.cors.post('dashboardController/fetchCalidadMonitoreo', data).toPromise();

                if (res.status) {
                    this.audiosCargados.push(Number(res.cargados));
                    this.audiosAnalizados.push(res.analizados);
                    this.fetchEjecutivosEvaluados();
                } else {
                    this.audiosCargados.push(0);
                    this.audiosAnalizados.push(0);
                }
            }

            this.cargadosAnalizados();
        } catch (error) {
            console.log(error);
        }
    }

    cargadosAnalizados() {
        this.cargadosAnalizadosOptions = {
            responsive: true,
            scales: {
                x: {
                    ticks: {
                        color: 'white'
                    }
                },
                y: {
                    ticks: {
                        color: 'white'
                    }
                }
            },
            plugins: {
              legend: {
                labels: {
                  color: 'white'
                }
              }
            }
        };

        this.cargadosAnalizadosLabels = this.mesesCalidadMonitoreoLetra;

        this.cargadosAnalizadosLegend = true;

        this.cargadosAnalizadosData = [
            { data: this.audiosCargados, label: 'Audios Cargados' },
            { data: this.audiosAnalizados, label: 'Audios Analizados' }
        ];

        this.cargadosAnalizadosStacked();
    }

    cargadosAnalizadosStacked() {
        const sinAnalizar = Number(this.audiosCargados[0]) - Number(this.audiosAnalizados[0]);

        const porcAnalizados = Math.round((( Number(this.audiosAnalizados[0]) * 100) / Number(this.audiosCargados[0]) ))
        const porcNoAnalizados = Math.round((( sinAnalizar * 100) / Number(this.audiosCargados[0]) ))

        this.cargadosAnalizadosStackedOptions = {
            scaleShowVerticalLines: false,
            responsive: true,
            scales: {
                x: {
                    ticks: {
                        color: 'white' // Cambia el color de las etiquetas del eje X a blanco
                    },
                    barPercentage: 0.2 // Ajusta este valor según el ancho que desees para la barra (0.5 indica el 50% del espacio disponible)
                },
                y: {
                    ticks: {
                        color: 'white' // Cambia el color de las etiquetas del eje Y a blanco
                    }
                }
            },
            plugins: {
                legend: {
                  labels: {
                    color: 'white' // Color blanco para las etiquetas de la leyenda
                  }
                }
            }
        };

        this.cargadosAnalizadosStackedLabels = this.labelStacked;
        this.cargadosAnalizadosStackedLegend = true;

        this.cargadosAnalizadosStackedData = {
            labels: ['% Analizados', '% No Analizados'],
            datasets: [
              {
                data: [porcAnalizados, porcNoAnalizados],
                backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1,
              },
            ],
        };

        console.log()
    }

    dataIndicadorGeneral: any[] = [];

    fetchIndicadorGeneral() {
        const fechaActual = new Date();

        const data = {
            'ini': this.fechaIniTab,
            'fin': this.fechaFinTab,
            'tipo': this.tipo,
            owner: this.userName
        }

        this.cors.post('DashboardController/fetchIndicadorGeneral', data).subscribe(
            (res: any) => {
                const totalCargados = res.total.totalCargados;
                const totalAnalizados = res.total.totalAnalizados;
                const rangos = res.rangos;
                let tempData = {};

                const porcAnalizados = Math.floor(((res.total.totalAnalizados * 100)) / res.total.totalCargados);

                const mayor80P = Math.floor( (rangos.mayor80 * 100) / totalAnalizados );
                const entre7080P = Math.floor( (rangos.entre7080 * 100) / totalAnalizados );
                const entre6069P = Math.floor( (rangos.entre6069 * 100) / totalAnalizados );
                const menor59P = Math.floor( (rangos.menorigual59 * 100) / totalAnalizados );

                let firstData = {
                    zona: 'Diciembre'
                }

                tempData = {
                    zona: 'Apodaca',
                    cargados: totalCargados,
                    analizados: res.total.totalAnalizados,
                    porcAnalizados: porcAnalizados,
                    nota: '1',
                    ejecutivos: '2',
                    mayor80: rangos.mayor80,
                    mayor80P,
                    entre7080: rangos.entre7080,
                    entre7080P,
                    entre6069: rangos.entre6069,
                    entre6069P,
                    menor59: rangos.menorigual59,
                    menor59P,
                    noSolucion: '2'
                }

                let tempData2 = {
                    zona: 'Metro',
                    cargados: totalCargados,
                    analizados: res.total.totalAnalizados,
                    porcAnalizados: porcAnalizados,
                    nota: '2',
                    ejecutivos: '2',
                    mayor80: rangos.mayor80,
                    mayor80P,
                    entre7080: rangos.entre7080,
                    entre7080P,
                    entre6069: rangos.entre6069,
                    entre6069P,
                    menor59: rangos.menorigual59,
                    menor59P,
                    noSolucion: '2'
                }

                let tempData3 = {
                    zona: 'Cuernavaca',
                    cargados: totalCargados,
                    analizados: res.total.totalAnalizados,
                    porcAnalizados: porcAnalizados,
                    nota: '1',
                    ejecutivos: '2',
                    mayor80: rangos.mayor80,
                    mayor80P,
                    entre7080: rangos.entre7080,
                    entre7080P,
                    entre6069: rangos.entre6069,
                    entre6069P,
                    menor59: rangos.menorigual59,
                    menor59P,
                    noSolucion: '3'
                }

                this.dataIndicadorGeneral.push(firstData);

                this.dataIndicadorGeneral.push(tempData);
                this.dataIndicadorGeneral.push(tempData2);
                this.dataIndicadorGeneral.push(tempData3);
            },
            (err: any) => {
                console.log(err);
            }
        )
    }

    fetchAreasOportunidad(data: any) {
        this.areasOportunidadData = data;

        this.areasOportunidadData.unshift('2023');
    }

    emocionesData: any[] = [];

    fetchEmociones(data: any) {
        this.cors.post('DashboardController/fetchEmociones', data).subscribe(
            (res: any) => {
                data = res.data[0]


                const keys = ['negatividad', 'neutralidad', 'positividad'];
                let arrayEmociones: any = [2023];

                keys.forEach(key => {
                   arrayEmociones.push((data[key]));
                });

                arrayEmociones.push('Sent general');


                this.emocionesData = arrayEmociones;
            },
            (err: any) => {
                console.log(err);
            }
        )
    }

    zonaToFetch: string = '';

    moreInfo(data: any) {
        this.zonaToFetch = '';
        this.zonaToFetch = data.Zona;
        this.fullDataIndicadores = [];

        let zona = data.Zona;

        this.fetchFullInfoZona(zona, data);
    }
    fullDataIndicadores: any[] = [];
    fullDataResumenIndicadores: any[] = [];
    totalesZonas: any[] = [];

    fetchTotalesZonas() {
        const data = {
            'ini': this.fechaIni,
            'fin': this.fechaFin,
            'tipo': this.tipo,
            owner: this.userName
        }

        this.cors.post('DashboardController/fetchZonas', data).subscribe(
            (res: any) => {
                this.totalesZonas = res.data;
                this.fetchIndicadorGeneralTabla();
            },
            (err: any) => {
                console.log(err);
            }
        )
    }

    fetchFullInfoZona(zona: string, arrayOriginal: any) {
        const fechaActual = new Date();

        const mes = fechaActual.getMonth();
        const anho = fechaActual.getFullYear();

        let iteraciones = this.obtenerDiasEnElMes(mes);
        const data = {
            owner: this.userName,
            mes: mes+1,
            anho,
            zona,
            iteraciones,
            tipo: this.tipo
        }

        this.cors.post('DashboardController/fetchDataIndicadorMesCompleto', data).subscribe(
            (res: any) => {
                let resDb = [];
                resDb = res.data;

                resDb.forEach(( row: any, index: number) => {

                    if(row.length != 0) {
                        const cargadas = row[0].Total;
                        const evaluadas = row[0].Alizzia;
                        const noEvaluadas = cargadas - evaluadas;

                        row[0].evaluadas = Math.round( ( evaluadas * 100 ) / cargadas );
                        row[0].noEvaluadas = Math.round( ( noEvaluadas * 100 ) / evaluadas );
                        let monitoreosAsesor = evaluadas / row[0].TotalIdAsesor;
                        row[0].asesor =  Number(monitoreosAsesor.toFixed(2));
                        let esperado = evaluadas * 100;
                        let notaCalidad = ( res.sumas[index] * 100 ) / esperado;
                        row[0].nota =  Number(notaCalidad.toFixed(2)) + '%';
                        row[0].precision = 'Pend';
                    }

                    if(row.length === 0) {
                        let obj = {
                            'Zona': '',
                            'Total': "0",
                            'Alizzia': "0",
                            'evaluadas': "0",
                            'noEvaluadas': "0",
                            'TotalIdAsesor': "0",
                            'asesor': "0",
                            'nota': "0",
                            'precision': '-'
                        };

                        row.push(obj);
                    }

                    row[0].Zona = index + 1;

                })

                this.fullDataIndicadores = resDb;
                this.agrupaResumenIndicadoresFullData();

                arrayOriginal.showInfo = !arrayOriginal.showInfo
            },
            (err: any) => {
                console.log(err);
            }
        )
    }

    agrupaResumenIndicadoresFullData() {
        this.fullDataResumenIndicadores = [];

        const fechaActual = new Date();

        const mes = fechaActual.getMonth();
        const anho = fechaActual.getFullYear();

        let iteraciones = this.obtenerDiasEnElMes(mes);
        const data = {
            owner: this.userName,
            mes: mes + 1,
            anho,
            zona: this.zonaToFetch,
            iteraciones
        }

        this.cors.post('dashboardController/fetchDataResumenIndicadorMesCompleto', data).subscribe(
            (res: any) => {
                let reincidentes = res.reincidentes;

                this.fullDataResumenIndicadores.forEach((element: any, index: number) => {
                    element.reincidentes = Number(reincidentes[index]);

                    element.insatisfechos = res.insatisfechos[index];

                    if(reincidentes[index] > 0) {
                        let reincidenciaPorc = (reincidentes[index] * 100) / element.Total;
                        element.reincidentesPorc = (reincidenciaPorc).toFixed(2) + '%';
                    }

                    if(res.insatisfechos[index] > 0) {
                        let insatisfechosPorc = (res.insatisfechos[index] * 100) / element.Total;
                        element.insatisfechosPorc = (insatisfechosPorc).toFixed(2) + '%';
                    }

                    element.neutro = res.neutralidad[index];
                    element.positivo = res.positividad[index];
                    element.negativo = res.negatividad[index];
                    element.general = res.general[index];
                })
            },
            (err: any) => {
                console.log(err)
            }
        )

        this.fullDataIndicadores.forEach( (data: any) => {

            let row = data[0];

            let obj = {
                'Zona': row.Zona,
                'Total': row.Total,
                'nota': row.nota,
                'MarIAna': row.Alizzia,
                'reincidentes': 0,
                'reincidentesPorc': 0,
                'insatisfechos': 0,
                'insatisfechosPorc': 0,
                'negativo': 0,
                'neutro': 0,
                'positivo': 0,
                'general': 0
            }

            this.fullDataResumenIndicadores.push(obj);

        })


        // console.log(this.fullDataIndicadores)

    }

    generarLlamadasEvaluadas(dataDB: any) {
        this.llamadasEvaluadasData = [];
        this.llamadasEvaluadasLabels = [];

        this.llamadasEvaluadasOptions = {
            responsive: true,
            scales: {
                x: {
                    ticks: {
                        color: 'white'
                    }
                },
                y: {
                    ticks: {
                        color: 'white'
                    }
                }
            },
            plugins: {
              legend: {
                labels: {
                  color: 'white'
                }
              }
            }
        };

        this.llamadasEvaluadasLabels.push(this.mesActualGrafico);

        let colors = ['x', '#CC0494', '#32CBCB', '#EE7D30', '#FDCC03'];

        dataDB.forEach((element: any, index: number) => {
            if(element.Zona != this.mesActualGrafico) {
                let obj = {
                    data: [element.Total],
                    label: element.Zona,
                    backgroundColor: colors[index],
                    borderColor:colors[index],
                }

                this.llamadasEvaluadasData.push(obj);
            }

        });

    }

    getFecha() {
        this.fechasFiltro[0] = new Date();
        const fechaActual = new Date();
        let hora = fechaActual.getHours();

        const horaCadena = hora.toString();


        if(horaCadena >= '0' || horaCadena <= '11') {
            this.mensajeBienvenida = 'Buen día';
        }

        if(horaCadena >= '12' && horaCadena <= '19') {
            this.mensajeBienvenida = 'Buena tarde';
        }

        if(horaCadena >= '20' && horaCadena <= '23') {
            this.mensajeBienvenida = 'Buena noche';
        }

        const diaDelMes = fechaActual.getDate();
        const dia = fechaActual.getDay();
        const mes = fechaActual.getMonth();
        const año = fechaActual.getFullYear();

        this.fechaIniTab = `${año}-01-01 00:00:00`;
        this.fechaFinTab = `${año}-12-31 23:59:59`;

        this.anhoIni = año;
        this.anhoFin = año;

        /* Meses para la consulta SQL */
        const mesActual = mes + 1;

        /* El mes que se obtiene es 1 menos al actual, ejemplo 10 representa nov */
        /*
            0 - ENERO
            1- FEBRERO
            2 - MARZO
            3 - ABRIL
            4 - MAYO
            5 - JUNIO
            6 - JULIO
            7 - AGOSTO
            8 - SEPTIEMBRE
            9 - OCTUBRE
            10 - NOVIEMBRE
            11 - DICIEMBRE
        */

        const totalDias = this.obtenerDiasEnElMes(mes);

        this.fechaIni = `${año}-${mesActual}-01 00:00:00`;
        this.fechaFin = `${año}-${mesActual}-${totalDias} 23:59:59`;

        this.mesIni = mesActual;
        this.mesFin = mesActual;

        // console.log(this.fechaIni);
        // console.log(this.fechaFin);

        const mesLetra = this.obtenerNombreMes(mes);
        this.mesActualGrafico = mesLetra;

        const diaLetra = this.obtenerNombreDia(dia);

        this.fullFecha = `${diaLetra} ${diaDelMes} de ${mesLetra} de ${año}`;
    }

    obtenerNombreMes(numeroMes: number): string {
        const meses = [
            'Enero', 'Febrero', 'Marzo', 'Abril',
            'Mayo', 'Junio', 'Julio', 'Agosto',
            'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ];

        return meses[numeroMes];
    }

    obtenerNombreDia(numeroMes: number): string {
        const meses = [
            'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves',
            'Viernes', 'Sábado'
        ];

        return meses[numeroMes];
    }

    obtenerDiasEnElMes(mes: number): number {
        const fechaActual = new Date();
        const mesActual = mes;
        const anioActual = fechaActual.getFullYear();

        // El último día del mes es el día 0 del siguiente mes
        const ultimoDiaDelMes = new Date(anioActual, mesActual + 1, 0);

        // Obtener el día del mes del último día
        const diasEnElMes = ultimoDiaDelMes.getDate();

        return diasEnElMes;
    }

    detectarPagina() {
        if(this.paginaUno) {
            this.paginaActual = '1';
            return 'uno';
        }

        if(this.paginaDos) {
            return 'dos';
        }

        if(this.paginaTres) {
            return 'tres';
        }

        if(this.paginaCuatro) {
            return 'cuatro';
        }

        return 'ninguna página detectada';
    }

    nextPage() {
        const pagina = this.detectarPagina();

        // Cambia a página 2
        if(pagina === 'uno') {
            this.paginaUno = false;
            this.paginaDos = true;
            this.paginaTres = false;
            this.retrocede = true;

            this.paginaActual = '2';

        }

        if(pagina === 'dos') {
            this.paginaUno = false;
            this.paginaDos = false;
            this.paginaTres = true;
            this.retrocede = true;
            this.adelanta = true;

            this.paginaActual = '3';
        }

        if(pagina === 'tres') {
            this.paginaUno = false;
            this.paginaDos = false;
            this.paginaTres = false;
            this.paginaCuatro = true;
            this.retrocede = true;
            this.adelanta = false;

            setTimeout(() => {
                this.crearGrafica();
            }, 1000);

            this.paginaActual = '4';
        }
    }

    prevPage() {
        const pagina = this.detectarPagina();
        if(pagina === 'cuatro') {
            this.paginaUno = false;
            this.paginaDos = false;
            this.paginaTres = true;
            this.paginaCuatro = false;
            this.retrocede = true;
            this.adelanta = true;

            this.paginaActual = '3';
        }

        // Cambia a página 2
        if(pagina === 'tres') {
            this.paginaUno = false;
            this.paginaDos = true;
            this.paginaTres = false;
            this.retrocede = true;
            this.adelanta = true;

            this.paginaActual = '2';
        }

        if(pagina === 'dos') {
            this.paginaUno = true;
            this.paginaDos = false;
            this.paginaTres = false;
            this.retrocede = false;
            this.adelanta = true;

            this.paginaActual = '1';
        }
    }

    cambiaFechas() {
        const añoIni = this.fechasFiltro[0].getFullYear();
        this.anhoIni = añoIni;

        const mesIni = this.fechasFiltro[0].getMonth();

        const mesIniConsulta = mesIni + 1;
        this.mesIni = mesIniConsulta;
        this.mesFin = mesIniConsulta;


        const totalDiasIni = this.obtenerDiasEnElMes(mesIni);

        this.fechaIni = `${añoIni}-${mesIniConsulta}-01 00:00:00`;
        this.fechaFin = `${añoIni}-${mesIniConsulta}-${totalDiasIni} 23:59:59`;

        if(this.fechasFiltro[1]) {
            const añoFin = this.fechasFiltro[1].getFullYear();
            this.anhoFin = añoFin;
            const mesFin = this.fechasFiltro[1]?.getMonth();

            const mesFinConsulta = mesFin + 1;
            this.mesFin = mesFinConsulta;

            const totalDiasFin = this.obtenerDiasEnElMes(mesFin);

            this.fechaFin = `${añoFin}-${mesFinConsulta}-${totalDiasFin} 23:59:59`;

            console.log(this.obtenerNombreMes(mesFin))

            this.labelStacked = [`${this.obtenerNombreMes(mesIni)} - ${this.obtenerNombreMes(mesFin)}`]


            this.fetchData();
        } else {
            // this.fetchData();
        }


    }

    dataIndicadorGeneralTabla: any[] = [];

    // Primer tabla del dash
    fetchIndicadorGeneralTabla() {
        const data = {
            ini: this.fechaIni,
            fin: this.fechaFin,
            tipo: this.tipo,
            owner: this.userName
        }

        this.cors.post('DashboardController/fetchIndicadorGeneralTabla', data).subscribe(
            (res: any) => {
                this.dataIndicadorGeneralTabla = res.data;

                let mes = {
                    Zona: this.mesActualGrafico
                }

                this.dataIndicadorGeneralTabla.unshift(mes);
                this.generarLlamadasEvaluadas(res.data)

                let labelsMonitoreoPorDivison: string[] = [];
                let dataMonitoreoPorDivison: string[] = [];

                this.dataIndicadorGeneralTabla.forEach((data: any, index: number ) => {

                    if(data.Zona != this.mesActualGrafico) {
                        labelsMonitoreoPorDivison.push(data.Zona);
                        dataMonitoreoPorDivison.push(data.Alizzia);
                        let evaluadasPorc = Math.round(( (data.Alizzia * 100) / data.Total ));

                        data.evaluadasPorc = evaluadasPorc + '%';

                        let noEvaluadas = data.Total - data.Alizzia;

                        let noEvaluadasPorc = Math.round(( (noEvaluadas * 100) / data.Total ));

                        data.noEvaluadasPorc = noEvaluadasPorc + '%';

                        data.ejecutivos = data.idAsesorUnicos;

                        data.showInfo = false;

                        let monitoreosAsesor = data.Alizzia / data.idAsesorUnicos;

                        data.asesor = Number(monitoreosAsesor.toFixed(2));

                        data.precision = 'ABC';

                        data.nota = data.nota + '%'

                    }
                });

                this.agrupaResumenIndicadores();

                const pieLabelPlugin = {
                    id: 'pieLabelPlugin',
                    afterDatasetsDraw(chart: any, args: any, options: any) {
                    if (chart.config.type !== 'pie' && chart.config.type !== 'doughnut') {
                        return;
                    }
                      const ctx = chart.ctx;
                      chart.data.datasets.forEach((dataset: any, datasetIndex: any) => {
                        const meta = chart.getDatasetMeta(datasetIndex);
                        meta.data.forEach((element: any, index: any) => {
                          // Calcula la posición de la etiqueta
                          const center = element.getCenterPoint();
                          // Texto que combina el valor y la etiqueta
                        const label = chart.data.labels[index];
                        const value = dataset.data[index];
                        const text = `${label}: ${value}`;

                        // Estilos del texto
                        ctx.fillStyle = 'black'; // Ajusta según tu esquema de colores
                        ctx.font = 'bold 10px Arial'; // Ajusta según tus necesidades
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';

                        // Dibuja el texto
                        ctx.fillText(text, center.x, center.y);
                        });
                      });
                    }
                };

                Chart.register(pieLabelPlugin);

                this.monitoreoPorDivisionData = {
                    labels: labelsMonitoreoPorDivison,
                    datasets: [
                      {
                        data: dataMonitoreoPorDivison,
                        backgroundColor: ['rgb(204,4,148)', 'rgb(50,203,203)', 'rgb(238,125,48)', 'rgb(253,204,3)'],
                        borderColor: ['rgb(204,4,148)', 'rgb(50,203,203)', 'rgb(238,125,48)'],
                        borderWidth: 1,
                      },
                    ],
                };

                this.monitoreoPorDivisionOptions = {
                    responsive: true, // Habilita la responsividad
                    maintainAspectRatio: false, // Opcional, dependiendo de si quieres mantener la relación de aspecto

                    plugins: {
                      legend: {
                        display: false,
                        labels: {
                          color: 'white',
                        },
                      },
                      tooltip: {
                        // callbacks: {
                        //   label: (tooltipItem: any) => {
                        //     const value = tooltipItem.formattedValue
                        //     return value + '%';
                        //   },
                        // },
                        titleFont: {
                          size: 16,
                          weight: 'bold',
                        },
                        bodyFont: {
                          size: 14,
                        },
                        bodyColor: 'white',
                        titleColor: 'white',
                      },
                      datalabelsPlugin: {}
                    },
                };
            },
            (err: any) => {
                console.log(err)
            }
        )

    }

    dataResumenIndicadorGeneral: any[] = [];


    // agruparResumenIndicadores y fetchZonasResumen construyen los datos de la tabla
    // Resumen indicador general, solo el resumen por zona, no se incluye dia por dia
    agrupaResumenIndicadores() {
        this.dataResumenIndicadorGeneral = [];
        let obj = {
            'Zona': this.mesActualGrafico
        };

        this.dataResumenIndicadorGeneral.push(obj);

        this.dataIndicadorGeneralTabla.forEach((element: any) => {
            if(element.Zona != this.mesActualGrafico) {
                let Obj = {
                    'Zona': element.Zona,
                    'cargados': element.Total,
                    'notaCalidad': element.nota,
                    'Alizzia': element.Alizzia,
                    'reincidentes': 0,
                    'reincidentesPorc': 0 + '%',
                    'insatisfechos': 0,
                    'insatisfechosPorc': 0 + '%',
                    'negativo': 0,
                    'neutro': 0,
                    'positivo': 0,
                    'sentimiento': 0,
                    'showInfo': false
                }

                this.dataResumenIndicadorGeneral.push(Obj);
            }
        })

        this.fetchZonasResumen();
    }

    negatividadTotal: number = 0;
    neutralidadTotal: number = 0;
    positividadTotal: number = 0;

    fetchZonasResumen() {
        const data = {
            'ini': this.fechaIni,
            'fin': this.fechaFin,
            'tipo': this.tipo,
            'owner': this.userName
        }

        this.cors.post('DashboardController/fetchZonasResumen', data).subscribe(
            (res: any) => {
                let resumen = res.data;

                this.dataResumenIndicadorGeneral.forEach((element: any, index: number) => {
                    if(element.Zona != this.mesActualGrafico) {
                        resumen.forEach((el: any) => {
                            if(el.zona === element.Zona) {
                                let reincidentes = el.reincidentes;
                                element.reincidentes = reincidentes;

                                let reincidentesPorc = ((reincidentes * 100) / element.cargados).toFixed(2) + '%';
                                element.reincidentesPorc = reincidentesPorc;

                                let insatisfechos = el.insatisfechos;
                                element.insatisfechos = insatisfechos;

                                let insatisfechosPorc = ((insatisfechos * 100) / element.cargados).toFixed(2) + '%';
                                element.insatisfechosPorc = insatisfechosPorc;

                                element.negativo = el.negatividad;
                                this.negatividadTotal = this.negatividadTotal + element.negativo;

                                element.neutro = el.neutralidad;
                                this.neutralidadTotal = this.neutralidadTotal + Number(element.neutro);

                                element.positivo = el.positividad;
                                this.positividadTotal = this.positividadTotal + element.positivo;

                                element.sentimiento = el.general;
                            }
                        })
                    }
                })
            },
            (err: any) => {
                console.log(err);
            }
        )
    }

    fetchData() {
        this.reload = false;

        this.fetchAudiosUploaded();

        this.fetchStatsCalif();

        this.fetchSolucionCliente();

        this.fetchCalidadMonitoreo();

        this.fetchcargadosAnalizados();

        this.fetchIndicadorGeneral();

        this.fetchCumplimiento();

        this.fetchShortSubs();

        this.fetchTotalesZonas();

        this.reload = true;
    }

    shortSubs: any[] = [];

    fetchShortSubs() {
        this.cors.get('dashboardController/fetchShortSubs').subscribe(
            (res: any) => {
                res.data.forEach((element: any, index: number) => {
                    if(element.sub != 'Groserias' && element.sub != 'Manejo de Herramientas') {
                        let obj = {
                            name: element.short,
                            margin: 0
                        }

                        this.shortSubs.push(obj);
                    }


                });

                this.shortSubs.forEach((element: any) => {
                    if(element.name === 'Apertura y Cierre' || element.name === 'Sondeo y Análisis') {
                        element.margin = 22
                    }
                });
            },
            (err: any) => {
                console.log(err);
            }
        )
    }





    private darkModeSubscription(): void {
        this.dark.darkModeChanges$().subscribe((isDarkModeEnabled: boolean) => {
        this.mode = isDarkModeEnabled;
        });
    }
}
