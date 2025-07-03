import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userSubject = new BehaviorSubject<any>(null);

  constructor() {}

  public get userChanges() {
    return this.userSubject.asObservable();
  }

  public addUser(data: any): void {
    this.user = data;
    this.userSubject.next(data);
  }

  public removeUser(): void {
    this.user = null;
    this.userSubject.next(null);
  }

  public isLoggednIn(): boolean {
    return this.user != null;
  }

  public user: any = null;
}
