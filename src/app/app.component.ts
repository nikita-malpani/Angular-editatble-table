import { element } from 'protractor';
import { Component } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ConfigService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  fullData;
  filterText: string;
  isEditing: boolean;
  data;
  totalPages;
  currentPage = 1;
  record = 20;
  filterValue;
  controls;
  profileForm = [];
  sortAscending = Array(4).fill(true);

  constructor(private readonly modalService: ConfigService) {
    this.modalService.getConfig().subscribe((res) => {
      this.fullData = res;
      this.totalPages = this.fullData?.length / 10;
      this.data = this.fullData.slice(0, this.record);

      this.fullData?.forEach((entity) => {
        this.profileForm.push(
          new FormGroup({
            name: new FormControl(entity.name),
            email: new FormControl(entity.email),
            body: new FormControl(entity.body),
          })
        );
      });
    });
  }

  ngOnInit() {
    this.isEditing = false;
  }

  editClicked = () => {
    if (this.isEditing) {
      this.profileForm.forEach((element, i) => {
        this.fullData[i].name = element.controls.name.value;
        this.fullData[i].email = element.controls.email.value;
        this.fullData[i].body = element.controls.body.value;
      });
      this.data = this.fullData.slice(0, this.record);
    }
    this.isEditing = !this.isEditing;
  };

  nextClicked = () => {
    const from = this.currentPage * this.record;
    this.currentPage++;
    const to = this.currentPage * this.record;
    this.data = this.fullData.slice(from, to);
  };

  prevClicked = () => {
    this.currentPage--;
    const from = (this.currentPage - 1) * this.record;
    const to = this.currentPage * this.record;
    this.data = this.fullData.slice(from, to);
  };

  sort = (index) => {
    this.sortAscending[index] = !this.sortAscending[index];
    switch (index) {
      case 0:
        this.fullData.sort((a, b) =>
          this.sortAscending[index]
            ? a.id < b.id
              ? -1
              : 1
            : a.id < b.id
            ? 1
            : -1
        );
        break;
      case 1:
        this.fullData.sort((a, b) =>
          this.sortAscending[index]
            ? a.name < b.name
              ? -1
              : 1
            : a.name < b.name
            ? 1
            : -1
        );
        break;
      case 2:
        this.fullData.sort((a, b) =>
          this.sortAscending[index]
            ? a.email < b.email
              ? -1
              : 1
            : a.email < b.email
            ? 1
            : -1
        );
        break;
      case 3:
        this.fullData.sort((a, b) =>
          this.sortAscending[index]
            ? a.body < b.body
              ? -1
              : 1
            : a.body < b.body
            ? 1
            : -1
        );
        break;
    }

    this.data = this.fullData.slice(0, this.record);
    this.currentPage = 1;
  };

  filterData = (e) => {
    this.filterValue = e.target.value;
    this.data = this.fullData.filter(
      (item) =>
        item.name.indexOf(this.filterValue) !== -1 ||
        item.email.indexOf(this.filterValue) !== -1 ||
        item.body.indexOf(this.filterValue) !== -1
    );
  };
}
