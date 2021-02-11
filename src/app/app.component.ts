import {
  Component,
  ViewChild,
  ElementRef,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { IFile } from './dto/IFile';
import {
  SelectableSettings,
  RowArgs,
  SelectionEvent,
} from '@progress/kendo-angular-grid';
import { Observable } from 'rxjs';
import { ApiService } from './service/ApiService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('viewer', { static: false }) viewer: ElementRef;
  uploadSaveUrl = 'http://localhost:8080/api/upload';
  uploadRemoveUrl = 'http://localhost:3000/remove';
  path = '';
  extension = '';
  selectedFile$: Observable<IFile> = {} as Observable<IFile>;
  selectedFile: IFile;
  files: IFile[];
  title = 'PDFTRON WebViewer Example';
  public selectableSettings: SelectableSettings;

  constructor(private apiService: ApiService) {
    this.setSelectableSettings();
  }
  /*   files: IFile[] = [
    {
      fileName: 'Book1',
      extension: 'XLSX',
      path: '/../assets/Book1.xlsx',
    },
    {
      fileName: 'Test Doc',
      extension: 'DOCX',
      path: '/../assets/Test Doc.docx',
    },
    {
      fileName: 'COLONBXMEDOFFMD',
      extension: 'PDF',
      path: '/../assets/COLONBXMEDOFFMD.pdf',
    },
  ]; */

  public isRowSelected = (e: RowArgs) =>
    this.selectedFile
      ? this.selectedFile.fileName === e.dataItem.fileName
      : false;

  public setSelectableSettings(): void {
    this.selectableSettings = {
      checkboxOnly: false,
      mode: 'single',
    };
  }

  onSelectionChange(e: SelectionEvent): void {
    this.selectedFile = e.selectedRows[0].dataItem;
  }

  getFiles(): void {
    this.apiService.getFiles().subscribe((files) => {
      this.files = files;
    });
  }

  ngOnInit(): void {
    this.getFiles();
  }
}
