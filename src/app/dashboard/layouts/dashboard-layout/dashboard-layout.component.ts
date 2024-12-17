import { Component, computed, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  standalone: false,

  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {

  private authService = inject(AuthService);

  // PROPIEDADES COMPUTADAS EN PROPIEDADES DE SOLO LECTURA EN ESTE CASO
  public user = computed(() => this.authService.currentUser());

  /*
  get user(){
    return this.authService.currentUser();
  }
  */

}
