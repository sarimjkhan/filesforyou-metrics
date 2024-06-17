import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-high-cpu-usage-clients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './high-cpu-usage-clients.component.html',
  styleUrl: './high-cpu-usage-clients.component.scss'
})
export class HighCpuUsageClientsComponent implements OnInit {
  threshold: number = 80;
  startTime: string | null = null;
  endTime: string | null = null;
  highCpuUsageData: any[] = [];

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {}

  queryHighCpuUsage(): void {
    const start = this.startTime ? new Date(this.startTime) : undefined;
    const end = this.endTime ? new Date(this.endTime) : undefined;

    this.socketService.getHighCpuUsageClients(this.threshold, start, end).subscribe(data => {
      this.highCpuUsageData = data;
    });
  }
}
