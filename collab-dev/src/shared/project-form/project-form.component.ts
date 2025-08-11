import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-project-form',
  imports: [ CommonModule, 
    ReactiveFormsModule],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css'
})
export class ProjectFormComponent {
    projectForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      projectName: [''],
      domain: [''],
      documentation: [null]
    });
  }

  onSubmit() {
    console.log(this.projectForm.value);
    alert('Projet soumit avec succes!');
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
