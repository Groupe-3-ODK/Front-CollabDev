import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-form',
   standalone: true, 
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './admin-form.component.html',
  styleUrl: './admin-form.component.css',
})
export class AdminFormComponent {
  projectForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      managerName: [''],
      gitHubLink: [''],
      documentation: [null]
    });
  }

  onSubmit() {
    console.log(this.projectForm.value);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (file.size <= 10 * 1024 * 1024) { // 10MB in bytes
        this.projectForm.get('documentation')?.setValue(file);
      } else {
        alert('Le fichier dépasse la taille maximale de 10MB.');
      }
    }
  }
}
