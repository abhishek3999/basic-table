import { Component, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { Employee } from 'src/interface/empl.interface';
import { Person } from 'src/interface/person.interface';
import { AppService } from './services/app.service';
export var myModal: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  empSearchList: any;
  deleteSearchList: any;
  Persons: Array<any> = [];
  searchDataList: Array<any> = [];
  deleteDataList: any[] = [];
  // modalDetails: Employee = new Employee();
  modalDetails: any = {};

  constructor(private appService: AppService) {
    this.empSearchList = { nameSearch: '', addressSearch: '', companySearch: '' };
    this.deleteSearchList = { name: '', address: '', company: '' };
  }
  ngOnInit() {
    this.appService.getAllUsers().subscribe((resp: any) => {
      this.mapping(resp);
    }, error => {
      console.log(error);
    })
  }
  mapping(resp: any[]) {
    let temp: any[] = [];
    for (let p of resp) {
      this.Persons.push({
        id: p.id,
        name: p.name,
        address: (p.address.street + ',' + p.address.suite + ',' + p.address.city + ',' + p.address.zipcode),
        company: p.company.name,
        companyCatchPhrase: p.company.catchPhrase,
        companyBs: p.company.bs,
        website: p.website,
        email: p.email,
        phone: p.phone
      });
      this.searchDataList = [...this.Persons];
      this.searchDataList.push({
        name: p.name,
        address: (p.address.street + ',' + p.address.suite + ',' + p.address.city + ',' + p.address.zipcode),
        company: p.company.name,
      });
      console.log(this.searchDataList);
    }
  }
  add() {
    let id = <HTMLInputElement>document.getElementById('informationModal');
    myModal = new bootstrap.Modal(id, {
      keyboard: false
    });
    myModal.show();
  }
  edit(person: any) {
    let id = <HTMLInputElement>document.getElementById('informationModal');
    myModal = new bootstrap.Modal(id, {
      keyboard: false
    });
    this.packItems(person);
    myModal.show();
    // this.modalDetails = { ...person };
  }
  packItems(person: any) {
    console.log(person)
    let splitAddr = person.address.split(',');
    this.modalDetails = {
      id: person.id,
      name: person.name,
      email: person.email,
      street: splitAddr[0] || '',
      suite: splitAddr[1] || '',
      city: splitAddr[2] || '',
      zipcode: splitAddr[3] || '',
      companyName: person.company,
      companyCatchPhrase: person.companyCatchPhrase,
      companyBs: person.companyBs,
      website: person.website,
      phone: person.phone
    }

  }
  delet(person: any) {
    for (let p of this.Persons) {
      if (p.id === person.id) {
        p['restore'] = 1;
        this.deleteDataList.push(p);
        break;
      }
    }
  }
  submit() {
    if (this.modalDetails.id) {
      for (let p of this.Persons) {
        if (p.id === this.modalDetails.id) {
          console.log(p)
          p = ({
            id: this.modalDetails.id,
            name: this.modalDetails.name,
            address: (this.modalDetails.street + ',' + this.modalDetails.suite + ',' + this.modalDetails.city + ',' + this.modalDetails.zipcode),
            company: {
              name: this.modalDetails.companyName,
              catchPhrase: this.modalDetails.companyCatchPhrase,
              bs: this.modalDetails.companyBs
            },
            website: this.modalDetails.website,
            email: this.modalDetails.email,
            phone: this.modalDetails.phone
          });
          myModal.hide();
          break;
        }
      }
    } else {
      /// new record
      this.Persons.push({
        id: this.Persons.length + 1,
        name: this.modalDetails.name,
        address: (this.modalDetails.street + ',' + this.modalDetails.suite + ',' + this.modalDetails.city + ',' + this.modalDetails.zipcode),
        company: {
          name: this.modalDetails.companyName,
          catchPhrase: this.modalDetails.companyCatchPhrase,
          bs: this.modalDetails.companyBs
        },
        website: this.modalDetails.website,
        email: this.modalDetails.email,
        phone: this.modalDetails.phone
      });
      myModal.hide();
      alert('details added successfully')
    }
  }

}
