import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Event, CreateEventDto, UpdateEventDto} from '../../interfaces/event.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {config} from '../../../config';
import {UserService} from '../user-services/user.service';

@Injectable({providedIn: 'root'})
export class EventService {
  private eventsSubject = new BehaviorSubject<Event[]>([]);
  public events$ = this.eventsSubject.asObservable();

  constructor(private http: HttpClient, private userService: UserService) {
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.userService.token;
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  fetchUserEvents(): Observable<any> {
    const userId = this.userService.user?.id;

    return this.http.get<any>(
      `${config.STRAPI}/api/event?filters[user][id][$eq]=${userId}&populate=user`,
      {headers: this.getAuthHeaders()}
    ).pipe(
      tap((response) => {
        console.log(response);
        const events = (response.data || []).map((item: any) => {
          const userObj = item.user ? {
            id: item.user.id,
            username: item.user.username,
            email: item.user.email
          } : undefined;

          return {
            id: item.id,
            title: item.title,
            occurrence: item.occurrence,
            description: item.description,
            user: userObj
          };
        });
        this.eventsSubject.next(events);
      })
    );
  }


  createEvent(dto: CreateEventDto): Observable<Event> {
    return this.http.post<Event>(
      `${config.STRAPI}/api/event`,
      {data: dto},
      {headers: this.getAuthHeaders()}
    ).pipe(
      tap(() => {
        this.refreshEvents();
      })
    );
  }


  updateEvent(id: number, dto: UpdateEventDto): Observable<Event> {
    return this.http.put<Event>(
      `${config.STRAPI}/api/event/${id}`,
      {data: dto},
      {headers: this.getAuthHeaders()}
    ).pipe(
      tap((res) => {
        this.refreshEvents();
      })
    );
  }


  deleteEvent(id: number): Observable<any> {
    return this.http.delete<any>(
      `${config.STRAPI}/api/event/${id}`,
      {headers: this.getAuthHeaders()}
    ).pipe(
      tap((res) => {
        this.refreshEvents();
      })
    );
  }


  refreshEvents(): void {
    this.fetchUserEvents().subscribe();
  }
}
