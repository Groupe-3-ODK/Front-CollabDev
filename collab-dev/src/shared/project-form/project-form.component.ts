import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {
  CreateProject,
  ProjectService,
} from '../../core/services/project.service';
@Component({
  selector: 'app-project-form',
  imports: [CommonModule, ReactiveFormsModule],
  providers: [CookieService],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.css',
})
export class ProjectFormComponent {
  projectForm: FormGroup;

  public fromData: CreateProject = new CreateProject();
  private cookieService = inject(CookieService);

  public currentUser: any = null;

  ngOnInit(): void {
    const cookieValue = this.cookieService.get('currentUser');
    console.log('Valeur brute du cookie:', cookieValue);
    console.log('Contenu du cookie currentUser:', cookieValue);
    this.currentUser = cookieValue ? JSON.parse(cookieValue) : null;
    console.log('Objet currentUser:', this.currentUser);

    console.warn(this.cookieService);
  }

  constructor(
    private fb: FormBuilder,
    private _projectService: ProjectService,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      projectName: [''],
      domain: [''],
      description: [''],
      documentation: [null],
    });
  }

  onSubmit() {
    if (this.projectForm.valid) {
      this.fromData.title = this.projectForm.value.projectName;
      this.fromData.description = this.projectForm.value.description;
      this.fromData.domain = this.projectForm.value.domain;
      this.fromData.author = { id: this.currentUser.id };

      // console.warn(this.fromData.author);
      this._projectService.createProject(this.fromData).subscribe({
        next: (response) => {
          console.log('Connexion projet creer:', response);
        },
        complete: () => {
          // Rediriger vers la page d'accueil ou une autre page après la connexion réussie
          //
          this.router.navigate(['user/dashboard']);
        },
        error: (error) => {
          console.error('Erreur lors de la creation:', error);
          alert('Échec de la creation.');
        },
      });
    } else {
      alert('Tous les champs doivent etre renseigner');
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (file.size <= 10 * 1024 * 1024) {
        // 10MB in bytes
        this.projectForm.get('documentation')?.setValue(file);
      } else {
        alert('Le fichier dépasse la taille maximale de 10MB.');
      }
    }
  }
}
