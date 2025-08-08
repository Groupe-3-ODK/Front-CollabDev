export class updatePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;

  constructor() {
    this.oldPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }
}

export class ManagerInfo {
  manager: string;
  githubLink: string;
  pathCv: string;

  constructor() {
    this.manager = this.githubLink = '';
    this.pathCv = '';
  }
}

export class user {
  speudo: string;
  email: string;
  password: string;

  constructor() {
    this.speudo = '';
    this.email = '';
    this.password = '';
  }
}
