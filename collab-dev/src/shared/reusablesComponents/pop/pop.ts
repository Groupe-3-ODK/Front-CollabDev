import { Component, EventEmitter, inject, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pop',
  template: `
    <div
      class="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4"
      (click)="closePopup()"
    >
      <div
        class="bg-white rounded-lg shadow-xl max-w-lg w-full transform transition-all duration-300 scale-95 hover:scale-100"
        (click)="$event.stopPropagation()"
      >
        <div class="p-6">
          <div class="border-b-4 border-orange-500 rounded-md p-4 mb-6">
            <h2
              class="text-2xl md:text-3xl font-semibold text-center text-gray-800"
            >
              Voulez-vous joindre le Projet E-learning avec quel profil ?
            </h2>
          </div>

          <div class="space-y-4">
            <div
              class="bg-gray-50 hover:bg-orange-100 cursor-pointer p-4 rounded-lg border-2 transition-colors duration-200"
              [class.border-orange-500]="selectedProfile === 'Développeur'"
              (click)="selectProfile('Développeur')"
            >
              <p class="text-xl text-gray-700 font-medium">Développeur</p>
            </div>
            <div
              class="bg-gray-50 hover:bg-orange-100 cursor-pointer p-4 rounded-lg border-2 transition-colors duration-200"
              [class.border-orange-500]="selectedProfile === 'Designer'"
              (click)="selectProfile('Designer')"
            >
              <p class="text-xl text-gray-700 font-medium">Designer</p>
            </div>
            <div
              class="bg-gray-50 hover:bg-orange-100 cursor-pointer p-4 rounded-lg border-2 transition-colors duration-200"
              [class.border-orange-500]="selectedProfile === 'Gestionnaire'"
              (click)="selectProfile('Gestionnaire')"
            >
              <p class="text-xl text-gray-700 font-medium">Gestionnaire</p>
            </div>
          </div>

          <div class="mt-8 flex justify-center">
            <button
              class="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors duration-200 shadow-md transform hover:scale-105"
              [disabled]="!selectedProfile"
              [class.opacity-50]="!selectedProfile"
              (click)="submitAndClose()"
            >
              Soumettre
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrl: './pop.css',
})
export class Pop {
  selectedProfile: string | null = null;
  @Output() submitted = new EventEmitter<string>();
  @Output() closed = new EventEmitter<void>();

  router = inject(Router);

  selectProfile(profile: string): void {
    this.selectedProfile = profile;

    // if (profile === 'Gestionnaire') {
    //   this.router.navigate(['/user/manager-submit-form']);
    // }
  }

  submitAndClose(): void {
    if (this.selectedProfile) {
      this.submitted.emit(this.selectedProfile);
      this.closePopup();
    }
  }

  closePopup(): void {
    this.closed.emit();
  }
}
