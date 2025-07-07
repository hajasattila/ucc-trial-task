import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {config} from '../../../config';
import {UserService} from '../user-services/user.service';
import {CreateChatMessageDto, UpdateChatMessageDto} from "../../interfaces/chat.message";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private http: HttpClient, private userService: UserService) {
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.userService.token;
    return new HttpHeaders({Authorization: `Bearer ${token}`});
  }

  sendMessage(dto: CreateChatMessageDto): Observable<any> {
    return this.http.post(`${config.STRAPI}/api/chat-messages`, {data: dto}, {headers: this.getAuthHeaders()});
  }

  updateMessage(id: number, dto: UpdateChatMessageDto): Observable<any> {
    return this.http.put(`${config.STRAPI}/api/chat-messages/${id}`, {data: dto}, {headers: this.getAuthHeaders()});
  }

  getUserMessages(): Observable<any> {
    return this.http.get(`${config.STRAPI}/api/chat-messages?populate[0]=users_permissions_user`, {
      headers: this.getAuthHeaders()
    });
  }

  deleteAllMessages(userId: number) {
    return this.http.delete(`${config.STRAPI}/api/chat-messages/delete-all/${userId}`, {
      headers: this.getAuthHeaders()
    });
  }

  getMessagesForAgents(): Observable<any> {
    return this.http.get(`${config.STRAPI}/api/chat-messages/for-agents`, {
      headers: this.getAuthHeaders()
    });
  }



}
