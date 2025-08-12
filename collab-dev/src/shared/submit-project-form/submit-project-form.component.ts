import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-submit-project-form',
  imports: [CommonModule, 
    ReactiveFormsModule],
  templateUrl: './submit-project-form.component.html',
  styleUrl: './submit-project-form.component.css'
})
export class SubmitProjectFormComponent {
  projectForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      projectName: [''],
      gitHubLink: [''],
    });
  }

  onSubmit() {
    console.log(this.projectForm.value);
    alert('Projet soumis avec succès!');
  }
}
