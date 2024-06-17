import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-historicaldata',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historicaldata.component.html',
  styleUrl: './historicaldata.component.scss'
})
export class HistoricaldataComponent implements OnInit {
  cpuUsageData: any[] = [];
  clientId: string = '';
  startTime: string | null = null;
  endTime: string | null = null;
  limit: number = 10;

  constructor(private socketService: SocketService) {}

  queryData(): void {
    const start = this.startTime ? new Date(this.startTime) : undefined;
    const end = this.endTime ? new Date(this.endTime) : undefined;

    if (this.clientId) {
      this.socketService.getCpuUsageByClient(this.clientId, start, end, this.limit).subscribe(data => {
        this.cpuUsageData = data;
      })
    }
  }
  
  ngOnInit(): void {}

}
