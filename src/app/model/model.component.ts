import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CarinventoryService } from '../services/carinventory.service';
import { CONTEXT } from '@angular/core/src/render3/interfaces/view';
@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {

  error: string;
  uploadError: string;
  modelForm: FormGroup;
  imagePath: string;
  manufacturers: any;
  formSubmitted: any;

  constructor(
    private fb: FormBuilder,
    private carinventoryService: CarinventoryService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.carinventoryService.getManufacturer().subscribe(
      (data: any) => this.manufacturers = data,
      error => this.error = error
    );

    this.modelForm = this.fb.group({
      id: [''],
      manufacturer_id: ['', Validators.required],
      modelname: ['', Validators.required],
      color: ['', Validators.required],
      manufacturingyear: ['', Validators.required],
      registrationnumber: ['', Validators.required],
      note: ['', Validators.required],
      image: [''],
    });
  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.modelForm.get('image').setValue(file);
    }
  }

  get manufacturer_id() { return this.modelForm.get('manufacturer_id'); }
  get modelname() { return this.modelForm.get('modelname'); }
  get color() { return this.modelForm.get('color'); }
  get manufacturingyear() { return this.modelForm.get('manufacturingyear'); }
  get registrationnumber() { return this.modelForm.get('registrationnumber'); }
  get note() { return this.modelForm.get('note'); }

  onSubmit() {
    this.formSubmitted = true;
    const formData = new FormData();
    formData.append('manufacturer_id', this.modelForm.get('manufacturer_id').value);
    formData.append('modelname', this.modelForm.get('modelname').value);
    formData.append('color', this.modelForm.get('color').value);
    formData.append('manufacturingyear', this.modelForm.get('manufacturingyear').value);
    formData.append('registrationnumber', this.modelForm.get('registrationnumber').value);
    formData.append('note', this.modelForm.get('note').value);
    formData.append('image', this.modelForm.get('image').value);
    this.carinventoryService.createModel(formData).subscribe(
      res => {
        if (res.status === 'error') {
          this.uploadError = res.message;
        }
      },
      error => this.error = error
    );
  }
}
