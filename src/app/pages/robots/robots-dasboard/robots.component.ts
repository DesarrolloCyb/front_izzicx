import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { CorsService } from '@services';
import { SocketIoService } from 'app/_services/socketio.service';
import { Socket } from 'ngx-socket-io';
import { ConfirmationService, Message, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'robots',
  templateUrl: './robots.component.html',
  styleUrls: ['./robots.component.scss'],
  

})
export class RobotsComponent implements OnInit {
  loading: boolean = false
  dataSource: any[] = []
  processArr: any[] = []
  @ViewChild('filter') filter!: ElementRef




  commadArr: any[] = [


    {
      id: "STARTED",
      desc: "Iniciar Proceso"
    },
    {
      id: "STOPED",
      desc: "Detener Proceso"
    }
    ,
    {
      id: "REBOOT",
      desc: "Reiniciar PC"
    }
  ]

  comando: any = null;

  opcionToAction: any = {
    hostName: null,
    ipEquipo: null
  };
  opcionIndex: any = null;
  loadingLog: boolean = false
  logContent: any[] = []
  usuarioInfo = JSON.parse(localStorage.getItem("userData") || "{}")

  items: any[] = [


  ];
  displayLogDialog: boolean = false
  statsBots:any=[];
  loading1: boolean = false

  constructor(
    private router: Router,
    private service: MessageService,
    private confirmationService: ConfirmationService,
    private socket: Socket,
    private cors: CorsService,
    private socketIo: SocketIoService
  ) {

    this.cors.get('Bots/getCatProcesos').then((response) => {
      if(response[0] == 'SIN INFO'){
        this.processArr = [];
      }else{
        for(var b=0;b<response.length;b++){
          if(response[b].status == "1"){
            let bb = {
              id:response[b].id,
              name_process:response[b].name_process
            }
            this.processArr.push(bb)
          }
        }
      }
    }).catch((error) => {
      console.log(error);
      this.showToastError(`No se logro traer la lista de procesos`)
    })

    this.items = [{
      label: 'Actualizar', icon: 'pi pi-refresh', command: () => {

        this.router.navigate([`/robots/editar/${this.opcionToAction.botId}`])

      }
    },

    {
      label: 'ver Log', icon: 'pi pi-history', command: () => {


        this.preguntarLog()
      }
    }, {
      label: ' ', icon: ' '
    },
    {
      label: 'Eliminar', icon: 'pi pi-times', command: () => {


        this.preguntarEliminar()
      }
    },]
  }

  preguntarEliminar() {
    this.confirmationService.confirm({
      key: 'deleteBot',
      message: `Esta seguro que desea eliminar el Robot <strong>${this.opcionToAction.hostName}</strong>(${this.opcionToAction.ipEquipo}) ?`,
      accept: () => {
        this.deleteMAquina()


      }
    })
  }

  preguntarLog() {
    console.log("consulta log");
    this.logContent = []
    this.loadingLog = true

    this.displayLogDialog = true

    this.cors.getCommand(`http://${this.opcionToAction.ipEquipo}:9000/getLog`).then((response) => {
      console.log(response);

      this.loadingLog = false
      this.logContent = response.data


    }).catch((error) => {
      console.log(error);
      this.loadingLog = false
      this.showToastError(`No se logro traer el log de la maquina ${this.opcionToAction.ipEquipo}`)


    })
  }
  getDays(fecha:string){
    
    
    let dif = moment().diff(moment(fecha),'days')
    if (isNaN(dif)) {
      return ''
    }else{
      let di = 60;
      let result = di-dif
      
      return result
    }
  }
  selection(item: any, index: any) {

    this.opcionToAction = item;
    this.opcionIndex = index;
  }

  ngOnInit() {

    this.buscaBots();
    // this.getDataStatsBots();
    // this.refreshStatsBots();
  }


  deleteMAquina() {
    this.cors.delete(`Bots/EliminarDataBots/${this.opcionToAction.id}`, this.opcionToAction).then((response) => {
      console.log(response);
      this.dataSource.splice(this.opcionIndex, 1)
      this.showToastSuccess(`Se elimino el robot ${this.opcionToAction.hostName} correctamente.`)
    }).catch((error) => {
      console.log(error);
      this.showToastError(`No se logro eliminar el robot ${this.opcionToAction.hostName}`)

    })
  }
  preguntarCambiarProceso(process: any, item: any) {

    // TODO ERik: servicio para actualizar recibes el idRegistro y el IDproceso

    console.log(item)
    console.log(process)
    this.confirmationService.confirm({
      key: 'changeProcess',
      message: 'Esta seguro que desea cambiar el proceso?',
      accept: () => {
        this.sendProcess(item, process)
      }
    })


  }
  preguntarEnviar(command: any, item: any) {
    console.log(item);


    this.confirmationService.confirm({
      key: 'senCommand',
      message: 'Esta seguro que desea enviar el comando?',
      accept: () => {
        this.comando = null
        this.sendCommand(item, command)
      },
      reject: () => {
        this.comando = null
      }
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
  sendCommand(item: any, command: any) {
    item.sendingComand = true
    console.log(this.processArr);
    
    let proceso = this.processArr.find(itemProcess => itemProcess.id == item.procesoId)
    console.log(proceso);

    

    this.cors.getCommand(`http://${item.ipEquipo}:9000?id=${item.procesoId}&name=${proceso?.name_process || ''}&command=${command}&userId=${this.usuarioInfo.userID}&userName=${this.usuarioInfo.firstName || ''} ${this.usuarioInfo.lastName || ''} - ${this.usuarioInfo.email || ''}`).then((response) => {
      console.log(response);


      this.showToastSuccess(`Se envio el comando al Robot ${item.ipEquipo}`)
      item.sendingComand = false
    }).catch((error) => {
      console.log(error);
      item.sendingComand = false
      this.showToastError(`No se logro enviar el comando al Robot ${item.ipEquipo}`)

    })
  }

  sendProcess(item: any, idProceso: any) {
    item.sendingProcess = true

    let proceso = this.processArr.find(item => item.id == idProceso)
    console.log(proceso.name_process);

    this.cors.put(`Bots/ActualizarBotProcess?id=${item.botId}` , 
    {
      "id": item.botId,
      "comentarios": null,
      "hostName": null,
      "ip": null,
      "fechaActualizacion": null,
      "created_at": null,
      "procesoBotId": idProceso,
      "procesoBot": {
        "id": idProceso,
        "name_process": null,
        "usuario": null,
        "password": null,
        "update_At": null,
        "status": null
      }
    }
    ).then((response) => {
      item.sendingProcess = false
      this.buscaBots()

      this.showToastSuccess(`Se guardo el cambio de proceso del Robot ${item.botIp}`)
    }).catch((error) => {
      console.log(error);
      item.sendingProcess = false
      this.showToastError(`No se logro guardar el proceso del Robot ${item.botIp}`)

    })

    // this.cors.getCommand(`http://${item.ipEquipo}:9000/process?id=${idProceso}&name=${proceso?.name_process || ''}&userId=${this.usuarioInfo.userID}&userName=${this.usuarioInfo.firstName || ''} ${this.usuarioInfo.lastName || ''} - ${this.usuarioInfo.email || ''}`).then((response) => {
    //   this.service.add({ key: 'tst', severity: 'success', summary: 'Correcto!!!', detail: `Se envio el cambio de proceso del Robot ${item.ipEquipo}` });
    //   item.sendingProcess = false


    // }).catch((error) => {
    //   console.log(error);
    //   item.sendingProcess = false
    //   this.showToastError(`No se logro enviar el proceso del Robot ${item.ipEquipo}`)

    // })

  }

  adddListeners() {

    this.socket.on('botConected', (bot: any) => {


      let index = this.dataSource.findIndex(item => item.ipEquipo == bot.host.replace("::ffff:", ""))

      if (index > -1) {
        this.dataSource[index].estatus = 1
      }

    })

    this.socket.on('processStopedNotification', (botStopped: any) => {
      console.log('processStopedNotification');
      console.error(JSON.parse(botStopped.data));


      let index = this.dataSource.findIndex(item => item.ipEquipo == botStopped.host.replace("::ffff:", ""))

      if (index > -1) {
        this.dataSource[index].estatus = 2
      }

    })

    this.socket.on('disconectionBot', (botDisconected: any) => {
      console.log('disconectionBot');

      let index = this.dataSource.findIndex(item => item.ipEquipo == botDisconected.host.replace("::ffff:", ""))

      if (index > -1) {
        this.dataSource[index].estatus = 4
      }

    })
    this.socket.on('processErrorNotification', (botError: any) => {
      console.log('processErrorNotification');
      console.error(JSON.parse(botError.data));


      let index = this.dataSource.findIndex(item => item.ipEquipo == botError.host.replace("::ffff:", ""))

      if (index > -1) {
        this.dataSource[index].estatus = 3
      }

    })

  }
  buscaBots() {
    this.cors.get('Bots/getBots').then((response) => {

      // console.log(response);
      if(response[0] == 'SIN INFO'){
        this.dataSource = []

      }else{
        this.dataSource = response

      }
      this.adddListeners()

    }).catch((error) => {
      console.log(error);
      this.showToastError(`No se logro traer el listado de Robots`)
    })
  }

  // getDataStatsBots(){
  //   // console.log("stats bots")
  //   this.cors.get('Reports/getStatsBots').then((response) => {

  //     // console.log(response);
  //     this.statsBots = response;

  //   }).catch((error) => {
  //     console.log(error);
  //     this.showToastError(`No se logro traer las estaditiscas de los Robots`)
  //   })

  // }

  // refreshStatsBots(){
  //   setInterval(()=> {
  //     this.getDataStatsBots()
  //   }, 10000);
  // }

  statsValidation(item:any){
    if(JSON.stringify(item) !== '{}'){
      return item
    }else{
      return 0
    }
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

  getProcessText(process: any) {

    let proccesFind = this.processArr.find(item => item.id == process)

    return proccesFind?.name_process || "Sin proceso asignado"
  }
}
