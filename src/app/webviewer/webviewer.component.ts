import {
  Component,
  ViewChild,
  OnInit,
  ElementRef,
  AfterViewInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { IFile } from '../dto/IFile';

declare const WebViewer: any;

@Component({
  selector: 'web-viewer',
  templateUrl: './webviewer.component.html',
  styleUrls: ['./webviewer.component.css'],
})
export class WebViewerComponent implements OnInit, AfterViewInit, OnChanges {
  // Syntax if using Angular 8+
  // true or false depending on code
  @ViewChild('viewer', { static: false }) viewer: ElementRef;
  @Input() inpFile: IFile;
  path: string = '';
  extension: string = '';

  wvInstance: any;

  ngOnInit() {
    this.wvDocumentLoadedHandler = this.wvDocumentLoadedHandler.bind(this);
  }

  wvDocumentLoadedHandler(): void {
    // you can access docViewer object for low-level APIs
    const docViewer = this.wvInstance;
    docViewer.setFitMode('FitWidth');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['inpFile']) {
      if (this.inpFile) {
        this.path = this.inpFile.path;
        this.extension = this.inpFile.extension;
        if (this.wvInstance) {
          if (this.extension === 'PDF') {
          }
          this.wvInstance.loadDocument(this.path, {
            extension: this.extension,
          });
        }
      }
    }
  }

  ngAfterViewInit(): void {
    WebViewer(
      {
        path: '../../wv-resources/lib',
      },
      this.viewer.nativeElement
    ).then((instance) => {
      this.wvInstance = instance;

      // or listen to events from the viewer element
      this.viewer.nativeElement.addEventListener('pageChanged', (e) => {
        const [pageNumber] = e.detail;
        console.log(`Current page is ${pageNumber}`);
      });

      instance.docViewer.on('documentLoaded', this.wvDocumentLoadedHandler);
      instance.loadDocument(this.path, { extension: this.extension });
    });
  }
}
