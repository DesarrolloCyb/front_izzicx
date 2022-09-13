import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { CorsService } from '@services';
import { Message, MessageService } from 'primeng/api';
import { APIService } from '../../../_services/api.service';

@Component({
  selector: 'cancelacion',
  templateUrl: './cancelacion.component.html',
  styleUrls: ['./cancelacion.component.scss'],
})
export class CancelacionComponent implements OnInit {
  formCancelacion: UntypedFormGroup;
  agenteID = 123456; //Debe salir del direcotrio activo
  telefonosNd?: string[];
  enviando: boolean = false;
  closeModal: boolean = true;
  tiposCancelacion = [
    {
      value: 'single_video',
      nombre: 'Sigle Video',
    },
    {
      value: 'modem_combo',
      nombre: 'Módem Combo',
    },
    {
      value: 'btcel_combo',
      nombre: 'BTCEL Combo',
    },
  ];

  Pais = [
    'Mexico',
    'Costa Rica',
    'Panama',
    'Nicaragua',
    'El Salvador',
    ' R. Dominicana',
    'Guatemala',
    'Honduras',
  ];

  confirmacion: any; //Mensaje de confirmmacion de datos

  mostrandoResultados: boolean = false;
  display: boolean = false; //Dialogo de confirmacion
  formulario_valido: boolean | undefined;
  today = new Date();
  minDate =
    this.today.getFullYear() +
    '-' +
    this.today.getMonth +
    '-' +
    this.today.getDay();
  //Alertas y mensajes
  msgs: Message[] = [];
  msgs1: any;
  validador = [false];
  aux: string | undefined;
  aux2: string | undefined;
usuario:any = JSON.parse(localStorage.getItem( "userData")||  "{}" ) 
  toClearControls: string[] = ["tipoCancelacion", "cuenta", "ordenServicio", "pais", "fechaCorte", "cve_supervisor", "nd"]

  constructor(
    private cors: CorsService,
    private formBuilder: UntypedFormBuilder,
    private messageService: MessageService
  ) {

    
    this.formCancelacion = this.formBuilder.group({
      tipoCancelacion: [null, Validators.required],
      cuenta: [null, Validators.required],
      ordenServicio: [null, Validators.required],
      pais: [null, Validators.required],
      fechaCorte: [null, Validators.required], //Esta fecha es la del dia de la maquina
      cve_usuario: [this.usuario.email, Validators.required], //Se obtiene del direcotrio activo
      cve_supervisor: [null, Validators.required],
      nd: [null],
    });
  }

  ngOnInit() { }

  verify() {

    this.formCancelacion.markAllAsTouched();
    if (this.formCancelacion.valid) {
      this.display = true;
    }
  }
  tipoCancelacion(evento: any) {
    console.log(evento);
    if (evento == 'BTCel Combo') {
      this.formCancelacion.controls['nd'].setValidators(Validators.required);
      this.formCancelacion.controls['nd'].updateValueAndValidity();
    } else {
      this.formCancelacion.controls['nd'].clearValidators();
      this.formCancelacion.controls['nd'].updateValueAndValidity();
    }
  }

  telefonosMod() {
    this.formCancelacion.controls['nd'].setValue(this.telefonosNd?.join(','));
  }
  sendData() {
    console.log('click');
    this.closeModal = false;
    this.enviando = true;
    if (this.formCancelacion.valid) {
      this.cors
        .post('Formularios/GuardarFormulario', this.formCancelacion.value)
        .then((response) => {
          console.log(  "d");

          this.display = false;
          this.enviando = false;
          this.toClearControls.forEach((element) => {
            console.log(element);

            this.formCancelacion.controls[element].setValue(null)
          })
          this.formCancelacion.markAsUntouched()
          this.telefonosNd = []
          this.messageService.add({
            key: 'tst',
            severity: 'success',
            summary: 'Datos guardados',
            detail: 'La solicitud de cancelacion fue guardada',
          });
        })
        .catch((error) => {
          error;
          this.enviando = false;
          this.display = false;
          this.msgs.push({
            severity: 'error',
            summary: 'No se logro guardar',
            detail: 'La solicitud de cancelacion no fue guardada',
          });
        });
    }
  }

  //▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ MENSAJES ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬
  showErrorViaToast() {
    console.log('ERROR');
    this.messageService.add({
      key: 'tst',
      severity: 'error',
      summary: 'Faltan datos',
      detail: 'Ingrese todos todos los campos',
    });
  }
  load(index: number) {
    this.validador[index] = true;
    setTimeout(() => (this.validador[index] = false), 1000);
  }
}
