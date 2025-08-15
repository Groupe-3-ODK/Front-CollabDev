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
  styleUrls: ['./admin-form.component.css'], // <-- correction ici
})
export class AdminFormComponent implements OnInit {
  projectForm: FormGroup;
  private _projectService = inject(ProjectService);
  private manager = new ManagerInfo();
  projectId!: number;
  public currentUser: any = null;

  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.projectForm = this.fb.group({
      gitHubLink: [''],
      // documentation ne doit plus être un FormControl
    });
  }

  ngOnInit(): void {
    const cookieValue = this.cookieService.get('currentUser');
    this.currentUser = cookieValue ? JSON.parse(cookieValue) : null;
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Project ID récupéré :', this.projectId);
    if (this.currentUser)
      console.log('User ID récupéré :', this.currentUser.id);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (file.size <= 10 * 1024 * 1024) {
        this.selectedFile = file; // stocke le fichier ici
      } else {
        alert('Le fichier dépasse la taille maximale de 10MB.');
      }
    }
  }

  onSubmit() {
    console.log(this.projectForm.value);
    if (this.projectForm.valid && this.currentUser) {
      this.manager.githubLink = this.projectForm.value.gitHubLink;
      this.manager.projectId = this.projectId;
      this.manager.profilType = 'MANAGER';
      this.manager.userId = this.currentUser.id;

      // envoie le fichier sélectionné
      this.joinAsManager(
        this.manager.userId,
        this.manager.projectId,
        this.manager.profilType,
        this.manager.githubLink,
        this.selectedFile || undefined
      );
    } else {
      console.log('Formulaire invalide ou utilisateur non connecté');
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
        next: (res) => {
          console.log('Rejoint projet en manager', res);
          this.router.navigate(['/user/projects-views']);
        },
        error: (err) => console.error('Erreur join project manager', err),
      });
  }
}
