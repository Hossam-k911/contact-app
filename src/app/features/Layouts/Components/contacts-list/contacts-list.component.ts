import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FeaturesService } from '../../../features/features.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AddContactComponent } from '../add-contact/add-contact.component';
@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss'],
})
export class ContactsListComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private features: FeaturesService,
    public dialog: MatDialog
  ) {
    this.searchForm = this.formBuilder.group({
      searchedName: [''],
    });
  }

  searchForm: FormGroup;
  contactsListPageNo: number = 1;
  contactList: [] = [];

  ngOnInit(): void {
    this.getContacts(this.contactsListPageNo);
  }

  searchByname() {
    return this.contactList.filter((contact: any) => {
      contact.firstName
        .toLowerCase()
        .includes(this.searchForm.get('searchedName').value);
    });
  }

  getContacts(contactsListPageNo) {
    this.features.getUsersData(contactsListPageNo).subscribe((res: any) => {
      this.contactList = res.data;
    });
  }

  onNextPage() {
    this.contactsListPageNo += 1;
    this.getContacts(this.contactsListPageNo);
  }
  onCBackPage() {
    this.contactsListPageNo -= 1;

    this.getContacts(this.contactsListPageNo);
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddContactComponent, {
      // width: '75.25rem;',
      // height: '35.6875rem;'
      panelClass: 'contact-dialog',
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getContacts(this.contactsListPageNo);
    });
  }

  editContact(contactData) {
    const dialogRef = this.dialog.open(AddContactComponent, {
      data: contactData,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getContacts(this.contactsListPageNo);
    });
  }

  deleteContact(contact) {
    this.features.deleteContact(contact).subscribe((res: any) => {
      this.getContacts(this.contactsListPageNo);
    });
  }
}
