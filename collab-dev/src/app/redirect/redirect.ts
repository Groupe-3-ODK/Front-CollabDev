import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-redirect',
  imports: [RouterOutlet],
  templateUrl: './redirect.html',
  styleUrl: './redirect.css',
})
export class Redirect implements OnInit {
  private router = inject(Router);

  constructor() {}
  ngOnInit() {}
}
