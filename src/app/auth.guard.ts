import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authAngular: AngularFireAuth,
    private router: Router) {}
  canActivate(): Observable<boolean> {
    return this.authAngular.authState.pipe(
      map((user: any) => {
        if (user) {
          // El usuario está autenticado, permitir el acceso a la ruta
          return true;
        } else {
          // El usuario no está autenticado, redirigir al componente de inicio de sesión
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
