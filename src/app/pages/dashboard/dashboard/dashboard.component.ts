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





    constructor(private cors: CorsService,private formBuilder: UntypedFormBuilder,private primengConfig: PrimeNGConfig,private messageService: MessageService,) {
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

                console.log(this.basicDataExtArray)
               

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


    generatePDF(){

        const pdfDoc = new jsPDF();

        // Verificar que el gráfico se haya inicializado
        if (this.barChart && this.barChart.chart) {
          const chart = this.barChart.chart;
          
          // Obtener el elemento canvas del gráfico
          const chartCanvas = chart.ctx.canvas;
          const chartDataUrl = chartCanvas.toDataURL('image/png');
    
          // Agregar la imagen del gráfico al documento PDF
          pdfDoc.addImage(chartDataUrl, 'PNG', 10, 10, 190, 100);

          let a:any=[];
          let b:any=[];
            
          // Aquí puedes usar autoTable para generar tus tablas
            this.basicDataExtArray.val.forEach((obj:any) => {
                Object.entries(obj).forEach(([key, value]) => {
                    if(key=='base'){
                        a.push('Proceso')
                        b.push(value)
                    }
                    if(key=='errorOperativo'){
                        a.push('Error Operativo')
                        b.push(value)
                    }
                    if(key=='fallaRPA'){
                        a.push('Falla RPA')
                        b.push(value)
                    }
                    if(key=='ordenCancelada'){
                        a.push('Orden Cancelada por un Tercero')
                        b.push(value)
                    }
                    if(key=='registroExitoso'){
                        a.push('Registro Exitoso')
                        b.push(value)
                    }
                    if(key=='registroPendiente'){
                        a.push('Registro Pendiente')
                        b.push(value)
                    }
                    if(key=='total'){
                        a.push('Total')
                        b.push(value)
                    }
                });
                
                
            });
            let aa=a.pop();
            a.unshift(aa);
            let bb=b.pop();
            b.unshift(bb);
            (pdfDoc as any).autoTable({
                head: [a],
                body: [b],
                startY: 120
            });
            // Obtener la altura total de la tabla
            let tableHeight = (this.basicDataExtArray.val.length + 1) * 5; // Puedes ajustar el factor según tus necesidades

            // Ajustar la posición vertical dinámicamente
            let startYEXTmotivo = (pdfDoc as any).autoTable.previous.finalY + tableHeight;

            let columns = Object.keys(this.basicDataExtArray.motivo[0]);
            let c:any = columns.pop()
            columns.unshift(c);
            columns.splice(1,1);
            (pdfDoc as any).autoTable({
                head: [['Motivo de la orden','Falla RPA','Error Operativo','Registro Pendiente','Registro Exitoso','Orden Cancelada por un tercero','Total']],
                body: this.basicDataExtArray.motivo.map((obj:any) => columns.map(col => obj[col])), // Mapear propiedades a celdas
                startY: startYEXTmotivo
            });


            let tableHeight1 = (this.basicDataExtArray.motivo.length + 1) * 2; // Puedes ajustar el factor según tus necesidades
            let startYEXTmes = (pdfDoc as any).autoTable.previous.finalY + tableHeight1;
            let columnsmES = Object.keys(this.basicDataExtArray.mes[0]);
            let cc:any = columnsmES.pop()
            columnsmES.unshift(cc);
            columnsmES.splice(1,1);
            (pdfDoc as any).autoTable({
                head: [['Mes','Falla RPA','Error Operativo','Registro Pendiente','Registro Exitoso','Orden Cancelada por un tercero','Total']],
                body: this.basicDataExtArray.mes.map((obj:any) => columnsmES.map(col => obj[col])), // Mapear propiedades a celdas
                startY: startYEXTmes
            });


            let tableHeight2 = (this.basicDataExtArray.mes.length + 1) * 2; // Puedes ajustar el factor según tus necesidades

            let startYEXTdia = (pdfDoc as any).autoTable.previous.finalY + tableHeight2;

            let columnsdia = Object.keys(this.basicDataExtArray.mes[0]);
            let d:any = columnsdia.pop()
            columnsdia.unshift(d);
            columnsdia.splice(1,1);
            (pdfDoc as any).autoTable({
                head: [['Día','Falla RPA','Error Operativo','Registro Pendiente','Registro Exitoso','Orden Cancelada por un tercero','Total']],
                body: this.basicDataExtArray.dia.map((obj:any) => columnsdia.map(col => obj[col])), // Mapear propiedades a celdas
                startY: startYEXTdia
            });

            let tableHeight3 = (this.basicDataExtArray.dia.length + 1) * 2; // Puedes ajustar el factor según tus necesidades

            let startYEXTstatus = (pdfDoc as any).autoTable.previous.finalY + tableHeight3;

            let columnsstatus = Object.keys(this.basicDataExtArray.mes[0]);
            let e:any = columnsstatus.pop()
            columnsstatus.unshift(e);
            columnsstatus.splice(1,1);
            (pdfDoc as any).autoTable({
                head: [['Estatus','Falla RPA','Error Operativo','Registro Pendiente','Registro Exitoso','Orden Cancelada por un tercero','Total']],
                body: this.basicDataExtArray.status.map((obj:any) => columnsstatus.map(col => obj[col])), // Mapear propiedades a celdas
                startY: startYEXTstatus
            });







            
              pdfDoc.addPage();
            //   pdfDoc.setPage
            // Guardar el documento PDF
            pdfDoc.save('ProcesosBots_Reporte.pdf');
        
          
        } else {
          console.error('Elemento barChart o barChart.chart no encontrado o no inicializado.');
        }    
  
    }


    generateExcel(){

    }















}
