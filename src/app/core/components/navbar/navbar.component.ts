import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AuthService } from '../../../shared/services/auth.service';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MenuComponent, BsDropdownModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  @Output() menuToggle = new EventEmitter<boolean>();
  @Input() menuActived = true;

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }

  toggleMenu(): void {
    this.menuActived = !this.menuActived;
    this.menuToggle.emit(this.menuActived); // Emitindo o estado do menu
  }
}
