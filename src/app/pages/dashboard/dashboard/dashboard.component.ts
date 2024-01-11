import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutService } from '@services';
import { CorsService } from '@services';
import { Message, MessageService } from 'primeng/api';
import { UntypedFormBuilder,UntypedFormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
moment.lang('es');
import { PrimeNGConfig } from 'primeng/api';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

registerLocaleData(es);

import { jsPDF } from 'jspdf';
import 'jspdf-autotable';


import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import * as ExcelJS from 'exceljs';
// import * as fs from 'file-saver';



@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    @ViewChild('barChart') barChart: any; // Cambiar 'any' según la versión de PrimeNG


    fechas:any=[];
    primerDia = moment().startOf('month');
    ultimoDia = moment().endOf('month');
    fechasForm:UntypedFormGroup;
    loading: boolean = false
    load: boolean = false


    basicDataEXT: any;
    basicOptionsEXT: any;
    basicDataExtArray:any={
        graf:[],
        esta:[],
        val:[],
        motivo:[],
        mes:[],
        dia:[],
        status:[],
    };
    basicDataCC: any;
    basicOptionsCC: any;
    basicDataCCArray:any={
        graf:[],
        esta:[],
        val:[],
        motivo:[],
        mes:[],
        dia:[],
        status:[],
        tipo:[],
    };

    basicDataAjustesConValidacion: any;
    basicOptionsAjustesConValidacion: any;
    basicDataAjustesConValidacionArray:any={
        graf:[],
        esta:[],
        val:[],
        categoria:[],
        solucion:[],
        mes:[],
        dia:[],
        status:[],
    };

    basicDataAjustesSinValidacion: any;
    basicOptionsAjustesSinValidacion: any;
    basicDataAjustesSinValidacionArray:any={
        graf:[],
        esta:[],
        val:[],
        categoria:[],
        solucion:[],
        mes:[],
        dia:[],
        status:[],
    };

    setStyle=['A','B','C','D','E','F','G']





    constructor(private el: ElementRef,private cors: CorsService,private formBuilder: UntypedFormBuilder,private primengConfig: PrimeNGConfig,private messageService: MessageService,) {
        this.primengConfig.setTranslation({
            dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
            dayNamesMin: ['D', 'L', 'Ma', 'Mi', 'J', 'V', 'S'],
            monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            monthNamesShort: ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'],
            today: 'Hoy',
            clear: 'Limpiar'
          });
        this.fechasForm = this.formBuilder.group({
            fechas: [null],
          });
        this.fechas[0]=moment(this.primerDia).format('LL');
        this.fechas[1]=moment(this.ultimoDia).format('LL');
      
        // console.log('Primer día del mes:', this.primerDia.format('YYYY-MM-DD'));
        // console.log('Último día del mes:', this.ultimoDia.format('YYYY-MM-DD'));
        this.load=true;
        this.buscarStatsEXT(this.primerDia.format('YYYY-MM-DD'),this.ultimoDia.format('YYYY-MM-DD'));
        this.buscarStatsCC(this.primerDia.format('YYYY-MM-DD'),this.ultimoDia.format('YYYY-MM-DD'));
        this.buscarStatsAjustesConValidacion(this.primerDia.format('YYYY-MM-DD'),this.ultimoDia.format('YYYY-MM-DD'));
        this.buscarStatsAjustesSinValidacion(this.primerDia.format('YYYY-MM-DD'),this.ultimoDia.format('YYYY-MM-DD'));




    }

    ngOnInit() {

        setInterval(() => {
            this.buscarStatsTodos();
        }, 300000);        
        
    }
    
    buscarStatsTodos(){
        this.load=true;
        let ini:any;
        let fin:any;
        this.load=true;
        // console.log(this.fechasForm.controls['fechas'].value)
        if(this.fechasForm.controls['fechas'].value == null || this.fechasForm.controls['fechas'].value[1] == null){
            ini =this.primerDia.format('YYYY-MM-DD');
            fin =this.ultimoDia.format('YYYY-MM-DD');
        }else{
            ini =moment(this.fechasForm.controls['fechas'].value[0]).format('YYYY-MM-DD');
            fin =moment(this.fechasForm.controls['fechas'].value[1]).format('YYYY-MM-DD');
            
        }
        this.fechas[0]=moment(ini).format('LL');
        this.fechas[1]=moment(fin).format('LL');

        this.buscarStatsEXT(ini,fin);
        this.buscarStatsCC(ini,fin);
        this.buscarStatsAjustesConValidacion(ini,fin);
        this.buscarStatsAjustesSinValidacion(ini,fin);
    }
    
    buscarStatsEXT(ini:any,fin:any){
        this.basicDataExtArray={
            graf:[],
            esta:[],
            val:[],
            motivo:[],
            mes:[],
            dia:[],
            status:[],
        };
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        this.basicOptionsEXT = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

        this.cors.get('Estadisticas/estadisticasEXT',{
            startDateStr:ini,
            endDateStr:fin
        }).then((response) => {
            if(response[0]=='SIN INFO'){
             
            }else{
 
            
                // console.log(response);
                let grafica = response[0].grafica;
                grafica.forEach((obj:any) => {
                    Object.entries(obj).forEach(([key, value]) => {
                      if(key=='fallaRPA'){
                        this.basicDataExtArray.graf.push(key)
                        this.basicDataExtArray.esta.push(value)
                      }
                      if(key=='errorOperativo'){
                        this.basicDataExtArray.graf.push(key)
                        this.basicDataExtArray.esta.push(value)
                      }
                      if(key=='registroPendiente'){
                        this.basicDataExtArray.graf.push(key)
                        this.basicDataExtArray.esta.push(value)
                      }
                      if(key=='registroExitoso'){
                        this.basicDataExtArray.graf.push(key)
                        this.basicDataExtArray.esta.push(value)
                      }
                      if(key=='ordenCancelada'){
                        this.basicDataExtArray.graf.push(key)
                        this.basicDataExtArray.esta.push(value)
                      }
                    });
                });
                this.basicDataExtArray.val=response[0].grafica
                this.basicDataExtArray.motivo=response[0].motivo
                this.basicDataExtArray.mes=response[0].mes
                this.basicDataExtArray.dia=response[0].dia
                this.basicDataExtArray.dia[this.basicDataExtArray.dia.length-1].base='Total'
                this.basicDataExtArray.status=response[0].status

                // console.log(this.basicDataExtArray)
               

                this.basicDataEXT = {
                    // labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                    labels: this.basicDataExtArray.graf,
                    datasets: [
                        {
                            label: 'Depuracion EXT',
                            data: this.basicDataExtArray.esta,
                            backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                            borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                            borderWidth: 1
                        }
                    ]
                };
        
            }
        }).catch((error) => {
            console.log(error)
        })
        



    }

    buscarStatsCC(ini:any,fin:any){
        this.basicDataCCArray={
            graf:[],
            esta:[],
            val:[],
            motivo:[],
            mes:[],
            dia:[],
            status:[],
            tipo:[],
        };
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        this.basicOptionsCC = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

        this.cors.get('Estadisticas/estadisticasCC',{
            startDateStr:ini,
            endDateStr:fin
        }).then((response) => {
            if(response[0]=='SIN INFO'){
             
            }else{
 
            
                // console.log(response);
                let grafica = response[0].grafica;
                grafica.forEach((obj:any) => {
                    Object.entries(obj).forEach(([key, value]) => {
                      if(key=='fallaRPA'){
                        this.basicDataCCArray.graf.push(key)
                        this.basicDataCCArray.esta.push(value)
                      }
                      if(key=='errorOperativo'){
                        this.basicDataCCArray.graf.push(key)
                        this.basicDataCCArray.esta.push(value)
                      }
                      if(key=='registroPendiente'){
                        this.basicDataCCArray.graf.push(key)
                        this.basicDataCCArray.esta.push(value)
                      }
                      if(key=='registroExitoso'){
                        this.basicDataCCArray.graf.push(key)
                        this.basicDataCCArray.esta.push(value)
                      }
                      if(key=='ordenCancelada'){
                        this.basicDataCCArray.graf.push(key)
                        this.basicDataCCArray.esta.push(value)
                      }
                    });
                });
                this.basicDataCCArray.val=response[0].grafica
                this.basicDataCCArray.motivo=response[0].motivo
                this.basicDataCCArray.mes=response[0].mes
                this.basicDataCCArray.dia=response[0].dia
                this.basicDataCCArray.dia[this.basicDataCCArray.dia.length-1].base='Total'
                this.basicDataCCArray.status=response[0].status
                this.basicDataCCArray.tipo=response[0].tipo
            //    console.log(this.basicDataCCArray)

                this.basicDataCC = {
                    // labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                    labels: this.basicDataCCArray.graf,
                    datasets: [
                        {
                            label: 'Depuracion CC',
                            data: this.basicDataCCArray.esta,
                            backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                            borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                            borderWidth: 1
                        }
                    ]
                };
        
            }
        }).catch((error) => {
            console.log(error)
        })
        



    }

    buscarStatsAjustesConValidacion(ini:any,fin:any){
        this.basicDataAjustesConValidacionArray={
            graf:[],
            esta:[],
            val:[],
            categoria:[],
            solucion:[],
            mes:[],
            dia:[],
            status:[],
        };
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        this.basicOptionsAjustesConValidacion = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

        this.cors.get('Estadisticas/estadisticasAjustesConValidacion',{
            startDateStr:ini,
            endDateStr:fin
        }).then((response) => {
            if(response[0]=='SIN INFO'){
             
            }else{
 
            
                // console.log(response);
                let grafica = response[0].grafica;
                grafica.forEach((obj:any) => {
                    Object.entries(obj).forEach(([key, value]) => {
                      if(key=='fallaRPA'){
                        this.basicDataAjustesConValidacionArray.graf.push(key)
                        this.basicDataAjustesConValidacionArray.esta.push(value)
                      }
                      if(key=='errorOperativo'){
                        this.basicDataAjustesConValidacionArray.graf.push(key)
                        this.basicDataAjustesConValidacionArray.esta.push(value)
                      }
                      if(key=='registroPendiente'){
                        this.basicDataAjustesConValidacionArray.graf.push(key)
                        this.basicDataAjustesConValidacionArray.esta.push(value)
                      }
                      if(key=='ajusteRealizado'){
                        this.basicDataAjustesConValidacionArray.graf.push(key)
                        this.basicDataAjustesConValidacionArray.esta.push(value)
                      }
                      if(key=='inconcistenciaSiebel'){
                        this.basicDataAjustesConValidacionArray.graf.push(key)
                        this.basicDataAjustesConValidacionArray.esta.push(value)
                      }
                    });
                });
                this.basicDataAjustesConValidacionArray.val=response[0].grafica
                this.basicDataAjustesConValidacionArray.categoria=response[0].categoria
                this.basicDataAjustesConValidacionArray.solucion=response[0].solucion
                this.basicDataAjustesConValidacionArray.mes=response[0].mes
                this.basicDataAjustesConValidacionArray.dia=response[0].dia
                this.basicDataAjustesConValidacionArray.dia[this.basicDataAjustesConValidacionArray.dia.length-1].base='Total'
                this.basicDataAjustesConValidacionArray.status=response[0].status
               
                // console.log(this.basicDataAjustesConValidacionArray)
                this.basicDataAjustesConValidacion = {
                    // labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                    labels: this.basicDataAjustesConValidacionArray.graf,
                    datasets: [
                        {
                            label: 'Ajustes con Validación',
                            data: this.basicDataAjustesConValidacionArray.esta,
                            backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                            borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                            borderWidth: 1
                        }
                    ]
                };
                this.load=false;
                this.fechasForm.controls['fechas'].patchValue(null);        
        
        
            }
        }).catch((error) => {
            console.log(error)
        })
        



    }

    buscarStatsAjustesSinValidacion(ini:any,fin:any){
        this.basicDataAjustesSinValidacionArray={
            graf:[],
            esta:[],
            val:[],
            categoria:[],
            solucion:[],
            mes:[],
            dia:[],
            status:[],
        };
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        this.basicOptionsAjustesSinValidacion = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

        this.cors.get('Estadisticas/estadisticasAjustesSinValidacion',{
            startDateStr:ini,
            endDateStr:fin
        }).then((response) => {
            if(response[0]=='SIN INFO'){
             
            }else{
 
            
                // console.log(response);
                let grafica = response[0].grafica;
                grafica.forEach((obj:any) => {
                    Object.entries(obj).forEach(([key, value]) => {
                      if(key=='fallaRPA'){
                        this.basicDataAjustesSinValidacionArray.graf.push(key)
                        this.basicDataAjustesSinValidacionArray.esta.push(value)
                      }
                      if(key=='errorOperativo'){
                        this.basicDataAjustesSinValidacionArray.graf.push(key)
                        this.basicDataAjustesSinValidacionArray.esta.push(value)
                      }
                      if(key=='registroPendiente'){
                        this.basicDataAjustesSinValidacionArray.graf.push(key)
                        this.basicDataAjustesSinValidacionArray.esta.push(value)
                      }
                      if(key=='ajusteRealizado'){
                        this.basicDataAjustesSinValidacionArray.graf.push(key)
                        this.basicDataAjustesSinValidacionArray.esta.push(value)
                      }
                      if(key=='inconcistenciaSiebel'){
                        this.basicDataAjustesSinValidacionArray.graf.push(key)
                        this.basicDataAjustesSinValidacionArray.esta.push(value)
                      }
                    });
                });
                this.basicDataAjustesSinValidacionArray.val=response[0].grafica
                this.basicDataAjustesSinValidacionArray.motivoAjuste=response[0].motivoAjuste
                this.basicDataAjustesSinValidacionArray.solucion=response[0].solucion
                this.basicDataAjustesSinValidacionArray.mes=response[0].mes
                this.basicDataAjustesSinValidacionArray.dia=response[0].dia
                this.basicDataAjustesSinValidacionArray.dia[this.basicDataAjustesSinValidacionArray.dia.length-1].base='Total'
                this.basicDataAjustesSinValidacionArray.status=response[0].status
               
                // console.log(this.basicDataAjustesSinValidacionArray)
                this.basicDataAjustesSinValidacion = {
                    // labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                    labels: this.basicDataAjustesSinValidacionArray.graf,
                    datasets: [
                        {
                            label: 'Ajustes sin Validación',
                            data: this.basicDataAjustesSinValidacionArray.esta,
                            backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                            borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
                            borderWidth: 1
                        }
                    ]
                };
        
            }
        }).catch((error) => {
            console.log(error)
        })
        



    }




    primeraLetraMayuscula(cadena: string): string {
        if (cadena.length === 0) {
          return cadena; // Devuelve la cadena original si está vacía
        }
        return cadena.charAt(0).toUpperCase() + cadena.slice(1);
    }


    mesFormat(value:any){
        const meses = [
            { ingles: "January", espanol: "Enero" },
            { ingles: "February", espanol: "Febrero" },
            { ingles: "March", espanol: "Marzo" },
            { ingles: "April", espanol: "Abril" },
            { ingles: "May", espanol: "Mayo" },
            { ingles: "June", espanol: "Junio" },
            { ingles: "July", espanol: "Julio" },
            { ingles: "August", espanol: "Agosto" },
            { ingles: "September", espanol: "Septiembre" },
            { ingles: "October", espanol: "Octubre" },
            { ingles: "November", espanol: "Noviembre" },
            { ingles: "December", espanol: "Diciembre" },
            { ingles: "Total", espanol: "Total" }
        ];        
        if(value != null || value!=""){
            if(typeof(value)=='string'){
                const mesTraducido = meses.find((mes:any) => mes.ingles === value)?.espanol;
                return mesTraducido;
            }
            return value
        }else{
            return ""
        }
    }


    // generatePDF(){

    //     const pdfDoc = new jsPDF();

    //     // Verificar que el gráfico se haya inicializado
    //     if (this.barChart && this.barChart.chart) {
    //       const chart = this.barChart.chart;
          
    //       // Obtener el elemento canvas del gráfico
    //       const chartCanvas = chart.ctx.canvas;
    //       const chartDataUrl = chartCanvas.toDataURL('image/png');
    
    //       // Agregar la imagen del gráfico al documento PDF
    //       pdfDoc.addImage(chartDataUrl, 'PNG', 10, 10, 190, 100);

    //       let a:any=[];
    //       let b:any=[];
            
    //       // Aquí puedes usar autoTable para generar tus tablas
    //         this.basicDataExtArray.val.forEach((obj:any) => {
    //             Object.entries(obj).forEach(([key, value]) => {
    //                 if(key=='base'){
    //                     a.push('Proceso')
    //                     b.push(value)
    //                 }
    //                 if(key=='errorOperativo'){
    //                     a.push('Error Operativo')
    //                     b.push(value)
    //                 }
    //                 if(key=='fallaRPA'){
    //                     a.push('Falla RPA')
    //                     b.push(value)
    //                 }
    //                 if(key=='ordenCancelada'){
    //                     a.push('Orden Cancelada por un Tercero')
    //                     b.push(value)
    //                 }
    //                 if(key=='registroExitoso'){
    //                     a.push('Registro Exitoso')
    //                     b.push(value)
    //                 }
    //                 if(key=='registroPendiente'){
    //                     a.push('Registro Pendiente')
    //                     b.push(value)
    //                 }
    //                 if(key=='total'){
    //                     a.push('Total')
    //                     b.push(value)
    //                 }
    //             });
                
                
    //         });
    //         let aa=a.pop();
    //         a.unshift(aa);
    //         let bb=b.pop();
    //         b.unshift(bb);
    //         (pdfDoc as any).autoTable({
    //             head: [a],
    //             body: [b],
    //             startY: 120
    //         });
    //         // Obtener la altura total de la tabla
    //         let tableHeight = (this.basicDataExtArray.val.length + 1) * 5; // Puedes ajustar el factor según tus necesidades

    //         // Ajustar la posición vertical dinámicamente
    //         let startYEXTmotivo = (pdfDoc as any).autoTable.previous.finalY + tableHeight;

    //         let columns = Object.keys(this.basicDataExtArray.motivo[0]);
    //         let c:any = columns.pop()
    //         columns.unshift(c);
    //         columns.splice(1,1);
    //         (pdfDoc as any).autoTable({
    //             head: [['Motivo de la orden','Falla RPA','Error Operativo','Registro Pendiente','Registro Exitoso','Orden Cancelada por un tercero','Total']],
    //             body: this.basicDataExtArray.motivo.map((obj:any) => columns.map(col => obj[col])), // Mapear propiedades a celdas
    //             startY: startYEXTmotivo
    //         });


    //         let tableHeight1 = (this.basicDataExtArray.motivo.length + 1) * 2; // Puedes ajustar el factor según tus necesidades
    //         let startYEXTmes = (pdfDoc as any).autoTable.previous.finalY + tableHeight1;
    //         let columnsmES = Object.keys(this.basicDataExtArray.mes[0]);
    //         let cc:any = columnsmES.pop()
    //         columnsmES.unshift(cc);
    //         columnsmES.splice(1,1);
    //         (pdfDoc as any).autoTable({
    //             head: [['Mes','Falla RPA','Error Operativo','Registro Pendiente','Registro Exitoso','Orden Cancelada por un tercero','Total']],
    //             body: this.basicDataExtArray.mes.map((obj:any) => columnsmES.map(col => obj[col])), // Mapear propiedades a celdas
    //             startY: startYEXTmes
    //         });


    //         let tableHeight2 = (this.basicDataExtArray.mes.length + 1) * 2; // Puedes ajustar el factor según tus necesidades

    //         let startYEXTdia = (pdfDoc as any).autoTable.previous.finalY + tableHeight2;

    //         let columnsdia = Object.keys(this.basicDataExtArray.mes[0]);
    //         let d:any = columnsdia.pop()
    //         columnsdia.unshift(d);
    //         columnsdia.splice(1,1);
    //         (pdfDoc as any).autoTable({
    //             head: [['Día','Falla RPA','Error Operativo','Registro Pendiente','Registro Exitoso','Orden Cancelada por un tercero','Total']],
    //             body: this.basicDataExtArray.dia.map((obj:any) => columnsdia.map(col => obj[col])), // Mapear propiedades a celdas
    //             startY: startYEXTdia
    //         });

    //         let tableHeight3 = (this.basicDataExtArray.dia.length + 1) * 2; // Puedes ajustar el factor según tus necesidades

    //         let startYEXTstatus = (pdfDoc as any).autoTable.previous.finalY + tableHeight3;

    //         let columnsstatus = Object.keys(this.basicDataExtArray.mes[0]);
    //         let e:any = columnsstatus.pop()
    //         columnsstatus.unshift(e);
    //         columnsstatus.splice(1,1);
    //         (pdfDoc as any).autoTable({
    //             head: [['Estatus','Falla RPA','Error Operativo','Registro Pendiente','Registro Exitoso','Orden Cancelada por un tercero','Total']],
    //             body: this.basicDataExtArray.status.map((obj:any) => columnsstatus.map(col => obj[col])), // Mapear propiedades a celdas
    //             startY: startYEXTstatus
    //         });







            
    //           pdfDoc.addPage();
    //         //   pdfDoc.setPage
    //         // Guardar el documento PDF
    //         pdfDoc.save('ProcesosBots_Reporte.pdf');
        
          
    //     } else {
    //       console.error('Elemento barChart o barChart.chart no encontrado o no inicializado.');
    //     }    
  
    // }



    
    // generateExcelWithChart() {
    //     const chartElement = this.el.nativeElement.querySelector('#barChart');
    
    //     if (chartElement) {
    //       const canvas: HTMLCanvasElement = chartElement.querySelector('canvas');
    
    //       if (canvas) {
    //         const chartImageURL = canvas.toDataURL('image/png');
            
    //         const workbook = new ExcelJS.Workbook();
    //         const worksheet = workbook.addWorksheet('Depuracion EXT');
    
    //         // Agrega la imagen a la hoja de cálculo
    //         const imageId = workbook.addImage({
    //           base64: chartImageURL.split(',')[1],
    //           extension: 'png',
    //         });
    
    //         worksheet.addImage(imageId, {
    //           tl: { col: 5, row: 1 },
    //           ext: { width: 600, height: 400 }, // Ajusta según tus necesidades
    //         });


    //     // Agrega una tabla debajo de la imagen
    //         const tableOptions = {
    //             name: 'TablaDatos',
    //             ref: 'K11',  // Comienza en la celda B10
    //             headerRow: true,
    //             totalsRow: false,
    //             columns: [
    //             { name: 'Proceso', filterButton: false },
    //             { name: 'Error Operativo', filterButton: false },
    //             { name: 'Falla RPA', filterButton: false },
    //             { name: 'Orden Cancelada', filterButton: false },
    //             { name: 'Registro Exitoso', filterButton: false },
    //             { name: 'Registro Pendiente', filterButton: false },
    //             { name: 'Total', filterButton: false },
    //             ],
    //             // rows: [
    //             // ['Juan', 25, 'Argentina'],
    //             // ['María', 30, 'España'],
    //             // ['Luis', 28, 'México'],
    //             // ['Elena', 35, 'Colombia'],
    //             // ],
    //             rows: this.basicDataExtArray.val.map((item:any) => [item.base, item.errorOperativo, item.fallaRPA,item.ordenCancelada,item.registroExitoso,item.registroPendiente,item.total]),

    //         };
    
    //         worksheet.addTable(tableOptions);

    //         const targetColumns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z','AA','AB','AC','AD','AE','AF']

    //         // Iterar sobre las filas y establecer la alineación para las columnas específicas
    //         for (let rowNumber = 1; rowNumber <= 50; rowNumber++) {
    //             targetColumns.forEach((targetColumn) => {
    //                 const cell = worksheet.getCell(`${targetColumn}${rowNumber}`);
    //                 cell.alignment = { vertical: 'middle', horizontal: 'center' };
    //             });
    //         }
    //         for(let i =0;i < this.setStyle.length;i++){
    //             worksheet.getCell(`${this.setStyle[i]}`).fill = {
    //                 type: 'pattern',
    //                 pattern: 'solid',
    //                 fgColor: { argb: 'FF7987' },
    //             }
    //         }


    //         const startColumn = 'A';
    //         const endColumn = 'AF';

    //         for (let colNumber = worksheet.getColumn(startColumn).number; colNumber <= worksheet.getColumn(endColumn).number; colNumber++) {
    //             const column = worksheet.getColumn(colNumber);
    //             let maxLength = 0;
            
    //             // Iterar sobre cada celda en la columna
    //             column.eachCell({ includeEmpty: true }, function (cell: any) {
    //                 var columnLength = cell.value ? cell.value.toString().length : 20;
    //                 if (columnLength > maxLength) {
    //                     maxLength = columnLength;
    //                 }
    //             });
            
    //             column.width = maxLength < 20 ? 20 : maxLength;
    //         }

    //         worksheet.getColumn('B').width = 30;
    //         worksheet.getColumn('Z').width = 30;




  


  
    //         const tableOptions1 = {
    //             name: 'TablaDatos1',
    //             ref: `B24`,  // Comienza en la celda B10
    //             headerRow: true,
    //             totalsRow: false,
    //             columns: [
    //             { name: 'Motivo', filterButton: false },
    //             { name: 'Error Operativo', filterButton: false },
    //             { name: 'Falla RPA', filterButton: false },
    //             { name: 'Orden Cancelada', filterButton: false },
    //             { name: 'Registro Exitoso', filterButton: false },
    //             { name: 'Registro Pendiente', filterButton: false },
    //             { name: 'Total', filterButton: false },
    //             ],
    //             // rows: [
    //             // ['Juan', 25, 'Argentina'],
    //             // ['María', 30, 'España'],
    //             // ['Luis', 28, 'México'],
    //             // ['Elena', 35, 'Colombia'],
    //             // ],
    //             rows: this.basicDataExtArray.motivo.map((item:any) => [item.base, item.errorOperativo, item.fallaRPA,item.ordenCancelada,item.registroExitoso,item.registroPendiente,item.total]),

    //         };
    
    //         worksheet.addTable(tableOptions1);
    //         const tableOptions2 = {
    //             name: 'TablaDatos2',
    //             ref: `J24`,  // Comienza en la celda B10
    //             headerRow: true,
    //             totalsRow: false,
    //             columns: [
    //             { name: 'Mes', filterButton: false },
    //             { name: 'Error Operativo', filterButton: false },
    //             { name: 'Falla RPA', filterButton: false },
    //             { name: 'Orden Cancelada', filterButton: false },
    //             { name: 'Registro Exitoso', filterButton: false },
    //             { name: 'Registro Pendiente', filterButton: false },
    //             { name: 'Total', filterButton: false },
    //             ],
    //             // rows: [
    //             // ['Juan', 25, 'Argentina'],
    //             // ['María', 30, 'España'],
    //             // ['Luis', 28, 'México'],
    //             // ['Elena', 35, 'Colombia'],
    //             // ],
    //             rows: this.basicDataExtArray.mes.map((item:any) => [this.mesFormat(item.base), item.errorOperativo, item.fallaRPA,item.ordenCancelada,item.registroExitoso,item.registroPendiente,item.total]),

    //         };
    
    //         worksheet.addTable(tableOptions2);

    //         const tableOptions3 = {
    //             name: 'TablaDatos3',
    //             ref: `R24`,  // Comienza en la celda B10
    //             headerRow: true,
    //             totalsRow: false,
    //             columns: [
    //             { name: 'Día', filterButton: false },
    //             { name: 'Error Operativo', filterButton: false },
    //             { name: 'Falla RPA', filterButton: false },
    //             { name: 'Orden Cancelada', filterButton: false },
    //             { name: 'Registro Exitoso', filterButton: false },
    //             { name: 'Registro Pendiente', filterButton: false },
    //             { name: 'Total', filterButton: false },
    //             ],
    //             // rows: [
    //             // ['Juan', 25, 'Argentina'],
    //             // ['María', 30, 'España'],
    //             // ['Luis', 28, 'México'],
    //             // ['Elena', 35, 'Colombia'],
    //             // ],
    //             rows: this.basicDataExtArray.dia.map((item:any) => [item.base, item.errorOperativo, item.fallaRPA,item.ordenCancelada,item.registroExitoso,item.registroPendiente,item.total]),

    //         };
    
    //         worksheet.addTable(tableOptions3);

    //         const tableOptions4 = {
    //             name: 'TablaDatos4',
    //             ref: `Z24`,  // Comienza en la celda B10
    //             headerRow: true,
    //             totalsRow: false,
    //             columns: [
    //             { name: 'Status', filterButton: false },
    //             { name: 'Error Operativo', filterButton: false },
    //             { name: 'Falla RPA', filterButton: false },
    //             { name: 'Orden Cancelada', filterButton: false },
    //             { name: 'Registro Exitoso', filterButton: false },
    //             { name: 'Registro Pendiente', filterButton: false },
    //             { name: 'Total', filterButton: false },
    //             ],
    //             // rows: [
    //             // ['Juan', 25, 'Argentina'],
    //             // ['María', 30, 'España'],
    //             // ['Luis', 28, 'México'],
    //             // ['Elena', 35, 'Colombia'],
    //             // ],
    //             rows: this.basicDataExtArray.status.map((item:any) => [item.base, item.errorOperativo, item.fallaRPA,item.ordenCancelada,item.registroExitoso,item.registroPendiente,item.total]),

    //         };
    
    //         worksheet.addTable(tableOptions4);




    //         // Guarda el archivo Excel
    //         workbook.xlsx.writeBuffer().then((buffer) => {
    //           const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
    //           saveAs.saveAs(blob, 'chart_data.xlsx');
    //         });
    //       } else {
    //         console.error('Canvas no encontrado en el elemento de gráfico.');
    //       }
    //     } else {
    //       console.error('Elemento de gráfico no encontrado');
    //     }
    // }


     generateExcelWithChart() {
        // console.log(this.basicDataExtArray)
        // console.log(this.basicDataCCArray)
        // console.log(this.basicDataAjustesConValidacionArray)
        // console.log(this.basicDataAjustesSinValidacionArray)
        const chartElement = this.el.nativeElement.querySelector('#barChart');
        if (chartElement) {
            const canvas: HTMLCanvasElement = chartElement.querySelector('canvas');
            if (canvas) {
              const chartImageURL = canvas.toDataURL('image/png');
              const workbook = new ExcelJS.Workbook();
              const worksheet = workbook.addWorksheet('Depuracion EXT');
              worksheet.views = [
                { showGridLines: false }
              ];
                const targetColumns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P']

                // Iterar sobre las filas y establecer la alineación para las columnas específicas
                for (let rowNumber = 1; rowNumber <= 700; rowNumber++) {
                    targetColumns.forEach((targetColumn) => {
                        const cell = worksheet.getCell(`${targetColumn}${rowNumber}`);
                        cell.alignment = { wrapText:true,vertical: 'middle', horizontal: 'center' };
                    });
                }
                const startColumn = 'A';
                const endColumn = 'P';

                for (let colNumber = worksheet.getColumn(startColumn).number; colNumber <= worksheet.getColumn(endColumn).number; colNumber++) {
                    const column = worksheet.getColumn(colNumber);
                    let maxLength = 0;
                
                    // Iterar sobre cada celda en la columna
                    column.eachCell({ includeEmpty: true }, function (cell: any) {
                        var columnLength = cell.value ? cell.value.toString().length : 20;
                        if (columnLength > maxLength) {
                            maxLength = columnLength;
                        }
                    });
                
                    column.width = maxLength < 20 ? 20 : maxLength;
                }
                worksheet.getColumn('C').width = 35;
                const imageId = workbook.addImage({
                base64: chartImageURL.split(',')[1],
                extension: 'png',
                });
    
                worksheet.addImage(imageId, {
                tl: { col: 2, row: 0 },
                ext: { width: 600, height: 400 }, 
                });

                let rowStart=25
                for(let i =0;i < this.setStyle.length;i++){
                    worksheet.getCell(`${this.setStyle[i]}${rowStart}`).fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FF7987' },
                    }
                }


                const tableOptions = {
                    name: 'TablaDatos',
                    ref: `A${rowStart}`,  
                    headerRow: true,
                    totalsRow: false,
                    columns: [
                    { name: 'Proceso', filterButton: false },
                    { name: 'Error Operativo', filterButton: false },
                    { name: 'Falla RPA', filterButton: false },
                    { name: 'Orden Cancelada por un tercero', filterButton: false },
                    { name: 'Registro Exitoso', filterButton: false },
                    { name: 'Registro Pendiente', filterButton: false },
                    { name: 'Total', filterButton: false },
                    ],
                    rows: this.basicDataExtArray.val.map((item:any) => [item.base, item.errorOperativo, item.fallaRPA,item.ordenCancelada,item.registroExitoso,item.registroPendiente,item.total]),

                };
        
                worksheet.addTable(tableOptions);

                rowStart = rowStart+this.basicDataExtArray.val.length+2
                for(let i =0;i < this.setStyle.length;i++){
                    worksheet.getCell(`${this.setStyle[i]}${rowStart}`).fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FF7987' },
                    }
                }
                const tableOptions1 = {
                    name: 'TablaDatos1',
                    ref: `A${rowStart}`,  
                    headerRow: true,
                    totalsRow: false,
                    columns: [
                    { name: 'Motivo de la Orden', filterButton: false },
                    { name: 'Error Operativo', filterButton: false },
                    { name: 'Falla RPA', filterButton: false },
                    { name: 'Orden Cancelada por un tercero', filterButton: false },
                    { name: 'Registro Exitoso', filterButton: false },
                    { name: 'Registro Pendiente', filterButton: false },
                    { name: 'Total', filterButton: false },
                    ],
                    rows: this.basicDataExtArray.motivo.map((item:any) => [item.base, item.errorOperativo, item.fallaRPA,item.ordenCancelada,item.registroExitoso,item.registroPendiente,item.total]),

                };
        
                worksheet.addTable(tableOptions1);

                rowStart = rowStart+this.basicDataExtArray.motivo.length+2
                for(let i =0;i < this.setStyle.length;i++){
                    worksheet.getCell(`${this.setStyle[i]}${rowStart}`).fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FF7987' },
                    }
                }
                const tableOptions2 = {
                    name: 'TablaDatos2',
                    ref: `A${rowStart}`,  
                    headerRow: true,
                    totalsRow: false,
                    columns: [
                    { name: 'Mes', filterButton: false },
                    { name: 'Error Operativo', filterButton: false },
                    { name: 'Falla RPA', filterButton: false },
                    { name: 'Orden Cancelada por un tercero', filterButton: false },
                    { name: 'Registro Exitoso', filterButton: false },
                    { name: 'Registro Pendiente', filterButton: false },
                    { name: 'Total', filterButton: false },
                    ],
                    rows: this.basicDataExtArray.mes.map((item:any) => [this.mesFormat(item.base), item.errorOperativo, item.fallaRPA,item.ordenCancelada,item.registroExitoso,item.registroPendiente,item.total]),

                };
        
                worksheet.addTable(tableOptions2);

                rowStart = rowStart+this.basicDataExtArray.mes.length+2
                for(let i =0;i < this.setStyle.length;i++){
                    worksheet.getCell(`${this.setStyle[i]}${rowStart}`).fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FF7987' },
                    }
                }
                const tableOptions3 = {
                    name: 'TablaDatos3',
                    ref: `A${rowStart}`,  
                    headerRow: true,
                    totalsRow: false,
                    columns: [
                    { name: 'Día', filterButton: false },
                    { name: 'Error Operativo', filterButton: false },
                    { name: 'Falla RPA', filterButton: false },
                    { name: 'Orden Cancelada por un tercero', filterButton: false },
                    { name: 'Registro Exitoso', filterButton: false },
                    { name: 'Registro Pendiente', filterButton: false },
                    { name: 'Total', filterButton: false },
                    ],
                    rows: this.basicDataExtArray.dia.map((item:any) => [item.base, item.errorOperativo, item.fallaRPA,item.ordenCancelada,item.registroExitoso,item.registroPendiente,item.total]),

                };
        
                worksheet.addTable(tableOptions3);

                rowStart = rowStart+this.basicDataExtArray.dia.length+2
                for(let i =0;i < this.setStyle.length;i++){
                    worksheet.getCell(`${this.setStyle[i]}${rowStart}`).fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FF7987' },
                    }
                }
                const tableOptions4 = {
                    name: 'TablaDatos4',
                    ref: `A${rowStart}`,  
                    headerRow: true,
                    totalsRow: false,
                    columns: [
                    { name: 'Estatus', filterButton: false },
                    { name: 'Error Operativo', filterButton: false },
                    { name: 'Falla RPA', filterButton: false },
                    { name: 'Orden Cancelada por un tercero', filterButton: false },
                    { name: 'Registro Exitoso', filterButton: false },
                    { name: 'Registro Pendiente', filterButton: false },
                    { name: 'Total', filterButton: false },
                    ],
                    rows: this.basicDataExtArray.status.map((item:any) => [item.base, item.errorOperativo, item.fallaRPA,item.ordenCancelada,item.registroExitoso,item.registroPendiente,item.total]),

                };
        
                worksheet.addTable(tableOptions4);

                //Depuracion cc 
                const chartElement = this.el.nativeElement.querySelector('#barChart1');
                if (chartElement) {
                    const canvas: HTMLCanvasElement = chartElement.querySelector('canvas');
                    if (canvas) {
                        const chartImageURL = canvas.toDataURL('image/png'); 
                        const worksheet1 = workbook.addWorksheet('Depuracion CC');
                        
                        const targetColumns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P']
                        worksheet1.views = [
                            { showGridLines: false }
                          ];
                        // Iterar sobre las filas y establecer la alineación para las columnas específicas
                        for (let rowNumber = 1; rowNumber <= 700; rowNumber++) {
                            targetColumns.forEach((targetColumn) => {
                                const cell = worksheet1.getCell(`${targetColumn}${rowNumber}`);
                                cell.alignment = { wrapText:true,vertical: 'middle', horizontal: 'center' };
                            });
                        }
                        const startColumn = 'A';
                        const endColumn = 'P';
        
                        for (let colNumber = worksheet1.getColumn(startColumn).number; colNumber <= worksheet1.getColumn(endColumn).number; colNumber++) {
                            const column = worksheet1.getColumn(colNumber);
                            let maxLength = 0;
                        
                            // Iterar sobre cada celda en la columna
                            column.eachCell({ includeEmpty: true }, function (cell: any) {
                                var columnLength = cell.value ? cell.value.toString().length : 20;
                                if (columnLength > maxLength) {
                                    maxLength = columnLength;
                                }
                            });
                        
                            column.width = maxLength < 20 ? 20 : maxLength;
                        }
                        worksheet1.getColumn('C').width = 35;
        
                        const imageId = workbook.addImage({
                            base64: chartImageURL.split(',')[1],
                            extension: 'png',
                        });
                
                        worksheet1.addImage(imageId, {
                        tl: { col: 2, row: 0 },
                        ext: { width: 600, height: 400 }, 
                        });

                        let rowStart=25
                        for(let i =0;i < this.setStyle.length;i++){
                            worksheet1.getCell(`${this.setStyle[i]}${rowStart}`).fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: { argb: 'FF7987' },
                            }
                        }


                        const tableOptions = {
                            name: 'TablaDatos5',
                            ref: `A${rowStart}`,  
                            headerRow: true,
                            totalsRow: false,
                            columns: [
                            { name: 'Proceso', filterButton: false },
                            { name: 'Error Operativo', filterButton: false },
                            { name: 'Falla RPA', filterButton: false },
                            { name: 'Orden Cancelada por un tercero', filterButton: false },
                            { name: 'Registro Exitoso', filterButton: false },
                            { name: 'Registro Pendiente', filterButton: false },
                            { name: 'Total', filterButton: false },
                            ],
                            rows: this.basicDataCCArray.val.map((item:any) => [item.base, item.errorOperativo, item.fallaRPA,item.ordenCancelada,item.registroExitoso,item.registroPendiente,item.total]),

                        };
                
                        worksheet1.addTable(tableOptions);

                        rowStart = rowStart+this.basicDataCCArray.val.length+2
                        for(let i =0;i < this.setStyle.length;i++){
                            worksheet1.getCell(`${this.setStyle[i]}${rowStart}`).fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: { argb: 'FF7987' },
                            }
                        }
                        const tableOptions1 = {
                            name: 'TablaDatos6',
                            ref: `A${rowStart}`,  
                            headerRow: true,
                            totalsRow: false,
                            columns: [
                            { name: 'Motivo de la Orden', filterButton: false },
                            { name: 'Error Operativo', filterButton: false },
                            { name: 'Falla RPA', filterButton: false },
                            { name: 'Orden Cancelada por un tercero', filterButton: false },
                            { name: 'Registro Exitoso', filterButton: false },
                            { name: 'Registro Pendiente', filterButton: false },
                            { name: 'Total', filterButton: false },
                            ],
                            rows: this.basicDataCCArray.motivo.map((item:any) => [item.base, item.errorOperativo, item.fallaRPA,item.ordenCancelada,item.registroExitoso,item.registroPendiente,item.total]),

                        };
                
                        worksheet1.addTable(tableOptions1);

                        rowStart = rowStart+this.basicDataCCArray.motivo.length+2
                        for(let i =0;i < this.setStyle.length;i++){
                            worksheet1.getCell(`${this.setStyle[i]}${rowStart}`).fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: { argb: 'FF7987' },
                            }
                        }
                        const tableOptions2 = {
                            name: 'TablaDatos7',
                            ref: `A${rowStart}`,  
                            headerRow: true,
                            totalsRow: false,
                            columns: [
                            { name: 'Tipo de la Orden', filterButton: false },
                            { name: 'Error Operativo', filterButton: false },
                            { name: 'Falla RPA', filterButton: false },
                            { name: 'Orden Cancelada por un tercero', filterButton: false },
                            { name: 'Registro Exitoso', filterButton: false },
                            { name: 'Registro Pendiente', filterButton: false },
                            { name: 'Total', filterButton: false },
                            ],
                            rows: this.basicDataCCArray.tipo.map((item:any) => [item.base, item.errorOperativo, item.fallaRPA,item.ordenCancelada,item.registroExitoso,item.registroPendiente,item.total]),

                        };
                
                        worksheet1.addTable(tableOptions2);

                        rowStart = rowStart+this.basicDataCCArray.tipo.length+2
                        for(let i =0;i < this.setStyle.length;i++){
                            worksheet1.getCell(`${this.setStyle[i]}${rowStart}`).fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: { argb: 'FF7987' },
                            }
                        }
                        const tableOptions3 = {
                            name: 'TablaDatos7',
                            ref: `A${rowStart}`,  
                            headerRow: true,
                            totalsRow: false,
                            columns: [
                            { name: 'Mes', filterButton: false },
                            { name: 'Error Operativo', filterButton: false },
                            { name: 'Falla RPA', filterButton: false },
                            { name: 'Orden Cancelada por un tercero', filterButton: false },
                            { name: 'Registro Exitoso', filterButton: false },
                            { name: 'Registro Pendiente', filterButton: false },
                            { name: 'Total', filterButton: false },
                            ],
                            rows: this.basicDataCCArray.mes.map((item:any) => [this.mesFormat(item.base), item.errorOperativo, item.fallaRPA,item.ordenCancelada,item.registroExitoso,item.registroPendiente,item.total]),

                        };
                
                        worksheet1.addTable(tableOptions3);

                        rowStart = rowStart+this.basicDataCCArray.mes.length+2
                        for(let i =0;i < this.setStyle.length;i++){
                            worksheet1.getCell(`${this.setStyle[i]}${rowStart}`).fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: { argb: 'FF7987' },
                            }
                        }
                        const tableOptions4 = {
                            name: 'TablaDatos8',
                            ref: `A${rowStart}`,  
                            headerRow: true,
                            totalsRow: false,
                            columns: [
                            { name: 'Día', filterButton: false },
                            { name: 'Error Operativo', filterButton: false },
                            { name: 'Falla RPA', filterButton: false },
                            { name: 'Orden Cancelada por un tercero', filterButton: false },
                            { name: 'Registro Exitoso', filterButton: false },
                            { name: 'Registro Pendiente', filterButton: false },
                            { name: 'Total', filterButton: false },
                            ],
                            rows: this.basicDataCCArray.dia.map((item:any) => [item.base, item.errorOperativo, item.fallaRPA,item.ordenCancelada,item.registroExitoso,item.registroPendiente,item.total]),

                        };
                
                        worksheet1.addTable(tableOptions4);

                        rowStart = rowStart+this.basicDataCCArray.dia.length+2
                        for(let i =0;i < this.setStyle.length;i++){
                            worksheet1.getCell(`${this.setStyle[i]}${rowStart}`).fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: { argb: 'FF7987' },
                            }
                        }
                        const tableOptions5 = {
                            name: 'TablaDatos8',
                            ref: `A${rowStart}`,  
                            headerRow: true,
                            totalsRow: false,
                            columns: [
                            { name: 'Estatus', filterButton: false },
                            { name: 'Error Operativo', filterButton: false },
                            { name: 'Falla RPA', filterButton: false },
                            { name: 'Orden Cancelada por un tercero', filterButton: false },
                            { name: 'Registro Exitoso', filterButton: false },
                            { name: 'Registro Pendiente', filterButton: false },
                            { name: 'Total', filterButton: false },
                            ],
                            rows: this.basicDataCCArray.status.map((item:any) => [item.base, item.errorOperativo, item.fallaRPA,item.ordenCancelada,item.registroExitoso,item.registroPendiente,item.total]),

                        };
                
                        worksheet1.addTable(tableOptions5);
                        
                    
                    
                    }
                }
                
                //Ajustes con validacion 
                const chartElement1 = this.el.nativeElement.querySelector('#barChart2');
                if (chartElement1) {
                    const canvas: HTMLCanvasElement = chartElement1.querySelector('canvas');
                    if (canvas) {
                        const chartImageURL = canvas.toDataURL('image/png'); 
                        const worksheet2 = workbook.addWorksheet('Ajustes con Validación');
                        
                        const targetColumns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P']
                        worksheet2.views = [
                            { showGridLines: false }
                            ];
                        // Iterar sobre las filas y establecer la alineación para las columnas específicas
                        for (let rowNumber = 1; rowNumber <= 700; rowNumber++) {
                            targetColumns.forEach((targetColumn) => {
                                const cell = worksheet2.getCell(`${targetColumn}${rowNumber}`);
                                cell.alignment = { wrapText:true,vertical: 'middle', horizontal: 'center' };
                            });
                        }
                        const startColumn = 'A';
                        const endColumn = 'P';
        
                        for (let colNumber = worksheet2.getColumn(startColumn).number; colNumber <= worksheet2.getColumn(endColumn).number; colNumber++) {
                            const column = worksheet2.getColumn(colNumber);
                            let maxLength = 0;
                        
                            // Iterar sobre cada celda en la columna
                            column.eachCell({ includeEmpty: true }, function (cell: any) {
                                var columnLength = cell.value ? cell.value.toString().length : 20;
                                if (columnLength > maxLength) {
                                    maxLength = columnLength;
                                }
                            });
                        
                            column.width = maxLength < 20 ? 20 : maxLength;
                        }
                        worksheet2.getColumn('C').width = 35;
        
                        const imageId = workbook.addImage({
                            base64: chartImageURL.split(',')[1],
                            extension: 'png',
                        });
                
                        worksheet2.addImage(imageId, {
                        tl: { col: 2, row: 0 },
                        ext: { width: 600, height: 400 }, 
                        });

                        let rowStart=25
                        for(let i =0;i < this.setStyle.length;i++){
                            worksheet2.getCell(`${this.setStyle[i]}${rowStart}`).fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: { argb: 'FFBF00' },
                            }
                        }


                        const tableOptions = {
                            name: 'TablaDatos9',
                            ref: `A${rowStart}`,  
                            headerRow: true,
                            totalsRow: false,
                            columns: [
                            { name: 'Proceso', filterButton: false },
                            { name: 'Error Operativo', filterButton: false },
                            { name: 'Falla RPA', filterButton: false },
                            { name: 'Ajustes Realizados', filterButton: false },
                            { name: 'Inconsistencia de Siebel', filterButton: false },
                            { name: 'Registro Pendiente', filterButton: false },
                            { name: 'Total', filterButton: false },
                            ],
                            rows: this.basicDataAjustesConValidacionArray.val.map((item:any) => [item.base, item.errorOperativo, item.fallaRPA,item.ajusteRealizado,item.inconcistenciaSiebel,item.registroPendiente,item.total]),

                        };
                
                        worksheet2.addTable(tableOptions);

                        rowStart = rowStart+this.basicDataAjustesConValidacionArray.val.length+2
                        for(let i =0;i < this.setStyle.length;i++){
                            worksheet2.getCell(`${this.setStyle[i]}${rowStart}`).fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: { argb: 'FFBF00' },
                            }
                        }
                        const tableOptions1 = {
                            name: 'TablaDatos10',
                            ref: `A${rowStart}`,  
                            headerRow: true,
                            totalsRow: false,
                            columns: [
                            { name: 'Categoría', filterButton: false },
                            { name: 'Error Operativo', filterButton: false },
                            { name: 'Falla RPA', filterButton: false },
                            { name: 'Ajustes Realizados', filterButton: false },
                            { name: 'Inconsistencia de Siebel', filterButton: false },
                            { name: 'Registro Pendiente', filterButton: false },
                            { name: 'Total', filterButton: false },
                            ],
                            rows: this.basicDataAjustesConValidacionArray.categoria.map((item:any) => [item.base, item.errorOperativo, item.fallaRPA,item.ajusteRealizado,item.inconcistenciaSiebel,item.registroPendiente,item.total]),

                        };
                
                        worksheet2.addTable(tableOptions1);

                        rowStart = rowStart+this.basicDataAjustesConValidacionArray.categoria.length+2
                        for(let i =0;i < this.setStyle.length;i++){
                            worksheet2.getCell(`${this.setStyle[i]}${rowStart}`).fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: { argb: 'FFBF00' },
                            }
                        }
                        const tableOptions2 = {
                            name: 'TablaDatos11',
                            ref: `A${rowStart}`,  
                            headerRow: true,
                            totalsRow: false,
                            columns: [
                            { name: 'Solución', filterButton: false },
                            { name: 'Error Operativo', filterButton: false },
                            { name: 'Falla RPA', filterButton: false },
                            { name: 'Ajustes Realizados', filterButton: false },
                            { name: 'Inconsistencia de Siebel', filterButton: false },
                            { name: 'Registro Pendiente', filterButton: false },
                            { name: 'Total', filterButton: false },
                            ],
                            rows: this.basicDataAjustesConValidacionArray.solucion.map((item:any) => [item.base, item.errorOperativo, item.fallaRPA,item.ajusteRealizado,item.inconcistenciaSiebel,item.registroPendiente,item.total]),

                        };
                
                        worksheet2.addTable(tableOptions2);

                        rowStart = rowStart+this.basicDataAjustesConValidacionArray.solucion.length+2
                        for(let i =0;i < this.setStyle.length;i++){
                            worksheet2.getCell(`${this.setStyle[i]}${rowStart}`).fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: { argb: 'FFBF00' },
                            }
                        }
                        const tableOptions3 = {
                            name: 'TablaDatos12',
                            ref: `A${rowStart}`,  
                            headerRow: true,
                            totalsRow: false,
                            columns: [
                            { name: 'Mes', filterButton: false },
                            { name: 'Error Operativo', filterButton: false },
                            { name: 'Falla RPA', filterButton: false },
                            { name: 'Ajustes Realizados', filterButton: false },
                            { name: 'Inconsistencia de Siebel', filterButton: false },
                            { name: 'Registro Pendiente', filterButton: false },
                            { name: 'Total', filterButton: false },
                            ],
                            rows: this.basicDataAjustesConValidacionArray.mes.map((item:any) => [this.mesFormat(item.base), item.errorOperativo, item.fallaRPA,item.ajusteRealizado,item.inconcistenciaSiebel,item.registroPendiente,item.total]),

                        };
                
                        worksheet2.addTable(tableOptions3);

                        rowStart = rowStart+this.basicDataAjustesConValidacionArray.mes.length+2
                        for(let i =0;i < this.setStyle.length;i++){
                            worksheet2.getCell(`${this.setStyle[i]}${rowStart}`).fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: { argb: 'FFBF00' },
                            }
                        }
                        const tableOptions4 = {
                            name: 'TablaDatos13',
                            ref: `A${rowStart}`,  
                            headerRow: true,
                            totalsRow: false,
                            columns: [
                            { name: 'Día', filterButton: false },
                            { name: 'Error Operativo', filterButton: false },
                            { name: 'Falla RPA', filterButton: false },
                            { name: 'Ajustes Realizados', filterButton: false },
                            { name: 'Inconsistencia de Siebel', filterButton: false },
                            { name: 'Registro Pendiente', filterButton: false },
                            { name: 'Total', filterButton: false },
                            ],
                            rows: this.basicDataAjustesConValidacionArray.dia.map((item:any) => [item.base, item.errorOperativo, item.fallaRPA,item.ajusteRealizado,item.inconcistenciaSiebel,item.registroPendiente,item.total]),

                        };
                
                        worksheet2.addTable(tableOptions4);

                        rowStart = rowStart+this.basicDataAjustesConValidacionArray.dia.length+2
                        for(let i =0;i < this.setStyle.length;i++){
                            worksheet2.getCell(`${this.setStyle[i]}${rowStart}`).fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: { argb: 'FFBF00' },
                            }
                        }
                        const tableOptions5 = {
                            name: 'TablaDatos14',
                            ref: `A${rowStart}`,  
                            headerRow: true,
                            totalsRow: false,
                            columns: [
                            { name: 'Estatus', filterButton: false },
                            { name: 'Error Operativo', filterButton: false },
                            { name: 'Falla RPA', filterButton: false },
                            { name: 'Ajustes Realizados', filterButton: false },
                            { name: 'Inconsistencia de Siebel', filterButton: false },
                            { name: 'Registro Pendiente', filterButton: false },
                            { name: 'Total', filterButton: false },
                            ],
                            rows: this.basicDataAjustesConValidacionArray.status.map((item:any) => [item.base, item.errorOperativo, item.fallaRPA,item.ajusteRealizado,item.inconcistenciaSiebel,item.registroPendiente,item.total]),

                        };
                
                        worksheet2.addTable(tableOptions5);
                        
                    
                    
                    }
                }
                
                //Ajustes sin validacion 
                const chartElement2 = this.el.nativeElement.querySelector('#barChart3');
                if (chartElement2) {
                    const canvas: HTMLCanvasElement = chartElement2.querySelector('canvas');
                    if (canvas) {
                        const chartImageURL = canvas.toDataURL('image/png'); 
                        const worksheet3 = workbook.addWorksheet('Ajustes sin Validación');
                        
                        const targetColumns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P']
                        worksheet3.views = [
                            { showGridLines: false }
                            ];
                        // Iterar sobre las filas y establecer la alineación para las columnas específicas
                        for (let rowNumber = 1; rowNumber <= 700; rowNumber++) {
                            targetColumns.forEach((targetColumn) => {
                                const cell = worksheet3.getCell(`${targetColumn}${rowNumber}`);
                                cell.alignment = { wrapText:true,vertical: 'middle', horizontal: 'center' };
                            });
                        }
                        const startColumn = 'A';
                        const endColumn = 'P';
        
                        for (let colNumber = worksheet3.getColumn(startColumn).number; colNumber <= worksheet3.getColumn(endColumn).number; colNumber++) {
                            const column = worksheet3.getColumn(colNumber);
                            let maxLength = 0;
                        
                            // Iterar sobre cada celda en la columna
                            column.eachCell({ includeEmpty: true }, function (cell: any) {
                                var columnLength = cell.value ? cell.value.toString().length : 20;
                                if (columnLength > maxLength) {
                                    maxLength = columnLength;
                                }
                            });
                        
                            column.width = maxLength < 20 ? 20 : maxLength;
                        }
                        worksheet3.getColumn('C').width = 35;
        
                        const imageId = workbook.addImage({
                            base64: chartImageURL.split(',')[1],
                            extension: 'png',
                        });
                
                        worksheet3.addImage(imageId, {
                        tl: { col: 2, row: 0 },
                        ext: { width: 600, height: 400 }, 
                        });

                        let rowStart=25
                        for(let i =0;i < this.setStyle.length;i++){
                            worksheet3.getCell(`${this.setStyle[i]}${rowStart}`).fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: { argb: 'FFBF00' },
                            }
                        }


                        const tableOptions = {
                            name: 'TablaDatos15',
                            ref: `A${rowStart}`,  
                            headerRow: true,
                            totalsRow: false,
                            columns: [
                            { name: 'Proceso', filterButton: false },
                            { name: 'Error Operativo', filterButton: false },
                            { name: 'Falla RPA', filterButton: false },
                            { name: 'Ajustes Realizados', filterButton: false },
                            { name: 'Inconsistencia de Siebel', filterButton: false },
                            { name: 'Registro Pendiente', filterButton: false },
                            { name: 'Total', filterButton: false },
                            ],
                            rows: this.basicDataAjustesSinValidacionArray.val.map((item:any) => [item.base, item.errorOperativo, item.fallaRPA,item.ajusteRealizado,item.inconcistenciaSiebel,item.registroPendiente,item.total]),

                        };
                
                        worksheet3.addTable(tableOptions);

                        rowStart = rowStart+this.basicDataAjustesSinValidacionArray.val.length+2
                        for(let i =0;i < this.setStyle.length;i++){
                            worksheet3.getCell(`${this.setStyle[i]}${rowStart}`).fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: { argb: 'FFBF00' },
                            }
                        }
                        const tableOptions1 = {
                            name: 'TablaDatos16',
                            ref: `A${rowStart}`,  
                            headerRow: true,
                            totalsRow: false,
                            columns: [
                            { name: 'Motivo del Ajuste', filterButton: false },
                            { name: 'Error Operativo', filterButton: false },
                            { name: 'Falla RPA', filterButton: false },
                            { name: 'Ajustes Realizados', filterButton: false },
                            { name: 'Inconsistencia de Siebel', filterButton: false },
                            { name: 'Registro Pendiente', filterButton: false },
                            { name: 'Total', filterButton: false },
                            ],
                            rows: this.basicDataAjustesSinValidacionArray.motivoAjuste.map((item:any) => [item.base, item.errorOperativo, item.fallaRPA,item.ajusteRealizado,item.inconcistenciaSiebel,item.registroPendiente,item.total]),

                        };
                
                        worksheet3.addTable(tableOptions1);

                        rowStart = rowStart+this.basicDataAjustesSinValidacionArray.motivoAjuste.length+2
                        for(let i =0;i < this.setStyle.length;i++){
                            worksheet3.getCell(`${this.setStyle[i]}${rowStart}`).fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: { argb: 'FFBF00' },
                            }
                        }
                        const tableOptions2 = {
                            name: 'TablaDatos17',
                            ref: `A${rowStart}`,  
                            headerRow: true,
                            totalsRow: false,
                            columns: [
                            { name: 'Mes', filterButton: false },
                            { name: 'Error Operativo', filterButton: false },
                            { name: 'Falla RPA', filterButton: false },
                            { name: 'Ajustes Realizados', filterButton: false },
                            { name: 'Inconsistencia de Siebel', filterButton: false },
                            { name: 'Registro Pendiente', filterButton: false },
                            { name: 'Total', filterButton: false },
                            ],
                            rows: this.basicDataAjustesSinValidacionArray.mes.map((item:any) => [item.base, item.errorOperativo, item.fallaRPA,item.ajusteRealizado,item.inconcistenciaSiebel,item.registroPendiente,item.total]),

                        };
                
                        worksheet3.addTable(tableOptions2);


                        rowStart = rowStart+this.basicDataAjustesSinValidacionArray.mes.length+2
                        for(let i =0;i < this.setStyle.length;i++){
                            worksheet3.getCell(`${this.setStyle[i]}${rowStart}`).fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: { argb: 'FFBF00' },
                            }
                        }
                        const tableOptions4 = {
                            name: 'TablaDatos18',
                            ref: `A${rowStart}`,  
                            headerRow: true,
                            totalsRow: false,
                            columns: [
                            { name: 'Día', filterButton: false },
                            { name: 'Error Operativo', filterButton: false },
                            { name: 'Falla RPA', filterButton: false },
                            { name: 'Ajustes Realizados', filterButton: false },
                            { name: 'Inconsistencia de Siebel', filterButton: false },
                            { name: 'Registro Pendiente', filterButton: false },
                            { name: 'Total', filterButton: false },
                            ],
                            rows: this.basicDataAjustesSinValidacionArray.dia.map((item:any) => [item.base, item.errorOperativo, item.fallaRPA,item.ajusteRealizado,item.inconcistenciaSiebel,item.registroPendiente,item.total]),

                        };
                
                        worksheet3.addTable(tableOptions4);

                        rowStart = rowStart+this.basicDataAjustesSinValidacionArray.dia.length+2
                        for(let i =0;i < this.setStyle.length;i++){
                            worksheet3.getCell(`${this.setStyle[i]}${rowStart}`).fill = {
                                type: 'pattern',
                                pattern: 'solid',
                                fgColor: { argb: 'FFBF00' },
                            }
                        }
                        const tableOptions5 = {
                            name: 'TablaDatos19',
                            ref: `A${rowStart}`,  
                            headerRow: true,
                            totalsRow: false,
                            columns: [
                            { name: 'Estatus', filterButton: false },
                            { name: 'Error Operativo', filterButton: false },
                            { name: 'Falla RPA', filterButton: false },
                            { name: 'Ajustes Realizados', filterButton: false },
                            { name: 'Inconsistencia de Siebel', filterButton: false },
                            { name: 'Registro Pendiente', filterButton: false },
                            { name: 'Total', filterButton: false },
                            ],
                            rows: this.basicDataAjustesSinValidacionArray.status.map((item:any) => [item.base, item.errorOperativo, item.fallaRPA,item.ajusteRealizado,item.inconcistenciaSiebel,item.registroPendiente,item.total]),

                        };
                
                        worksheet3.addTable(tableOptions5);
                        
                    
                    
                    }
                }


                // Guarda el archivo Excel
                workbook.xlsx.writeBuffer().then((buffer) => {
                    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
                saveAs.saveAs(blob, 'DashboardProcesos_Report.xlsx');
            });
        } else {
            console.error('Canvas no encontrado en el elemento de gráfico.');
        }
        } else {
          console.error('Elemento de gráfico no encontrado');
        }
    }






}
