import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { EventSharedService } from '../../../shared/services/event-shared.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'app-standard',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, LoadingComponent],
  templateUrl: './standard.component.html',
  styleUrl: './standard.component.scss'
})
export class StandardComponent extends BaseComponent implements OnInit, OnDestroy {

  body: HTMLBodyElement | null = document.querySelector('body');
  menuActived = true;
  stateLoad = true;

  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    if (this.body && this.body?.offsetWidth > 991) {
      this.menuActived = false;
    }
    this.loadingState();
  }

  ngOnDestroy(): void {
    this.unsubscribeList();
  }

  onMenuToggle(isMenuActive: boolean): void {
    this.menuActived = isMenuActive;
  }

  loadingState() {
    this.addSub(
      EventSharedService.get('loadingState').subscribe((stateLoad: boolean) => {
        this.stateLoad = stateLoad;
        this.cdr.detectChanges(); // Força a detecção de mudanças após a alteração do estado
      })
    )
  }
}


