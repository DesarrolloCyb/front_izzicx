import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CorsService } from '@services';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'robots-editar',
  templateUrl: './robots-editar.component.html',
  styleUrls: ['./robots-editar.component.scss']
})
export class RobotsEditarComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  formNuevoBot: UntypedFormGroup;
  processArr: any[] = []
  guardando: boolean = false
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: MessageService,
    private confirmationService: ConfirmationService,
    private formBuilder: UntypedFormBuilder,
    private cors: CorsService) {
    this.formNuevoBot = this.formBuilder.group({
      ipEquipo: [null, [Validators.required, Validators.pattern('(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)')]],
      procesoId: [null, Validators.required],
      comentarios: [null, Validators.required],
      hostName: [null, Validators.required],
      usuarioBot: [null, Validators.required],
      passwordBot: [null, Validators.required],
      id: [null, Validators.required],
    });
    this.getCats()
    this.routeSub = this.route.params.subscribe((params: any) => {
      // console.log(params);

      if (params['idRobot'] != undefined) {
        this.cors
          .get(`Bots/getBot`,{
            "id": params['idRobot']
          })
          .then((response: any) => {
            console.log(response);
            if (response.length > 0) {
              this.cors.get(`Bots/getCatalogoEdit`,{
                "id": response[0].id
              })
              .then((response1: any) => {
                console.log(response1);
                this.formNuevoBot.patchValue({
                  ipEquipo: response[0].ipEquipo,
                  procesoId: response1[0].name_process,
                  comentarios: response[0].comentarios,
                  hostName: response[0].hostName ,
                  usuarioBot: response[0].usuarioBot,
                  passwordBot: response[0].passwordBot,
                  id: response[0].id,
            
                });
  
              })
              .catch((error: any) => {
                console.log(error);
                // this.showToastError('No se encontraron datos de Robot')
              });
              this.formNuevoBot.patchValue({
                ipEquipo: response[0].ipEquipo,
                procesoId: response[0].procesoID,
                comentarios: response[0].comentarios,
                hostName: response[0].hostName ,
                usuarioBot: response[0].usuarioBot,
                passwordBot: response[0].passwordBot,
                id: response[0].id,
          
              });

            }
          })
          .catch((error: any) => {
            console.log(error);

            this.showToastError('No se encontraron datos de Robot')
          });
      }
    });
  }

  guardarBot() {
    this.guardando = true
    this.formNuevoBot.markAllAsTouched()
    if (this.formNuevoBot.valid) {
      this.cors.put(`Bots/${this.formNuevoBot.value.id}`, this.formNuevoBot.value).then((response) => {
        console.log("aca");

        console.log(response);
        this.showToastSuccess('Datos Guardados')
        setTimeout(() => {
          this.router.navigate(["/robots"])
        }, 3000);

      }).catch((error) => {
        console.log(error);
        this.guardando = false
        this.showToastError('No se lograron guardadar los datos de Robot')
      })
    }
  }
  getCats() {
    this.cors.get('Bots/getCatProcesos').then((response) => {
      // console.log(response);
      this.processArr = response
    }).catch((error) => {

    })
  }
  ngOnInit(): void {
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
  showToastSuccess(mensaje: any) {
    this.service.add({ key: 'tst', severity: 'success', summary: 'Correcto!!', detail: mensaje, });
  }
  showToastError(mensaje: any) {
    this.service.add({ key: 'tst', severity: 'error', summary: 'Correcto!!', detail: mensaje, });
  }
}
