import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {
  ManagerInfo,
  ProjectService,
} from '../../../core/services/project.service';

@Component({
  selector: 'app-admin-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  providers: [CookieService],
  templateUrl: './admin-form.component.html',
  styleUrl: './admin-form.component.css',
})
export class AdminFormComponent implements OnInit {
  projectForm: FormGroup;
  private _projectService = inject(ProjectService);
  private manager = new ManagerInfo();
  projectId!: number;
  public currentUser: any = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      // managerName: [''],
      gitHubLink: [''],
      documentation: [null],
    });
  }
  ngOnInit(): void {
    const cookieValue = this.cookieService.get('currentUser');
    this.currentUser = cookieValue ? JSON.parse(cookieValue) : null;
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Project ID récupéré :', this.projectId);
    console.log('User ID récupéré :', this.currentUser.id);
  }

  onSubmit() {
    console.log(this.projectForm.value);
    if (this.projectForm.valid) {
      if (this.currentUser !== null) {
        this.manager.githubLink = this.projectForm.value.gitHubLink;
        this.manager.file = this.projectForm.value.documentation;
        (this.manager.projectId = this.projectId),
          (this.manager.profilType = 'MANAGER');
        this.manager.userId = this.currentUser.id;

        this.joinAsManager(
          this.manager.userId,
          this.manager.projectId,
          this.manager.profilType,
          this.manager.githubLink,
          this.manager.file
        );
        this.router.navigate(['/user/projects-views']);
      } else {
        console.log('Utilisateur courant est vide ');
      }
    }
  }

  joinAsManager(
    userId: number,
    projectId: number,
    profilType: string,
    githubLink: string,
    file?: File
  ) {
    this._projectService
      .joinProjectAsManager(userId, projectId, profilType, githubLink, file)
      .subscribe({
        next: (res) => console.log('Rejoint projet en manager', res),
        error: (err) => console.error('Erreur join project manager', err),
      });
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
