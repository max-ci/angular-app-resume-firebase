import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from 'src/app/common/interfaces/notification';
import { NotificationService } from 'src/app/common/services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent {
  notifications: Notification[] = [];
  notifications$: Observable<Notification[]>;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notifications$.subscribe({
      next: (value) => {
        this.notifications = value;
      },
    });
  }

  hide(id: string): void {
    this.notificationService.hide(id);
  }
}
