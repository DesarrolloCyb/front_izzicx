import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CorsService } from '@services';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'robots-nuevo',
  templateUrl: './robots-nuevo.component.html',
  styleUrls: ['./robots-nuevo.component.scss']
})
export class RobotsNuevoComponent implements OnInit {
  formNuevoBot: UntypedFormGroup;

  guardando: boolean = false
  processArr: any[] = []
  constructor(
    
    private message: MessageService,
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private cors: CorsService) {
    this.formNuevoBot = this.formBuilder.group({
      ipEquipo: [null, [Validators.required, Validators.pattern('(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')]],
      procesoId: [null, Validators.required],
      comentarios: [null, Validators.required],
      hostName: [null, Validators.required],
      usuarioBot: [null, Validators.required],
      passwordBot: [null, Validators.required],

    });
    this.getCats()

  }
  

  getCats() {
    this.cors.get('Bots/ObtenerListProcess').then((response) => {
      console.log(response);
      this.processArr = response
    }).catch((error) => {

    })
  }
  guardarBot() {
    this.guardando = true
    this.formNuevoBot.markAllAsTouched()
    if (this.formNuevoBot.valid) {
      this.cors.post('Bots/GuardarDataBots', this.formNuevoBot.value).then((response) => {
        console.log("aca");

        console.log(response);
        this.showToastSuccess('Maquina guardada correctamente.' );
        setTimeout(() => {
          this.router.navigate(["/robots"])
        }, 3000);

      }).catch((error) => {
        console.log(error);
        this.guardando = false
        this.showToastError('No se logro guardar, intente de nuevo.');
      })
    }
  }
  ngOnInit(): void {


  }
  showToastSuccess(mensaje: any) {
    this.message.add({ key: 'tst', severity: 'success', summary: 'Correcto!!', detail: mensaje, });
  }
  showToastError(mensaje: any) {
    this.message.add({ key: 'tst', severity: 'error', summary: 'Correcto!!', detail: mensaje, });
  }

}
