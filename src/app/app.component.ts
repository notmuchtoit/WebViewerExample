import { Component, ViewChild, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { IFile } from './dto/IFile';
import { SelectableSettings, RowArgs, SelectionEvent } from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('viewer', {static: false}) viewer: ElementRef;
  path:string = '';
  extension: string = ''
  selectedFile$: Observable<IFile> = {}as Observable<IFile>;
  selectedFile: IFile;
  title = 'my-first-angular-project';
  files:IFile[] = [{
    fileName: 'Book1',
    extension: 'XLSX',
    path: '/../assets/Book1.xlsx'
  },
  {
    fileName: 'Test Doc',
    extension: 'DOCX',
    path: '/../assets/Test Doc.docx'
  },
  {
    fileName: 'webviewer',
    extension: 'PDF',
    path: '/../assets/Resume.pdf'
  }];

  public isRowSelected = (e: RowArgs) => this.selectedFile ? this.selectedFile.fileName  === e.dataItem.fileName : false;


  public selectableSettings: SelectableSettings;

  constructor() {
      this.setSelectableSettings();
  }

  public setSelectableSettings(): void {
   
      this.selectableSettings = {
          checkboxOnly: false,
          mode: 'single'
      };
  }

  onSelectionChange(e: SelectionEvent){
    this.selectedFile = e.selectedRows[0].dataItem;
    
  }

  ngAfterViewInit(){
    this.path = this.files[0].path;
    this.extension = this.files[0].extension;
  }

  ngOnInit(){

  }
}
