import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CorsService } from '@services';
import * as moment from 'moment';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.scss']
})
export class DetalleUsuarioComponent implements OnInit, OnDestroy {
  formNuevoBot: UntypedFormGroup;

  guardando: boolean = false

rolArr:any[]=[];
  // rolArr: any[] = [
  //   {
  //     id: "1", descripcion: "Agente"
  //   },
  //   {
  //     id: "2", descripcion: "Supervisor"
  //   },
  //   {
  //     id: "3", descripcion: "Administrador"
  //   }
  // ]
  private routedSub:Subscription; 
  userID:any
  constructor(
    private activateRouter:ActivatedRoute,
    private message: MessageService,
    private router: Router,
    private formBuilder: UntypedFormBuilder,
    private cors: CorsService) {
    this.formNuevoBot = this.formBuilder.group({

      pWd: [null, Validators.required],
      email: [null, Validators.required],
      role: [null, Validators.required],
      userID: [0],
      firstName: [""],
      lastName: [""],
      mobile: [""],
      gender: [""],
      memberSince: [moment().format('YYYY-MM-DDTHH:mm:ss')],
      token: [""],

    });

    this.routedSub = this.activateRouter.params.subscribe((params)=>{
      if (params[ "userID" ] != undefined) {
        this.userID = params[ "userID" ]
        this.buscarUser()
      }else{
        this.showToastError( "No se encontro el usuario.")
        router.navigate(["/usuarios" ])
      }
    })

  }

  ngOnDestroy(): void {
    this.routedSub.unsubscribe()
  }
buscarUser(){
  
  this.cors.get( `Usuarios/ObtenerUsuario/${this.userID }`).then((response) => {
    console.log("aca");

    console.log(response);

     if (response.length > 0) {
      for (const key in this.formNuevoBot.value) {
        if (Object.prototype.hasOwnProperty.call(this.formNuevoBot.value, key)) {
          this.formNuevoBot.controls[key].setValue(response[0][key])
          
        }
       }
     }

  }).catch((error) => {
    console.log(error);
    this.guardando = false
    this.showToastError('No se encontro el usuario.');
    this.router.navigate(["/usuarios"])
  })
}

  guardarUser() {
    this.guardando = true
    this.formNuevoBot.markAllAsTouched()
    if (this.formNuevoBot.valid) {
      this.cors.put(  `Usuarios/ActualizaUsuarios/${this.userID }`, this.formNuevoBot.value).then((response) => {
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
    this.BuscarRoles()

  }
  showToastSuccess(mensaje: any) {
    this.message.add({ key: 'tst', severity: 'success', summary: 'Correcto!!', detail: mensaje, });
  }
  showToastError(mensaje: any) {
    this.message.add({ key: 'tst', severity: 'error', summary: 'Correcto!!', detail: mensaje, });
  }

  BuscarRoles(){
    this.cors.get(`Formularios/ObtenerRoles`).then((response) => {
      // console.log(response)
      this.rolArr=response;
    }).catch((error) => {
      console.log(error);
    })
  }

}
