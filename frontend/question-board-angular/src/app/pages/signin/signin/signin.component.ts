import { Component, OnInit } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { Observable } from 'rxjs';

/**
 * 認証画面
 */
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  user: Observable<User | null> = EMPTY;

  constructor(private auth: Auth, private router: Router) {}

  ngOnInit(): void {}

  async signIn() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(this.auth, provider);
    this.router.navigate(['/home']);
  }
}
