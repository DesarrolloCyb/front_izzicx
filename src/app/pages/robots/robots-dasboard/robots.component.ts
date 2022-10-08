import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { CorsService } from '@services';
import { SocketIoService } from 'app/_services/socketio.service';
import { Socket } from 'ngx-socket-io';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'robots',
  templateUrl: './robots.component.html',
  styleUrls: ['./robots.component.scss'],
  providers: [ConfirmationService]
})
export class RobotsComponent implements OnInit {
  loading: boolean = false
  dataSource: any[] = []
  processArr: any[] = []
  @ViewChild('filter') filter!: ElementRef





  commadArr: any[] = [

    {
      id: "RUN",
      desc: "Encender Robot"
    }
    ,
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
    },
    {
      id: "KILL",
      desc: "Apagar Robot"
    }, {
      id: "PING",
      desc: "Ping"
    },
  ]

  constructor(
    private confirmationService: ConfirmationService,
    private socket: Socket,
    private cors: CorsService,
    private socketIo: SocketIoService
  ) {

    this.cors.get('Bots/ObtenerListProcess').then((response) => {
      this.processArr = response
    }).catch((error) => {

    })

  }

  ngOnInit() {

    this.buscaBots()
  }
  preguntarEnviar(command: any,ipMaquina:any) {
    console.log(ipMaquina);

    this.confirmationService.confirm({
      key: 'confirm1',
      message: 'Esta seguro que desea enviar el comando?',
      accept: () => {
        this.cors.getCommand(`http://${ipMaquina}:9000?command=${command}`)
      },
      reject: () => {
          //reject action
      }
    })

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
    this.cors.get('Bots/ObtenerDataBots').then((response) => {

      console.log(response);
      this.dataSource = response
      this.adddListeners()

    }).catch((error) => {
      console.log(error);

    })
  }


  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  getProcessText(process: any) {

    let proccesFind = this.processArr.find(item => item.id == process)

    return proccesFind?.name_process || "Sin proceso asignado"
  }
}
