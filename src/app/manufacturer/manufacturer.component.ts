import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CarinventoryService } from '../services/carinventory.service';
@Component({
  selector: 'app-manufacturer',
  templateUrl: './manufacturer.component.html',
  styleUrls: ['./manufacturer.component.css']
})
export class ManufacturerComponent implements OnInit {

  error: string;
  uploadError: string;
  manufacturerForm: FormGroup;
  public formSubmitted: any;

  constructor(
    private fb: FormBuilder,
    private carinventoryService: CarinventoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.manufacturerForm = this.fb.group({
      id: [''],
      manufacturer: ['', Validators.required],
    });
  }

  get manufacturer() { return this.manufacturerForm.get('manufacturer'); }

  onSubmit() {
    this.formSubmitted = true;
    const formData = new FormData();
    formData.append('manufacturer', this.manufacturerForm.get('manufacturer').value);
    this.carinventoryService.createManufacturer(formData).subscribe(
      res => {
        if (res.status === 'error') {
          this.uploadError = res.message;
        }
      },
      error => this.error = error
    );
  }
}
