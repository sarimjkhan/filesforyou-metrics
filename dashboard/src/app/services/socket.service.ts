import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { SYSTEM_CONFIGS } from '../configs/systemConfig';


@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;

  constructor(private http: HttpClient) { 
    this.socket = io(SYSTEM_CONFIGS.SOCKET_SERVER_URL);
  }

  public connect(): Observable<any> {
    return new Observable(observer => {
      this.socket.on(SYSTEM_CONFIGS.EVENTS.USAGE_UPDATE_BROADCAST, (data) => {
        observer.next(data);
      })
    })
  }

  public getRecentCpuUsage(): Observable<any> {
    return this.http.get(SYSTEM_CONFIGS.ENDPOINTS.RECENT_CPU_USAGE);
  }

  public getCpuUsageByClient(clientId: string, startTime?: Date, endTime?: Date, limit?: number): Observable<any> {
    let params: any = { clientId, limit };
    if(startTime) params.startTime = startTime.toISOString();
    if(endTime) params.endTime = endTime.toISOString();
    return this.http.get(`${SYSTEM_CONFIGS.ENDPOINTS.CPU_USAGE_BY_CLIENT}`, {params});
  }

  public getHighCpuUsageClients(threshold: Number, startTime?: Date, endTime?: Date): Observable<any> {
    let params: any = { threshold };
    if(startTime) params.startTime = startTime.toISOString();
    if(endTime) params.endTime = endTime.toISOString();
    return this.http.get(`${SYSTEM_CONFIGS.ENDPOINTS.HIGH_CPU_USAGE_CLIENTS}`, {params});
  }
}
