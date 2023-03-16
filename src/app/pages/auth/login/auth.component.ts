import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
    UntypedFormBuilder,
    UntypedFormControl,
    UntypedFormGroup,
    Validators,
} from '@angular/forms';
import { environment } from 'environments/environment';
import { CorsService } from '@services';
import { Message, MessageService } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './auth.component.html',
})
export class AuthComponent {
    rememberMe: boolean = false;
    msgs: Message[] = [];
    formLogin: UntypedFormGroup;
    constructor(private messageService: MessageService,private cors: CorsService, private formBuilder: UntypedFormBuilder, private router: Router) {
        this.formLogin = this.formBuilder.group({
            // email: [environment.user, Validators.required],
            // pWd: [environment.password, Validators.required],
            email: [null, Validators.required],
            pWd: [null, Validators.required],
            remember: [null],
        });
    }

    onSignIn() {
        this.formLogin.markAllAsTouched();
        if(this.formLogin.valid){
            if((this.formLogin.value.email =='admin' && this.formLogin.value.pWd =='admin') || (this.formLogin.value.email =='usuario1' && this.formLogin.value.pWd =='123') ){
                if(this.formLogin.value.email =='admin'){
                    let a={
                        "role":"admin",
                        "firstName":"admin",
                        "lastName":"admin",
                        "email":"admin@test.com"
                    }
                    localStorage.setItem( "userData",JSON.stringify(a))   
                }else if(this.formLogin.value.email =='usuario1'){
                    let a={
                        "role":"Reporte",
                        "firstName":"Persona1",
                        "lastName":"Persona1",
                        "email":"usuario1@test.com"
                    }
                    localStorage.setItem( "userData",JSON.stringify(a))   
                }
    
                this.router.navigate(['/home']);
    
            }else{
                this.messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Usuario o contraseña Invalidos',
                    detail: 'Intentalo Nuevamente!!',
                  });
            }
    
        }
        // if (this.formLogin.valid) {
          
        //     this.cors.post('AD/Identity', this.formLogin.value).then((response) => {
        //         console.log(response);

        //         //this.router.navigate(['/home']);

        //         localStorage.setItem( "userData",JSON.stringify(response)  )
        //         this.router.navigate(['/home']);
        //     }).catch((error) => {
        //         console.log(error);
        //         // this.msgs.push({
        //         //     severity: 'error',
        //         //     summary: 'No se logro autenticar',
        //         //     detail: 'Intenta nuevamente!',
        //         // });


        //     })
        // }
    }
}

