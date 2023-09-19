import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { Notification } from '../notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],
})
export class NotificationComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private router: Router,private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.fetchNotifications();
    console.log(this.notifications);
    
  }

  show()
  {
    this.router.navigate(["dashboard"]);
    
  }

  fetchNotifications() {
    this.notificationService.getNotifications().subscribe(
      (notifications) => {
        this.notifications = notifications;
      },
      (error) => {
        console.error('Error fetching notifications:', error);
      }
    );
  }
}