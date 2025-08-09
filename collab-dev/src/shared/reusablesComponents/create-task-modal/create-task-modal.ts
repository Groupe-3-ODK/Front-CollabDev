import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-create-task-modal',
  imports: [],
  templateUrl: './create-task-modal.html',
  styleUrl: './create-task-modal.css',
})
export class CreateTaskModal {
  @Input() showModal: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveData = new EventEmitter<any>();

  modalData = {
    title: '',
    description: '',
    creationDate: '', // Initialisé en chaîne de caractères pour l'input
    submissionDate: '', // Initialisé en chaîne de caractères
  };

  onClose(): void {
    console.log('Modal fermé');
    this.closeModal.emit();
  }

  onSave(): void {
    console.log('Données enregistrées :', this.modalData);
    this.saveData.emit(this.modalData);
    this.closeModal.emit();
  }
}
