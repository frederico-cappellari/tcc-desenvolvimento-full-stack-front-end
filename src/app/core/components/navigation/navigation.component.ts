import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, CollapseModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent {

  @Input() menuActived: boolean = true;
  isCollapsed: Record<string, boolean> = {};
  private actived = false;

  constructor(private router: Router) { }

  toggleCollapsed(collapseKey: string, event: Event): void {
    event.preventDefault();
    this.isCollapsed[collapseKey] = !this.isCollapsed[collapseKey];
  }

  ariaExpanded(collapseKey: string): boolean {
    return !!this.isCollapsed[collapseKey];
  }

  activeRoute(routeName: string): boolean {
    const isActive = this.router.url.indexOf(routeName) > -1;
    if (isActive && !this.actived) {
      this.isCollapsed[routeName] = true;
      this.actived = true;
    }
    return isActive;
  }
}
