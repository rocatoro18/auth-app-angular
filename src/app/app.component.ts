import { Component, computed, effect, inject } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces';
import { Router } from '@angular/router';

// TODA APLICACION DE ANGULAR PASA POR ESTE APP COMPONENT

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'authAppAngular';

  private authService = inject(AuthService);
  private router = inject(Router);

  // SEÑAL COMPUTADA
  public finishedAuthCheck = computed<boolean>(() => {

    if(this.authService.authStatus() === AuthStatus.checking){
      return false;
    }

    return true;

  });

  // CREAMOS EFECTO
  public authStatusChangedEffect = effect(() => {
    // ESTO SE VA A DISPARAR CADA VEZ QUE UNA SEÑAL EN EL EFECTO CAMBIE
    //console.log('authStatus:',this.authService.authStatus());
    switch(this.authService.authStatus()){
      case AuthStatus.checking:
        return;
      case AuthStatus.authenticated:
        this.router.navigateByUrl('/dashboard');
        return;
      case AuthStatus.notAuthenticated:
        this.router.navigateByUrl('/auth/login');
        return;
    }
  });

}
