import { Component, OnInit } from '@angular/core';
import { NotificationService } from './notification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'univ-exam-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {

  notifications: any[];
  currentpage: number;
  totalRecords: number;

  constructor(
    private readonly notificationService: NotificationService
  ){
    this.notifications = [];
    this.currentpage = 1;
    this.totalRecords = 0;
  }

  ngOnInit(): void {
    this.notificationService.getNotification().subscribe(
      (response) => {
        this.notifications = response;
        this.totalRecords = response.length;
      },(error) => {
        console.log("Notification componenet error: ", error);
      }
    );
  }

  deleteNotification(id: string){  
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.notificationService.deleteNotification(id).subscribe(
          (response) => {
            this.removeElementFromNotificationArray(id);
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          },(error) => {
            console.log("Notification componenet error: ", error);
          }
        );
      }
    });
  }

  private removeElementFromNotificationArray(notifId: string) {
    this.notifications.forEach((value,index)=>{
        if(value.id==notifId) this.notifications.splice(index,1);
    });
  } 
}
