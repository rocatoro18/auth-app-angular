import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AuthStatus } from '../interfaces';

// Public Guard - PrivateGuard

// EN ESTE CASO EL GUARD ESTA COMO FUNCION, AUNQUE TAMBIEN HAY FORMA DE QUE SE HAGA COMO CLASE...
//ng g g auth/guards/isAuthenticated --functional
// ESTE GUARD SOLO SE VA A ENCARGAR DE PROTEGER LA RUTA
export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {

  // URL A LA CUAL QUIERE IR
  //const url = state.url;
  //console.log({url});
  //localStorage.setItem('url', url);

  const authService = inject(AuthService);
  // Inyectar Router
  const router = inject(Router)

  //console.log({status: authService.authStatus()});

  if(authService.authStatus() === AuthStatus.authenticated){
    router.navigateByUrl('/dashboard');
    return false;
  }

  //if(authService.authStatus() === AuthStatus.checking){
  //  return false;
  //}

  // URL A LA CUAL QUIERE IR
  //const url = state.url;
  //console.log({url});
  //localStorage.setItem('url', url);
  // REGRESAMOS AL LOGIN SI NO ESTA AUTENTICADO
  //router.navigateByUrl('/auth/login');

  //console.log('isAuthenticatedGuard');
  //console.log({route, state});
  return true;
};
