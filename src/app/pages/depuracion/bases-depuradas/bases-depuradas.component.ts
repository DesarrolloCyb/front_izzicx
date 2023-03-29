import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bases-depuradas',
  templateUrl: './bases-depuradas.component.html',
  styleUrls: ['./bases-depuradas.component.scss']
})
export class BasesDepuradasComponent implements OnInit {
  detalle=[
		"Caso de Negocio",
		"Ordenes de Servicio"
	  ];
	  uploadedFiles: any[] = [];

  constructor() { }

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
