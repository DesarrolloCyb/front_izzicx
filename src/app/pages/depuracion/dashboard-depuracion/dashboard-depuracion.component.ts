import { Component, OnInit } from '@angular/core';
import { CorsService } from '@services';

@Component({
  selector: 'dashboard-depuracion',
  templateUrl: './dashboard-depuracion.component.html',
  styleUrls: ['./dashboard-depuracion.component.scss']
})
export class DashboardDepuracionComponent implements OnInit {
	detalle=[
		"Caso de Negocio",
		"Ordenes de Servicio"
	  ];
	  uploadedFiles: any[] = [];

  constructor(private cors: CorsService) {
	
   }

  ngOnInit(): void {
  }

  uploadfun(event:any) {
	for(let file of event.files) {
		this.uploadedFiles.push(file);
	}
	console.log(this.uploadedFiles)

	// this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
}

}
