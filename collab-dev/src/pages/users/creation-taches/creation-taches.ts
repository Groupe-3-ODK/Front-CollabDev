import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import flatpickr from 'flatpickr';
import { French } from 'flatpickr/dist/l10n/fr';

@Component({
  selector: 'app-creation-taches',
  imports: [], // Cet array est pour les components 'standalone', vous pouvez l'ignorer si votre composant est dans un NgModule.
  templateUrl: './creation-taches.html',
  styleUrl: './creation-taches.css'
})
export class CreationTaches implements OnInit, AfterViewInit, OnDestroy {
  // @ViewChild permet de référencer un élément du DOM via sa référence locale (#) dans le template.
  @ViewChild('deadlineInput') deadlineInput!: ElementRef;

  private flatpickrInstance: any;

  constructor() {}

  ngOnInit(): void {
    // Logique d'initialisation du composant, avant le rendu du DOM.
  }

  // ngAfterViewInit est le bon moment pour manipuler le DOM, car il est garanti qu'il est rendu.
  ngAfterViewInit(): void {
    if (this.deadlineInput) {
      this.flatpickrInstance = flatpickr(this.deadlineInput.nativeElement, {
        locale: French, // Utilisation de la localisation française
        dateFormat: 'd/m/Y',
        minDate: 'today'
      });
    }
  }

  // ngOnDestroy est crucial pour nettoyer les instances de bibliothèques tierces comme Flatpickr.
  // Cela permet d'éviter les fuites de mémoire lorsque le composant est détruit.
  ngOnDestroy(): void {
    if (this.flatpickrInstance) {
      this.flatpickrInstance.destroy();
    }
  }

  // Méthode pour gérer l'événement 'click' du bouton 'Valider'.
  onSubmit(): void {
    // Pour l'exemple, nous allons juste afficher le message de succès.
    // Ici, vous auriez normalement la logique pour valider les données et appeler un service.
    this.showSuccessMessage();
    console.log('Tâche soumise!');
  }

  // Affiche un message de succès (peut être remplacé par un composant de notification plus élégant).
  private showSuccessMessage(): void {
    alert('La tâche a été créée avec succès !');
  }
}