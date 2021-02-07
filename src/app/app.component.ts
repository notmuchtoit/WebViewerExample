import { Component } from '@angular/core';
import { IFile } from './dto/IFile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-first-angular-project';
  files:IFile[] = [{
    fileName: 'Book1',
    extension: '.xlsx',
    path: '../assets/Book1.xlsx'
  }]
}
