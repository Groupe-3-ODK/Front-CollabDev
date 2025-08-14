import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pop',
  template: `
    <!-- Backdrop -->
    <div
      class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50"
      (click)="closePopup()"
    >
      <!-- Contenu du popup -->
      <div
        class="bg-white rounded-lg shadow-xl max-w-md w-full p-6 border-2 border-gray-300"
        (click)="$event.stopPropagation()"
      >
        <h2 class="text-xl font-semibold mb-4 text-center">
          Voulez-vous joindre le projet avec quel profil ?
        </h2>

        <div class="space-y-4">
          <div
            class="cursor-pointer p-3 rounded-lg border-2 hover:bg-orange-100"
            [class.border-orange-500]="selectedProfile === 'DEVELOPER'"
            (click)="selectProfile('DEVELOPER')"
          >
            Développeur
          </div>

          <div
            class="cursor-pointer p-3 rounded-lg border-2 hover:bg-orange-100"
            [class.border-orange-500]="selectedProfile === 'DESIGNER'"
            (click)="selectProfile('DESIGNER')"
          >
            Designer
          </div>
        </div>

        <!-- Boutons Soumettre et Fermer -->
        <div class="mt-6 flex space-x-4">
          <button
            class="flex-1 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg"
            [disabled]="!selectedProfile"
            [class.opacity-50]="!selectedProfile"
            (click)="submitAndClose()"
          >
            Soumettre
          </button>

          <button
            class="flex-1 py-3 bg-gray-400 hover:bg-gray-500 text-white font-bold rounded-lg"
            (click)="closePopup()"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./pop.css'], // note le s à styleUrls
})
export class Pop {
  selectedProfile: string | null = null;

  @Output() submitted = new EventEmitter<string>();
  @Output() closed = new EventEmitter<void>();

  selectProfile(profile: string) {
    this.selectedProfile = profile;
  }

  submitAndClose() {
    if (this.selectedProfile) {
      this.submitted.emit(this.selectedProfile);
      this.closePopup();
    }
  }

  closePopup() {
    this.closed.emit();
  }
}
