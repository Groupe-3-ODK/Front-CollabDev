import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManagerInfo, ProjectService } from '../../../core/services/project.service';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-form',
   standalone: true, 
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './admin-form.component.html',
  styleUrl: './admin-form.component.css',
  providers: [CookieService],
})
export class AdminFormComponent implements OnInit {
  projectForm: FormGroup;
  managerInfo: ManagerInfo = new ManagerInfo();
  private cookieService = inject(CookieService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  public currentUser: any = null;

  private _projectService = inject(ProjectService);
  constructor(private fb: FormBuilder) {
    this.projectForm = this.fb.group({
      // managerName: [''],
      gitHubLink: [''],
      documentation: [null]
    });
  }
  ngOnInit(): void {
    const cookieValue = this.cookieService.get('currentUser');
    this.currentUser = cookieValue ? JSON.parse(cookieValue) : null;

    const projectIdFromRoute = this.route.snapshot.paramMap.get('id');

    if (this.currentUser && projectIdFromRoute) {
      this.managerInfo.userId = this.currentUser.id;
      this.managerInfo.projectId = parseInt(projectIdFromRoute);
    }
  }

  onSubmit() {

    if (this.projectForm.valid && this.currentUser) {
      const formValue = this.projectForm.value;
      this.managerInfo.githubLink = formValue.gitHubLink;
      this.managerInfo.file = formValue.documentation;

      // Appel au service pour rejoindre le projet
      this.joinProjectAsManager(
        this.managerInfo.userId,
        this.managerInfo.projectId,
        'MANAGER',
        this.managerInfo.githubLink,
        this.managerInfo.file
      );
    } else {
      alert('Veuillez remplir tous les champs requis.');
    }
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

  joinProjectAsManager(
    userId: number,
    projectId: number,
    profilType: string,
    githubLink: string,
    file?: File
  ) {
    this._projectService
      .joinProjectAsManager(projectId, userId, profilType, githubLink, file)
      .subscribe({
        //12, 5, 'DESIGNER'
        next: (res) => console.log('Rejoint projet avec profil', res),
        error: (err) => console.error('Erreur join project', err),
      });
  }
}
