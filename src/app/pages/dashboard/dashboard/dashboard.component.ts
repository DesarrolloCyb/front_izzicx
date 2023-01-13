import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutService } from '@services';
import { CorsService } from '@services';
import { Message, MessageService } from 'primeng/api';
import * as moment from 'moment';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


    lineData: any;

    barData: any;
    barData2: any;

    pieData: any;
    pieData2: any;

    polarData: any;

    radarData: any;

    lineOptions: any;

    barOptions: any;
    barOptions2: any;

    pieOptions: any;

    polarOptions: any;

    radarOptions: any;

    subscription: Subscription;

    msgs: Message[] = [];

    statsTiempo:number[]=[];
    statsTiempo2:number[]=[];
    statsProceso:number[]=[];
    statsProceso2:number[]=[];
    statsError:any[]=[];
    statsError2:any[]=[];
    usuario: any = JSON.parse(localStorage.getItem("userData") || "{}")
    errorChoise:string[]=[
        'Single Video',
        'Modem Combo',
        'BTCel Combo',
        'Equipos Adicionales',
        'Solicitud Cancelada',
        'Solicitud Retenida',
        'NFL',
        'Servicios',
        'Reactivacion',
        'Reembolso',
        // 'Cambio Esquema',
        // 'Cambio Paquete'
    ];
    statusRadar:boolean=false;
    constructor(public layoutService: LayoutService,private cors: CorsService,private messageService: MessageService) {
        this.subscription = this.layoutService.configUpdate$.subscribe(config => {
            this.initCharts();
        });

    }

    ngOnInit() {
        // console.log(this.usuario)
        if(
            this.usuario.role==='Resp: MOISES AVILA SOTO' || 
            this.usuario.role==='GERENTE RETENCION INBOUND' ||
            this.usuario.role==='GERENTE ATENCION A CLIENTES' ||
            this.usuario.role==='SUPERVISOR ATENCION A CLIENTES INTERNO' ||
            this.usuario.role==='ASESOR CONTROL INFORMACION' ||
            this.usuario.role==='SUPERVISOR GESTION EDP' ||
            this.usuario.role==='SUPERVISOR ESTRATEGIA OPERATIVA' ||
            this.usuario.role==='ESPECIALISTA ESTRATEGIA OPERATIVA' ||
            this.usuario.role==='GERENTE MESA DE CONTROL' ||
            this.usuario.role==='SUPERVISOR MESA DE CONTROL' ||
            this.usuario.role==='SUPERVISOR MESA CONTROL DE DOCUMENTOS' ||
            this.usuario.role==='ASESOR RETENCION VETV' ||
            this.usuario.role==='SUPERVISOR RETENCION WEB' ||
            this.usuario.role==='SUPERVISOR RETENCION INBOUND VETV' ||
            this.usuario.role==='SUPERVISOR RETENCION INBOUND' ||
            this.usuario.role==='ESPECIALISTA RETENCION WEB' ||
            this.usuario.role==='ESPECIALISTA RETENCION VETV' ||
            this.usuario.role==='ESPECIALISTA RETENCION INBOUND' ||
            this.usuario.role==='ESPECIALISTA RETENCION CHAT' || 
            this.usuario.role==='ESPECIALISTA RETENCION POSPAGO BRONCE' 
        ){
            this.getStatsTiempoCompletado();
            this.getStatsProcesos(); // retencion
        }
        if(
            this.usuario.role==='Resp: MOISES AVILA SOTO' ||
            this.usuario.role==='GERENTE RETENCION INBOUND' ||
            this.usuario.role==='GERENTE ATENCION A CLIENTES' ||
            this.usuario.role==='SUPERVISOR ATENCION A CLIENTES INTERNO' ||
            this.usuario.role==='ASESOR CONTROL INFORMACION' ||
            this.usuario.role==='SUPERVISOR GESTION EDP' ||
            this.usuario.role==='SUPERVISOR ESTRATEGIA OPERATIVA' ||
            this.usuario.role==='ESPECIALISTA ESTRATEGIA OPERATIVA' ||
            this.usuario.role==='GERENTE MESA DE CONTROL' ||
            this.usuario.role==='SUPERVISOR MESA DE CONTROL' ||
            this.usuario.role==='SUPERVISOR MESA CONTROL DE DOCUMENTOS' ||
            this.usuario.role==='SUPERVISOR TROUBLESHOOTING CELULAR' ||
            this.usuario.role==='ESPECIALISTA TROUBLESHOOTING CELULAR' ||
            this.usuario.role==='SUPERVISOR CALL CENTER REPARACIONES' ||
            this.usuario.role==='EJECUTIVO ATENCION PREPAGO' ||
            this.usuario.role==='GERENTE REPARACIONES VETV' ||
            this.usuario.role==='COORDINADOR REPARACIONES' ||
            this.usuario.role==='SUPERVISOR ATENCION CC MX' ||
            this.usuario.role==='COORDINADOR ATENCION CC MX' ||
            this.usuario.role==='ASESOR ATENCION CC MX' ||
            this.usuario.role==='EJECUTIVO ATENCION A CLIENTE' ||
            this.usuario.role==='EJECUTIVO ATENCION PREPAGO BRONCE J' ||
            this.usuario.role==='EJECUTIVO ATENCION PREPAGO BRONCE S' ||
            this.usuario.role==='EJECUTIVO REPARACIONES JR' ||
            this.usuario.role==='EJECUTIVO ATENCION PREPAGO BRONCE' ||
            this.usuario.role==='EJECUTIVO ATENCION A CLIENTE MX JR' ||
            this.usuario.role==='EJECUTIVO ATENCION A CLIENTE MX SENIOR' ||
            this.usuario.role==='EJECUTIVO ATENCION A CLIENTE MX JR' ||
            this.usuario.role==='SUPERVISOR ATENCION CC MX' ||
            this.usuario.role==='EJECUTIVO ATENCION POSPAGO BRONCE' ||
            this.usuario.role==='EJECUTIVO ATENCION POSPAGO ORO' ||
            this.usuario.role==='EJECUTIVO ATENCION POSPAGO PLATA'

            ){
            this.getStatsTiempoCompletado2(); //atenciona cliente
            this.getStatsProcesos2();
        }
        this.initCharts();
        
        // let color =  this.generateColor()
        // this.radarData.datasets.push({
        //     label: 'Servicios Costo/Sin Costo',
        //     borderColor: color,
        //     pointBackgroundColor: color,
        //     pointBorderColor: color,
        //     pointHoverBackgroundColor: color,
        //     pointHoverBorderColor: color,
        //     data: [0, 59, 90, 81, 56, 55, 40]
        // })
        // color =  this.generateColor()
        // this.radarData.datasets.push({
        //     label: 'Reactivacion',
        //     borderColor: color,
        //     pointBackgroundColor: color,
        //     pointBorderColor: color,
        //     pointHoverBackgroundColor: color,
        //     pointHoverBorderColor: color,
        //     data: [40, 55, 56, 21, 2, 23, 55]
        // })
        // setInterval(()=> {
        //     this.getStatsTiempoCompletado()
        //     this.getStatsTiempoCompletado2()
        //     this.initCharts()
        // }, 5000);
        
    }

    initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        this.barData = {
            labels: ['Single Video', 'Modem Combo', 'BTCel Combo', 'Equipos Adicionales', 'Solicitud Cancelacion', 'Solicitud Retenidos','Servicios','Reactivación','Reembolso','Cambio de Esquema','Cambio de Paquete'],
            datasets: [
                {
                    label: 'Tiempos de cierre en minutos',
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    borderColor: documentStyle.getPropertyValue('--primary-500'),
                    // data: [600, 100, 60, 60, 60, 50, 60]
                    data: this.statsTiempo
                }
            ]
        };

        this.barOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
        };

        this.barData2 = {
            // labels: ['NFL', 'PostPago','Bolsa Datos','Generacion Solicitud'],
            labels: ['NFL', 'PostPago','Bolsa Datos'],
            datasets: [
                {
                    label: 'Tiempos de cierre en minutos',
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    borderColor: documentStyle.getPropertyValue('--primary-500'),
                    data: this.statsTiempo2
                }
            ]
        };

        this.barOptions2 = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
        };


        this.pieData = {
            labels: ['Single Video', 'Modem Combo', 'BTCel Combo', 'Equipos Adicionales', 'Solicitud Cancelacion', 'Solicitud Retenidos','Servicios','Reactivación','Reembolso','Cambio de Esquema','Cambio de Paquete'],
            datasets: [
                {
                    data: this.statsProceso,
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'),
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--cyan-200'),
                        documentStyle.getPropertyValue('--pink-500'),
                        documentStyle.getPropertyValue('--indigo-300'),
                        documentStyle.getPropertyValue('--red-500'),
                        documentStyle.getPropertyValue('--teal-500'),
                        documentStyle.getPropertyValue('--orange-500'),
                        documentStyle.getPropertyValue('--green-200'),
                        documentStyle.getPropertyValue('--purple-500'),
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'),
                        documentStyle.getPropertyValue('--green-400'),
                        documentStyle.getPropertyValue('--yellow-400'),
                        documentStyle.getPropertyValue('--cyan-100'),
                        documentStyle.getPropertyValue('--pink-400'),
                        documentStyle.getPropertyValue('--indigo-200'),
                        documentStyle.getPropertyValue('--red-400'),
                        documentStyle.getPropertyValue('--teal-400'),
                        documentStyle.getPropertyValue('--orange-400'),
                        documentStyle.getPropertyValue('--green-100'),
                        documentStyle.getPropertyValue('--purple-400'),

                    ]
                }]
        };

        this.pieData2 = {
            labels: ['NFL', 'PostPago', 'Bolsa de Datos'],
            datasets: [
                {
                    data: this.statsProceso2,
                    backgroundColor: [
                        documentStyle.getPropertyValue('--indigo-500'),
                        documentStyle.getPropertyValue('--purple-500'),
                        documentStyle.getPropertyValue('--teal-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--indigo-400'),
                        documentStyle.getPropertyValue('--purple-400'),
                        documentStyle.getPropertyValue('--teal-400')
                    ]
                }]
        };


        this.pieOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };

        this.lineData = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                    borderColor: documentStyle.getPropertyValue('--primary-500'),
                    tension: .4
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                    borderColor: documentStyle.getPropertyValue('--primary-200'),
                    tension: .4
                }
            ]
        };

        this.lineOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
            }
        };

        this.polarData = {
            datasets: [{
                data: [
                    11,
                    16,
                    7,
                    3
                ],
                backgroundColor: [
                    documentStyle.getPropertyValue('--indigo-500'),
                    documentStyle.getPropertyValue('--purple-500'),
                    documentStyle.getPropertyValue('--teal-500'),
                    documentStyle.getPropertyValue('--orange-500')
                ],
                label: 'My dataset'
            }],
            labels: [
                'Indigo',
                'Purple',
                'Teal',
                'Orange'
            ]
        };

        this.polarOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: surfaceBorder
                    }
                }
            }
        };

        this.radarData = {
            // labels: ['Single Video', 'Modem Combo', 'BTCel Combo', 'Equipos Adicionales', 'Solicitud Cancelacion', 'Solicitud Retencion', 'Servicios','Reactivacion','Reembolso','Cambio Esquema','Cambio Paquete'],
            labels: this.statsError,
            datasets: [
                {
                    label: 'Error',
                    data:this.statsError2,
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    pointBackgroundColor: 'rgba(255,99,132,1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(255,99,132,1)',
                }
            ] 
        };

        this.radarOptions = {
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                r: {
                    grid: {
                        color: textColorSecondary
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    generateColor() { return '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0'); }

    getStatsTiempoCompletado(){
        var date = new Date();
        var primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
        var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var a = moment(primerDia).format('yyyy-MM-DD');
        var b = moment(ultimoDia).format('yyyy-MM-DD');
        this.cors
        .get('Graficas/dashboardTiempoCierreStats',{
            fecha1:a,
            fecha2:b
        })
        .then((response) => {
            
            // console.log(response)
            for(let i=0;i<=response.length-1;i++){
                if(JSON.stringify(response[i].diferencia) !== '{}'){
                    this.statsTiempo.push(response[i].diferencia)
                }else{
                    this.statsTiempo.push(0)
                }
            }
            this.initCharts()          
            // console.log(this.statsTiempo)
        //   this.messageService.add({
        //     key: 'tst',
        //     severity: 'success',
        //     summary: 'Datos guardados',
        //     detail: 'La solicitud de cancelacion fue guardada',
        //   });
        })
        .catch((error) => {
          console.log(error)
        //   this.msgs.push({
        //     severity: 'error',
        //     summary: 'No se logro guardar',
        //     detail: 'La solicitud de cancelacion no fue guardada',
        //   });
        });
    }
    getStatsTiempoCompletado2(){
        var date = new Date();
        var primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
        var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var a = moment(primerDia).format('yyyy-MM-DD');
        var b = moment(ultimoDia).format('yyyy-MM-DD');
        this.cors
        .get('Graficas/dashboardTiempoCierreStats2',{
            fecha1:a,
            fecha2:b
        })
        .then((response) => {
            // console.log(response)
            for(let i=0;i<=response.length-1;i++){
                if(JSON.stringify(response[i].diferencia) !== '{}'){
                    this.statsTiempo2.push(response[i].diferencia)
                }else{
                    this.statsTiempo2.push(0)
                }
            }
            this.initCharts()
            // console.log(this.statsTiempo)
        //   this.messageService.add({
        //     key: 'tst',
        //     severity: 'success',
        //     summary: 'Datos guardados',
        //     detail: 'La solicitud de cancelacion fue guardada',
        //   });
        })
        .catch((error) => {
          console.log(error)
        //   this.msgs.push({
        //     severity: 'error',
        //     summary: 'No se logro guardar',
        //     detail: 'La solicitud de cancelacion no fue guardada',
        //   });
        });
        
    }

    getStatsProcesos(){
        var date = new Date();
        var primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
        var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var a = moment(primerDia).format('yyyy-MM-DD');
        var b = moment(ultimoDia).format('yyyy-MM-DD');
        this.cors
        .get('Graficas/dashboardProcesos',{
            fecha1:a,
            fecha2:b
        })
        .then((response) => {
            // console.log(response)
            for(let i=0;i<=response.length-1;i++){
                if(JSON.stringify(response[i].count) !== '{}'){
                    this.statsProceso.push(response[i].count)
                }else{
                    this.statsProceso.push(0)
                }
            }
            // console.log(this.statsProceso)
            this.initCharts()
        })
        .catch((error) => {
          console.log(error)
        });
        
    }

    getStatsProcesos2(){
        var date = new Date();
        var primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
        var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var a = moment(primerDia).format('yyyy-MM-DD');
        var b = moment(ultimoDia).format('yyyy-MM-DD');
        this.cors
        .get('Graficas/dashboardProcesos2',{
            fecha1:a,
            fecha2:b
        })
        .then((response) => {
            // console.log(response)
            for(let i=0;i<=response.length-1;i++){
                if(JSON.stringify(response[i].count) !== '{}'){
                    this.statsProceso2.push(response[i].count)
                }else{
                    this.statsProceso2.push(0)
                }
            }
            // console.log(this.statsProceso2)
            this.initCharts()
        })
        .catch((error) => {
          console.log(error)
        });
        
    }

    // getStatsError(){
    //     var date = new Date();
    //     var primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
    //     var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    //     var a = moment(primerDia).format('yyyy-MM-DD');
    //     var b = moment(ultimoDia).format('yyyy-MM-DD');
    //     this.cors
    //     .get('Graficas/dashboardError',{
    //         fecha1:a,
    //         fecha2:b
    //     })
    //     .then((response) => {
    //         // console.log(response)
    //         this.statsError = response;
    //         for(let i=0;i<=response.length-1;i++){
    //             if(JSON.stringify(response[i].count) !== '{}'){
    //                 this.statsError2.push(response[i].count)
    //             }else{
    //                 this.statsError2.push(0)
    //             }
    //         }
    //         // console.log(this.statsError2)
    //         this.initCharts()
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     });
        
    // }

    changeError(event:any){
        var date = new Date();
        var primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
        var ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        var a = moment(primerDia).format('yyyy-MM-DD');
        var b = moment(ultimoDia).format('yyyy-MM-DD');
        this.cors
        .get('Graficas/dashboardError',{
            tipo:event,
            fecha1:a,
            fecha2:b
        })
        .then((response) => {
            this.statusRadar = true;
            // console.log(response)
            this.statsError = [];
            this.statsError2 = [];
            delete response[0].tabla;
            for (const [key, value] of Object.entries(response[0])) {
                this.statsError.push(key);
                this.statsError2.push(value);
            }
            this.initCharts()
        })
        .catch((error) => {
          console.log(error)
        });


    }



}
