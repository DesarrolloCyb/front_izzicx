import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { CorsService } from '@services';
import { SocketIoService } from 'app/_services/socketio.service';
import { Socket } from 'ngx-socket-io';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  loading: boolean = false
  dataSource: any[] = []

  @ViewChild('filter') filter!: ElementRef

  usuarioInfo = JSON.parse(localStorage.getItem("userData") || "{}")

  items: any[] = [


  ];
  displayLogDialog: boolean = false
  constructor(
    private router: Router,
    private service: MessageService,
    private confirmationService: ConfirmationService,
    private cors: CorsService,
  ) {

    
  }

  preguntarEliminar(item:any) {
    this.confirmationService.confirm({
      key: 'deleteBot',
      message: `Esta seguro que desea eliminar el Usuario <strong>${item.email}</strong> ?`,
      accept: () => {
        this.deleteUsuario(item)


      }
    })
  }




  ngOnInit() {

    this.buscaBots()
  }


  deleteUsuario(item:any) {
    this.cors.delete(`Usuarios/EliminaUsuarios/${item.userID}`).then((response) => {
      console.log(response);
      this.buscaBots()
      this.showToastSuccess(`Se elimino el Usuario ${item.email} correctamente.`)
    }).catch((error) => {
      console.log(error);
      this.showToastError(`No se logro eliminar el usuario ${item.email}`)

    })
  }

  

  /*
  {
      "userID": 213,
      "firstName": "GARCIA CUEVAS ERIK FELIPE",
      "lastName": null,
      "email": "saas123123",
      "mobile": null,
      "gender": null,
      "role": "User",
      "pWd": "",
      "memberSince": "2022-10-25T10:33:25.0487022-05:00",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI
  192.168.0.5:9000/process?id=1&name=cancelacion&userId=2&userName=ederSAntos
  192.168.0.5:9000?command=STOPED&userId=2&userName=ederSAntos
  }*/



  buscaBots() {
    this.cors.get('Usuarios/ObtenerUsuarios').then((response) => {

      console.log(response);
      this.dataSource = response


    }).catch((error) => {
      console.log(error);
      this.showToastError(`No se logro traer el listado de Robots`)
    })
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }


  showToastSuccess(mensaje: any) {
    this.service.add({ key: 'tst', severity: 'success', summary: 'Correcto!!', detail: mensaje, });
  }
  showToastError(mensaje: any) {
    this.service.add({ key: 'tst', severity: 'error', summary: 'Correcto!!', detail: mensaje, });
  }


}
