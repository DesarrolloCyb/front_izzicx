import { Component, OnInit } from '@angular/core';
import { Message,MessageService } from 'primeng/api';
import { CorsService } from '@services';
import * as moment from 'moment';
import * as XLSX from 'xlsx';


@Component({
  selector: 'base-datos-ajustes',
  templateUrl: './base-datos-ajustes.component.html',
  styleUrls: ['./base-datos-ajustes.component.scss']
})
export class BaseDatosAjustesComponent implements OnInit {
  usuario: any = JSON.parse(localStorage.getItem("userData") || "{}")
  msgs: Message[] = [];
  ExcelData:any;
  spinner:boolean=false;
  button:boolean=true;
  headers:string[]=[
    'Caso de negocio',
    'Cierre Estimado',
    'Descripción',
    'Estado',
    'Fecha de apertura',
    'Motivo Cliente',
    'Nº de cuenta'
  ];


  constructor(
    private cors: CorsService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
  }

  readExcel(event:any){
    let results:any=[];
    let count:any=0;
    let file = event.target.files[0];
    let ultimo = file.name.split('.');
    if(ultimo[ultimo.length-1] != 'xlsx'){
       this.messageService.add({
        key: 'tst',
        severity: 'error',
        summary: 'La extensión del archivo es incorrecta',
        detail: 'Ingresa un archivo con extensión XLSX!!',
      });
    }else if(ultimo[ultimo.length-1] == 'xlsx'){
      let fileReader = new FileReader();
      var pattern = /[\^*@!"#$%&/()=?¡!¿'\\]/gi;
      fileReader.readAsBinaryString(file);
      fileReader.onload= (e)=>{
        // var workBook = XLSX.read(fileReader.result,{type:'binary',cellDates:true, raw: true })
        var workBook = XLSX.read(fileReader.result,{type:'binary',cellDates:true })
        var sheetNames =  workBook.SheetNames;
        this.ExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]],{defval: ''});
        // console.log(this.ExcelData)
        this.ExcelData = this.ExcelData.map((row:any) => {
          if(row['Descripción']) {
            row['Descripción'] = row['Descripción'].replace(pattern, '');
          }
          return row;
        });
        for(let [key,value] of Object.entries(this.ExcelData[0])){
          // console.log("Esto es cabezera",key)
          for(let i = 0 ; i<this.headers.length;i++){
            if(key == this.headers[i]){
              count++;
            }  
          }
        }

        if(count ==7){
          Object.keys(this.ExcelData).forEach(key => {
            this.ExcelData[key]["Status"]='Pendiente';
            this.ExcelData[key]["Cve_usuario"]=this.usuario.email;
            this.ExcelData[key]["Procesando"]="0";
            this.ExcelData[key]["IP"]="";
            this.ExcelData[key]["Fecha_Carga"]=moment(Date.now()).format('yyyy-MM-DD HH:mm:ss');
            this.ExcelData[key]["Motivo"]=this.ExcelData[key]["Descripción"];
            // let a=moment().format('yyyy-MM-DD hh:mm:ss');
            this.ExcelData[key]["Creado_1"]=this.ExcelData[key]["Fecha de apertura"];
            // let c=moment().format('yyyy-MM-DD hh:mm:ss');
            this.ExcelData[key]["Vencimiento"]=this.ExcelData[key]["Cierre Estimado"];
  
            delete this.ExcelData[key]["Descripción"];
            delete this.ExcelData[key]["Cierre Estimado"];
            delete this.ExcelData[key]["Fecha de apertura"];
            delete this.ExcelData[key][" Resultado en los niveles"];
            delete this.ExcelData[key]["Actualizado por"];
            delete this.ExcelData[key]["Categoría"];
            delete this.ExcelData[key]["Confirmación con el cliente"];
            delete this.ExcelData[key]["Creado por"];
            delete this.ExcelData[key]["Estado de Cuenta"];
            delete this.ExcelData[key]["Falla General Asociada"];
            delete this.ExcelData[key]["Fecha Solicitud Cliente"];
            delete this.ExcelData[key]["Fecha de última actualización"];
            delete this.ExcelData[key]["Fecha de cierre"];
            delete this.ExcelData[key]["Flag Escalamiento"];
            delete this.ExcelData[key]["Flag Próxima a Vencer"];
            delete this.ExcelData[key]["Folio Id Portabilidad"];
            delete this.ExcelData[key]["Fuente"];
            delete this.ExcelData[key]["Hub"];
            delete this.ExcelData[key]["Lista de precios"];
            delete this.ExcelData[key]["Medio de contacto"];
            delete this.ExcelData[key]["Motivo de cancelación"];
            delete this.ExcelData[key]["Motivo de la OS TC SWAT Team"];
            delete this.ExcelData[key]["Motivo del cierre"];
            delete this.ExcelData[key]["Motivos"];
            delete this.ExcelData[key]["NIP de Portabilidad"];
            delete this.ExcelData[key]["Nodo"];
            delete this.ExcelData[key]["Prioridad"];
            delete this.ExcelData[key]["RPT de la cuenta"];
            delete this.ExcelData[key]["RPT del creador"];
            delete this.ExcelData[key]["Ramal"];
            delete this.ExcelData[key]["Recuperacion de Numero Telefonico"];
            delete this.ExcelData[key]["SWAT Automático"];
            delete this.ExcelData[key]["Severidad"];
            delete this.ExcelData[key]["Solución"];
            delete this.ExcelData[key]["Sub-Estado"];
            delete this.ExcelData[key]["Subestado de la cuenta"];
            delete this.ExcelData[key]["Submotivo"];
            delete this.ExcelData[key]["Ticket de remedy asociado"];
            delete this.ExcelData[key]["Tiempo Est."];
            delete this.ExcelData[key]["Tipo de Contribuyente"];
            delete this.ExcelData[key]["Usuario Responsable"];
  
            // delete this.ExcelData[key]["# Contrato"];
            // delete this.ExcelData[key]["% finalizado"];
            // delete this.ExcelData[key]["Actividad"];
            // delete this.ExcelData[key]["Actividad principal"];
            // delete this.ExcelData[key]["Alarma"];
            // delete this.ExcelData[key]["Nº de cliente"];
            // delete this.ExcelData[key]["__EMPTY"];
            // delete this.ExcelData[key]["__EMPTY_1"];
            // delete this.ExcelData[key]["Cargado"];
            // delete this.ExcelData[key]["Completado"];
            // delete this.ExcelData[key]["Alerta"];
            // delete this.ExcelData[key]["Bloquear asignación"];
            // delete this.ExcelData[key]["Bloquear programación"];
            // delete this.ExcelData[key]["Cargo"];
            // delete this.ExcelData[key]["Categoría"];
            // delete this.ExcelData[key]["Contactos"];
            // delete this.ExcelData[key]["Costo asociado"];
            // delete this.ExcelData[key]["Creado"];
            // delete this.ExcelData[key]["Creado por"];
            // delete this.ExcelData[key]["Creado por_1"];
            // delete this.ExcelData[key]["Cuenta IZZI"];
            // delete this.ExcelData[key]["Descripción"];
            // delete this.ExcelData[key]["Duración"];
            // delete this.ExcelData[key]["Duración de la llamada"];
            // delete this.ExcelData[key]["Empleados"];
            // delete this.ExcelData[key]["Facturable"];
            // delete this.ExcelData[key]["Final_1"];
            // delete this.ExcelData[key]["Finalizado"];
            // delete this.ExcelData[key]["Frecuencia"];
            // delete this.ExcelData[key]["Tipo_1"];
            // delete this.ExcelData[key]["Hoja de actividad"];
            // delete this.ExcelData[key]["ID de llamada"];
            // delete this.ExcelData[key]["Indicador de defecto"];
            // delete this.ExcelData[key]["Indicador de defecto_1"];
            // delete this.ExcelData[key]["Informe de llamada_1"];
            // delete this.ExcelData[key]["Inicio"];
            // delete this.ExcelData[key]["Inicio real"];
            // delete this.ExcelData[key]["Lista de precios"];
            // delete this.ExcelData[key]["Lista de tarifas"];
            // delete this.ExcelData[key]["Lugar de reunión"];
            // delete this.ExcelData[key]["Motivo de cierre"];
            // delete this.ExcelData[key]["No antes de"];
            // delete this.ExcelData[key]["Nombre"];
            // delete this.ExcelData[key]["Nuevo"];
            // delete this.ExcelData[key]["Nuevo_1"];
            // delete this.ExcelData[key]["Nº de IG"];
            // delete this.ExcelData[key]["Nº de actividad"];
            // delete this.ExcelData[key]["Nº de actividad_1"];
            // delete this.ExcelData[key]["Nº de activo"];
            // delete this.ExcelData[key]["Nº de cuenta/Nº de póliza"];
            // delete this.ExcelData[key]["Nº de hoja de actividad"];
            // delete this.ExcelData[key]["Nº de serie"];
            // delete this.ExcelData[key]["Nº de solicitud de cambio"];
            // delete this.ExcelData[key]["Objetivo_1"];
            // delete this.ExcelData[key]["Oportunidad"];
            // delete this.ExcelData[key]["Prioridad"];
            // delete this.ExcelData[key]["Privado"];
            // delete this.ExcelData[key]["Propietario"];
            // delete this.ExcelData[key]["Proyecto"];
            // delete this.ExcelData[key]["Región de servicio"];
            // delete this.ExcelData[key]["Repetición"];
            // delete this.ExcelData[key]["Repetir hasta"];
            // delete this.ExcelData[key]["Suprimir calendario"];
            // delete this.ExcelData[key]["Vencimiento_1"];
            // delete this.ExcelData[key]["Archivos adjuntos"];
            // delete this.ExcelData[key]["Caja"];
            // delete this.ExcelData[key]["Apellidos del sospechoso"];
            // delete this.ExcelData[key]["Autorización"];
            // delete this.ExcelData[key]["CN Creado Por"];
            // delete this.ExcelData[key]["CUSIP de seguridad"];
            // delete this.ExcelData[key]["Ciudad que atiende"];
            // delete this.ExcelData[key]["Descripción error remedy"];
            // delete this.ExcelData[key]["Documento a Revision"];
            // delete this.ExcelData[key]["Empleado que soluciona remedy"];
            // delete this.ExcelData[key]["Escalamiento - Detalle del error"];
            // delete this.ExcelData[key]["Escalamiento - Estado"];
            // delete this.ExcelData[key]["Estado de envío remedy"];
            // delete this.ExcelData[key]["Estado de la asignación"];
            // delete this.ExcelData[key]["Fecha creacion ticket remedy"];
            // delete this.ExcelData[key]["Fecha de cierre CN"];
            // delete this.ExcelData[key]["Fecha de solución remedy"];
            // delete this.ExcelData[key]["Fecha de última actualización"];
            // delete this.ExcelData[key]["Final"];
            // delete this.ExcelData[key]["Gastos"];
            // delete this.ExcelData[key]["Grupo"];
            // delete this.ExcelData[key]["Grupo de productos"];
            // delete this.ExcelData[key]["ID de actividad principal"];
            // delete this.ExcelData[key]["ID de miembro"];
            // delete this.ExcelData[key]["Incidente"];
            // delete this.ExcelData[key]["Incluir en informe de estado"];
            // delete this.ExcelData[key]["Informe de llamada"];
            // delete this.ExcelData[key]["Marca"];
            // delete this.ExcelData[key]["Mostrar en"];
            // delete this.ExcelData[key]["Motivo de cancelación"];
            // delete this.ExcelData[key]["Motivo de cancelación CN"];
            // delete this.ExcelData[key]["Motivo solución remedy"];
            // delete this.ExcelData[key]["No. ticket remedy"];
            // delete this.ExcelData[key]["Nombre Usuario CN"];
            // delete this.ExcelData[key]["Nombre del sospechoso"];
            // delete this.ExcelData[key]["N° de reintentos remedy"];
            // delete this.ExcelData[key]["Nº acc correc"];
            // delete this.ExcelData[key]["Nº de siniestro/reclamación"];
            // delete this.ExcelData[key]["Nº incd prod"];
            // delete this.ExcelData[key]["Objetivo"];
            // delete this.ExcelData[key]["Oferta económica"];
            // delete this.ExcelData[key]["Oportunidad Potencial"];
            // delete this.ExcelData[key]["Orden de Servicio"];
            // delete this.ExcelData[key]["Propiedad"];
            // delete this.ExcelData[key]["Propietario global"];
            // delete this.ExcelData[key]["Prueba"];
            // delete this.ExcelData[key]["Público"];
            // delete this.ExcelData[key]["RPT del cliente"];
            // delete this.ExcelData[key]["Requerido"];
            // delete this.ExcelData[key]["Resolución remedy"];
            // delete this.ExcelData[key]["Rutina"];
            // delete this.ExcelData[key]["Segundo Técnico"];
            // delete this.ExcelData[key]["Sospechoso"];
            // delete this.ExcelData[key]["Sub estatus"];
            // delete this.ExcelData[key]["Sucursal de Origen"];
            // delete this.ExcelData[key]["Símbolo del título"];
            // delete this.ExcelData[key]["Tipo"];
            // delete this.ExcelData[key]["Unidades de duración"];
            // delete this.ExcelData[key]["Vencimiento (CEM)"];
            // delete this.ExcelData[key]["Área de conocimiento"];
          });          
          this.messageService.add({
            key: 'tst',
            severity: 'success',
            summary: 'Exito!!!',
            detail: 'El archivo se a cargado completamente!!!',
          });
          this.button=false;
   
        }else{
          this.messageService.add({
            key: 'tst',
            severity: 'error',
            summary: 'Error',
            detail: 'El formato del archivo es incorrecto!!!',
          });
        }

  
      }
    }

  }

  saveExcel() {
    this.button=true;
    let filteredArray = this.ExcelData.filter((obj:any) => obj['Nº de cuenta']    !== "" && obj['Nº de cuenta'] !== undefined );
    this.cors.post('AjustesCambiosServicios/InsertarBaseDatosAjustesExcel',filteredArray).then((response) => {
      this.messageService.add({
        key: 'tst',
        severity: 'success',
        summary: 'Excel Exportado',
        detail: 'Correctamente!!',
      }); 
    }).catch((error) => {
      console.log(error)
      this.messageService.add({
        key: 'tst',
        severity: 'error',
        summary: 'Ocurrio un Erro intentalo nuevamente',
        detail: 'Intenta nuevamente!!!',
      });
    })
    
    

  }


}
