import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-upload-file',
  standalone: true,
  imports: [
    CommonModule,
    FileUploadModule,
    ButtonModule,
    ProgressBarModule,
    BadgeModule
  ],
  templateUrl: './upload-file.component.html',
})
export class UploadFileComponent {
  @Output() fileSelected = new EventEmitter<File>();

  totalSize = 0;
  totalSizePercent = 0;

  onSelectedFiles(event: any) {
    const file = event.files?.[0];
    if (file) {
      this.fileSelected.emit(file);
      this.totalSize = file.size;
      this.totalSizePercent = Math.round((file.size / 1000000) * 100);
    }
  }

  formatSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  onTemplatedUpload() {
    console.log('Upload déclenché');
  }

  uploadEvent(callback: any) {
    callback();
  }

  choose(event: Event, callback: any) {
    event.preventDefault();
    callback();
  }

  onRemoveTemplatingFile(event: Event, file: File, callback: any, index: number) {
    event.preventDefault();
    callback(index);
    this.totalSize = 0;
    this.totalSizePercent = 0;
  }

  
}
