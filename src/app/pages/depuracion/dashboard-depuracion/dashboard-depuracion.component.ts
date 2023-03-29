import { Component, OnInit } from '@angular/core';
import { CorsService } from '@services';
import * as moment from 'moment';
moment.lang('es');
import { Message, MessageService } from 'primeng/api';


@Component({
  selector: 'dashboard-depuracion',
  templateUrl: './dashboard-depuracion.component.html',
  styleUrls: ['./dashboard-depuracion.component.scss']
})
export class DashboardDepuracionComponent implements OnInit {
	horarios:any[]=[];
	first:any=null;
	second:any=null;
	constructor(private cors: CorsService,private messageService: MessageService) {
		
	}

	ngOnInit(): void {
		this.visualizarHorarios()
	}

	visualizarHorarios(){
		this.cors.get('EjecucionDepuracion/getHoursDepuracion')
		.then((response) => {
		//   console.log(response)
		this.horarios = response;
		//   this.messageService.add({
		// 	key: 'tst',
		// 	severity: 'success',
		// 	summary: 'Exito!!!',
		// 	detail: 'Datos guardados',
		//   });
		})
		.catch((error) => {
		console.log(error)
		//   this.messageService.add({
		// 	key:'tst',
		// 	severity: 'error',
		// 	summary: 'No se logro guardar',
		// 	detail: 'Intenta Nuevamente!!!',
		//   });
		});

	}

	changeHorarios(event:any){
		this.first = event;
		// console.log(this.first)
	}

	changeTime(event:any){
		this.second = moment(event).format('HH:mm:00 a');
		// console.log(this.second)

	}
	enviar(){
		let a ={
			"id":this.first,
			"horario":this.second
		}
		this.cors.put(`EjecucionDepuracion/ActualizaHoursDepuracion?id=${this.first}`,a)
		.then((response) => {
		//   console.log(response)
		  this.messageService.add({
			key: 'tst',
			severity: 'success',
			summary: 'Exito!!!',
			detail: 'Horario Editado',
		  });
		  this.visualizarHorarios();
		})
		.catch((error) => {
		console.log(error)
		  this.messageService.add({
			key:'tst',
			severity: 'error',
			summary: 'No se logro actualizar',
			detail: 'Intenta Nuevamente!!!',
		  });
		});
		this.first =null;
		this.second =null;
	}


}
