import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ajout-equipe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ajout-equipe.html',
  styleUrls: ['./ajout-equipe.css']
})
export class AjoutEquipe {
  screenWidth: number = window.innerWidth;
  baseWidth: number = 2285;

  teamName: string = 'E-learning';
  searchQuery: string = '';
  roleFilter: string = 'Tous les rôles';
  
  teamMembers = [
    { id: 1, pseudo: 'Amirata', mail: 'amirata@.mail', role: 'DESIGNER', dateAdded: '06/10/2025' },
    { id: 2, pseudo: 'Mariam', mail: 'amirata@.mail', role: 'DEVELOPPEUR', dateAdded: '06/10/2025' },
    { id: 3, pseudo: 'Rose', mail: 'amirata@.mail', role: 'DESIGNER', dateAdded: '06/10/2025' },
    { id: 4, pseudo: 'Pseudo', mail: 'amirata@.mail', role: 'DEVELOPPEUR', dateAdded: '06/10/2025' }
  ];

  showDeletePopup: boolean = false;
  memberToDelete: any = null;

  @HostListener('window:resize', ['$event'])
  onResize(event?: Event) {
    this.screenWidth = window.innerWidth;
  }

  get scaleFactor(): number {
    return Math.min(1, this.screenWidth / this.baseWidth);
  }

  get filteredMembers() {
    return this.teamMembers.filter(member => {
      const matchesSearch = member.pseudo.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                          member.mail.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesRole = this.roleFilter === 'Tous les rôles' || member.role === this.roleFilter;
      return matchesSearch && matchesRole;
    });
  }

  getRoleStyle(role: string) {
    return {
      'width': '240px',
      'height': '60.66px',
      'display': 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      'border-radius': '4px 4px 10px 10px',
      'border': '3px solid',
      'font-family': 'Inter',
      'font-size': '30px',
      'font-weight': '400',
      'background-color': role === 'DESIGNER' ? '#DDEEBB' : '#92D3FB',
      'border-color': role === 'DESIGNER' ? '#4CAF50' : '#3A7CA5',
      'color': role === 'DESIGNER' ? '#4E6F0B' : '#0D2533'
    };
  }

  openDeletePopup(member: any) {
    this.memberToDelete = member;
    this.showDeletePopup = true;
  }

  confirmDelete() {
    this.teamMembers = this.teamMembers.filter(m => m.id !== this.memberToDelete.id);
    this.closePopup();
  }

  closePopup() {
    this.showDeletePopup = false;
    this.memberToDelete = null;
  }
}