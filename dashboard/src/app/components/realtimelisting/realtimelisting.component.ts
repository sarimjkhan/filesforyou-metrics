import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { SocketService } from '../../services/socket.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-realtimelisting',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './realtimelisting.component.html',
  styleUrl: './realtimelisting.component.scss'
})
export class RealtimelistingComponent {
  cpuUsageData: any[] = [];
  private subscription: Subscription | null = null;

  constructor(private socketService: SocketService){}

  ngOnInit(): void {
    // Initial load of cpu usages
    this.socketService.getRecentCpuUsage().subscribe(data => {
      this.cpuUsageData = data;
    })

    // Real time updates through socket
    this.subscription = this.socketService.connect().subscribe(data => {
      const existingClient = this.cpuUsageData.find(client => client.clientId === data.clientId);
      if(existingClient) {
        existingClient.usage = data.usage;
      } else {
        this.cpuUsageData.push(data);
      }
    }) 
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
