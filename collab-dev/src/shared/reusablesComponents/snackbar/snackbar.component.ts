import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-snackbar',
  standalone:true ,
  imports: [ToastModule, ButtonModule],
  templateUrl: './snackbar.component.html',
  styleUrls:[ './snackbar.component.css'],
  providers: [MessageService],
})
export class SnackbarComponent {
  constructor(private messageService: MessageService) {}

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Message sent successfully!',
    });
  }

  showInfo() {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: 'This is an informational message.',
    });
  }

  showWarn() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warning',
      detail: 'This is a warning message.',
    });
  }

  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'An error occurred!',
    });
  }

  showSecondary() {
    this.messageService.add({
      severity: 'secondary',
      summary: 'Secondary',
      detail: 'This is a secondary message.',
    });
  }

  showContrast() {
    this.messageService.add({
      severity: 'contrast',
      summary: 'Contrast',
      detail: 'This is a contrast message.',
    });
  }
}
