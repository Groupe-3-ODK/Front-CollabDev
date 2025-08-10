import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent {
  // Personal Information
  personalInfo = {
    firstName: 'Mohamed',
    lastName: 'Touré',
    birthDate: '12-10-2001',
    email: 'rjkjk',
    phone: '+22370672215',
    profile: 'Développeur'
  };

  // Address Information
  addressInfo = {
    country: 'Mali',
    city: 'Bamako',
    postalCode: '25029'
  };

  // Edit modes
  isEditingPersonalInfo = false;
  isEditingAddress = false;

  // Original data for canceling edits
  originalPersonalInfo = { ...this.personalInfo };
  originalAddressInfo = { ...this.addressInfo };

  // Toggle edit mode for personal info
  togglePersonalInfoEdit() {
    if (this.isEditingPersonalInfo) {
      // Cancel edit - restore original values
      this.personalInfo = { ...this.originalPersonalInfo };
    } else {
      // Start edit - save original values
      this.originalPersonalInfo = { ...this.personalInfo };
    }
    this.isEditingPersonalInfo = !this.isEditingPersonalInfo;
  }

  // Toggle edit mode for address
  toggleAddressEdit() {
    if (this.isEditingAddress) {
      // Cancel edit - restore original values
      this.addressInfo = { ...this.originalAddressInfo };
    } else {
      // Start edit - save original values
      this.originalAddressInfo = { ...this.addressInfo };
    }
    this.isEditingAddress = !this.isEditingAddress;
  }

  // Save personal info changes
  savePersonalInfo() {
    this.originalPersonalInfo = { ...this.personalInfo };
    this.isEditingPersonalInfo = false;
    // Here you would typically call an API to save the data
  }

  // Save address changes
  saveAddress() {
    this.originalAddressInfo = { ...this.addressInfo };
    this.isEditingAddress = false;
    // Here you would typically call an API to save the data
  }
}