import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BaseComponent } from '../../../../core/base/base.component';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent extends BaseComponent implements OnInit {

  modalRef?: BsModalRef;

  constructor(private modalService: BsModalService) {
    super()
  }

  ngOnInit(): void {
    this.loaded();
  }

  openModal(template: TemplateRef<void>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, { class: 'modal-lg' }));
  }
}
