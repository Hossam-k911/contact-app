import { Component, Inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { FeaturesService } from 'src/app/features/features/features.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
})
export class AddContactComponent implements OnInit {
  contactForm: FormGroup = new FormGroup({});

  imageSrc: any;
  constructor(
    private formBuilder: FormBuilder,
    private features: FeaturesService,
    @Inject(MAT_DIALOG_DATA) public data: { name: string },
    public dialog: MatDialogRef<AddContactComponent>
  ) {
    this.contactForm = this.formBuilder.group({
      id: new FormControl('', Validators.required),
      picture: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    debugger;
    if (this.data) {
      this.retrieveData(this.data);
    }
  }

  uploadPhoto(event) {
    const file = event.target.files[0];
    if (file) {
      // Read and set the selected image as the preview
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageSrc = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  addContact() {
    this.features
      .createContact(this.contactForm.getRawValue())
      .subscribe((res: any) => {
        debugger;
        const dialogRef = this.dialog.close();
      });
  }

  retrieveData(contactData) {
    this.contactForm.patchValue(contactData);

    this.imageSrc = this.contactForm.get('picture').value;
  }
}
