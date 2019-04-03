import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CarinventoryService } from '../services/carinventory.service';
import { ModalDirective } from 'ngx-bootstrap';
@Component({
  selector: 'app-viewinventory',
  templateUrl: './viewinventory.component.html',
  styleUrls: ['./viewinventory.component.css']
})
export class ViewinventoryComponent implements OnInit {
  @ViewChild('showModelPopup') public showModelPopupData: ModalDirective;
  error: string;
  uploadError: string;
  modelForm: FormGroup;
  inventoryList: any;
  selectedModel: any;
  id1: any;

  constructor(
    private fb: FormBuilder,
    private carinventoryService: CarinventoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.carinventoryService.getInventoryList().subscribe(
      (data: any) => this.inventoryList = data,
      error => this.error = error
    );
  }

  public showPopup(id: any, inventoryList: any) {
     this.selectedModel = inventoryList;
     this.showModelPopupData.show();
  }

  public hidePopup() {
    this.showModelPopupData.hide();
  }

  onDelete(id: number) {
    if (confirm('Are you sure want to delete ?')) {
      this.carinventoryService.deleteModel(+id).subscribe(
        res => {
          this.ngOnInit();
        },
        error => this.error = error
      );
    }
  }

}
