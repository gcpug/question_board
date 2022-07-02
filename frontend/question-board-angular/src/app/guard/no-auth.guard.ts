import { Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { CanActivate, Router } from '@angular/router';
import { map, tap } from 'rxjs';

/**
 * 未認証であることをチェックするガード。
 */
@Injectable({
  providedIn: 'root',
})
export class NoAuthGuard implements CanActivate {
  constructor(private auth: Auth, private router: Router) {}

  canActivate() {
    return authState(this.auth).pipe(
      map((user) => !user),
      tap((state) => {
        if (!state) {
          this.router.navigate(['/home']);
        }
      })
    );
  }
}
