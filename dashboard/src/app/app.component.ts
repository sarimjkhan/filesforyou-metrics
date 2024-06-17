import { Component } from '@angular/core';
import { RealtimelistingComponent } from './components/realtimelisting/realtimelisting.component';
import { HistoricaldataComponent } from './components/historicaldata/historicaldata.component';
import { HighCpuUsageClientsComponent } from './components/high-cpu-usage-clients/high-cpu-usage-clients.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RealtimelistingComponent,
    HistoricaldataComponent,
    HighCpuUsageClientsComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'dashboard';
}
