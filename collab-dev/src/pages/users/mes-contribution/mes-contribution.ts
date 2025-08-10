import { CommonModule } from '@angular/common'; // Importez le CommonModule
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importez le FormsModule
@Component({
  selector: 'app-mes-contribution',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mes-contribution.html',
  styleUrl: './mes-contribution.css',
})
export class MesContribution {}
