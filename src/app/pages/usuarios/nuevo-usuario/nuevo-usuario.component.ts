import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CorsService } from '@services';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.scss'],
})
export class NuevoUsuarioComponent implements OnInit {
  formNuevoBot: UntypedFormGroup;

  guardando: boolean = false


  rolArr: any[] = [
    {
      id: "1", descripcion: "Agente"
    },
    {
      id: "2", descripcion: "Supervisor"
    },
    {
      id: "3", descripcion: "Administrador"
    }
  ]
  constructor(

    private message: MessageService,
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private cors: CorsService) {
    this.formNuevoBot = this.formBuilder.group({

      pWd: [null, Validators.required],
      email: [null, Validators.required],
      role: [null,[ Validators.required,Validators.min(1)]],
      userID: [0],
      firstName: [""],
      lastName: [""],
      mobile: [""],
      gender: [""],
      memberSince: [moment().format('YYYY-MM-DDTHH:mm:ss')],
      token: [""],

    });


  }



  guardarUser() {
    this.guardando = true
    this.formNuevoBot.markAllAsTouched()
    if (this.formNuevoBot.valid) {
      this.cors.post('Usuarios/GuardarUsuarios', this.formNuevoBot.value).then((response) => {
        console.log("aca");

        console.log(response);
        this.showToastSuccess('Usuario guardado correctamente.');
        setTimeout(() => {
          this.router.navigate(["/usuarios"])
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
