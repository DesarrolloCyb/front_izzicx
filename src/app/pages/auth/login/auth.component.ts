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
    constructor(private cors: CorsService, private formBuilder: UntypedFormBuilder, private router: Router) {
        this.formLogin = this.formBuilder.group({
            email: [environment.user, Validators.required],
            pWd: [environment.password, Validators.required],
            remember: [null],
        });
    }

    onSignIn() {
        this.formLogin.markAllAsTouched();
        console.log(this.formLogin.valid);

        if (this.formLogin.valid) {
          
            this.cors.post('AD/Identity', this.formLogin.value).then((response) => {
                console.log(response);

                //this.router.navigate(['/home']);

                localStorage.setItem( "userData",JSON.stringify(response)  )
                this.router.navigate(['/home']);
            }).catch((error) => {
                console.log(error);
                // this.msgs.push({
                //     severity: 'error',
                //     summary: 'No se logro autenticar',
                //     detail: 'Intenta nuevamente!',
                // });


            })
        }
    }
}

