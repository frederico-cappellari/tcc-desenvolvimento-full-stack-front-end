import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AuthService } from '../../../shared/services/auth.service';
import { MenuComponent } from '../menu/menu.component';
import { Usuario } from '../../../shared/models/usuario.model';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, MenuComponent, BsDropdownModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  @Output() menuToggle = new EventEmitter<boolean>();
  @Input() menuActived = true;
  userInfo!: Usuario;

  constructor(private authService: AuthService) {
    this.authService.getUserInfo().subscribe({
      next: (res) => {
        this.userInfo = res;
      },
    });
  }

  logout() {
    this.authService.logout();
  }

  toggleMenu(): void {
    this.menuActived = !this.menuActived;
    this.menuToggle.emit(this.menuActived); // Emitindo o estado do menu
  }
}
