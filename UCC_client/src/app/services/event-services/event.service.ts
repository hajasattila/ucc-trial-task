import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Event, CreateEventDto, UpdateEventDto } from '../../interfaces/event.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { config } from '../../../config';
import { UserService } from '../user-services/user.service';

@Injectable({ providedIn: 'root' })
export class EventService {
  private eventsSubject = new BehaviorSubject<Event[]>([]);
  public events$ = this.eventsSubject.asObservable();

  constructor(private http: HttpClient, private userService: UserService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.userService.token;
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  fetchUserEvents(): Observable<any> {
    return this.http.get<any>(
      `${config.STRAPI}/api/events?populate[0]=user`,
      { headers: this.getAuthHeaders() }
    ).pipe(
      tap((response) => {
        const currentUserId = this.userService.user?.id;
        const events = (response.data || []).map((item: any) => {
          let userObj = undefined;
          if (item.user) {
            userObj = {
              id: item.user.id,
              ...item.user
            };
          }
          return {
            id: item.id,
            title: item.title,
            occurrence: item.occurrence,
            description: item.description,
            user: userObj
          };
        }).filter((ev: Event) => ev.user?.id === currentUserId);
        this.eventsSubject.next(events);
      })
    );
  }



  createEvent(dto: CreateEventDto): Observable<Event> {
    return this.http.post<Event>(
      `${config.STRAPI}/api/events`,
      { data: dto },
      { headers: this.getAuthHeaders() }
    ).pipe(
      tap(() => {
        this.refreshEvents();
        this.fetchUserEvents().subscribe();
      })
    );
  }


  updateEvent(id: number, dto: UpdateEventDto): Observable<Event> {
    return this.http.put<Event>(
      `${config.STRAPI}/api/events/${id}`,
      { data: dto },
      { headers: this.getAuthHeaders() }
    ).pipe(
      tap(() => {
        this.refreshEvents();
      })
    );
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(
      `${config.STRAPI}/api/events/${id}`,
      { headers: this.getAuthHeaders() }
    ).pipe(
      tap(() => {
        this.refreshEvents();
      })
    );
  }

  refreshEvents(): void {
    this.fetchUserEvents().subscribe();
  }
}
