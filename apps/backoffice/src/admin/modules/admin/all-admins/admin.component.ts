import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAdmin } from '@univ-exam/common';
import { AdminService } from './admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'univ-exam-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  admins: IAdmin[] = [];
  currentPage: number;
  totalPages: number;
  itemsLimit: number;
  constructor(private readonly adminService: AdminService) {
    this.currentPage = 0;
    this.totalPages = 0;
    this.itemsLimit = 10;
  }

  ngOnInit(): void {
    this.fetchItems();
  }

  fetchItems() {
    const query = { page: this.currentPage, limit: this.itemsLimit };
    this.adminService.getAdmins(query).subscribe(
      (response) => {
        this.admins = response.items;
        this.totalPages = response.totalPages;
        console.log('admins', this.admins);
      },
      (error) => {
        console.log('Admin component error', error);
      }
    );
  }
  changePage(page: number) {
    if (page < 0) return;
    this.currentPage = page;
    this.fetchItems();
  }

  // get name() {
  //   return this.form.get('name') as FormControl;
  // }
  // addAdmin(){
  //   const data = this.form.value;
  //   this.adminService.addAdmin(data).subscribe(
  //     (response) =>{
  //       this.form.reset();
  //       this.admins.unshift(response)
  //     },
  //     (error) =>{
  //       this.nameError = error.error.message[0];
  //     }
  //   )
  // }
  // done(){
  //   this.addForm = false;
  //   this.updateForm = false;
  //   this.form.reset();
  //   this.nameError = '';
  // }
  // editAdmin(admin: IAdmin){
  //   this.addForm = true;
  //   this.updateForm = true;
  //   this.adminUpdate = admin;
  //   this.form.setValue({name: admin.name});
  // }
  // updateAdmin(){
  //   const data = this.form.value;
  //   this.adminService.updateAdmin(this.adminUpdate.id,data).subscribe(
  //     (response) =>{
  //       const speclt = this.admins.indexOf(this.adminUpdate);
  //       this.admins[speclt].name = data.name;
  //     },
  //     (error) =>{
  //       this.nameError = error.error.message[0];
  //     }
  //   )
  // }
  deleteAdmin(admin: IAdmin) {
    this.adminService.deleteAdmin(admin.id).subscribe(
      (response) => {
        Swal.fire('Deleted!', 'The admin has been deleted.', 'success');
        const speclt = this.admins.indexOf(admin);
        this.admins.splice(speclt, 1);
      },
      (error) => {
        Swal.fire('Error!', 'The admin didnt deleted.', 'error');
      }
    );
  }

  deleteAlert(admin: IAdmin) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteAdmin(admin);
      }
    });
  }
}
