import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';

/**
 * 共通ヘッダ
 */
@Component({
  selector: 'app-header-layout',
  templateUrl: './header-layout.component.html',
  styleUrls: ['./header-layout.component.scss'],
})
export class HeaderLayoutComponent implements OnInit {
  constructor(private auth: Auth, private router: Router) {}

  ngOnInit(): void {}

  async signOut() {
    await this.auth.signOut();
    this.router.navigate(['/signin']);
  }
}
