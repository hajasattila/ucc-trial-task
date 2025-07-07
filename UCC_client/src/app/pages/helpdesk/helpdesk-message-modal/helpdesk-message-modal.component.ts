import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { ChatService } from '../../../services/chat-services/chat.service';
import { UserService } from '../../../services/user-services/user.service';
import { ChatMessage, CreateChatMessageDto } from "../../../interfaces/chat.message";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-helpdesk-message-modal',
  templateUrl: './helpdesk-message-modal.component.html',
  styleUrls: ['./helpdesk-message-modal.component.css']
})
export class HelpdeskMessageModalComponent implements OnInit, OnDestroy, AfterViewInit {
  isOpen = false;
  newMessage = '';
  messages: ChatMessage[] = [];
  isLoggedIn = false;
  private userSub!: Subscription;

  @ViewChild('scrollAnchor') private scrollAnchor!: ElementRef;
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  suggestedQuestions: string[] = [
    'Mikor vagytok nyitva?',
    'Mennyibe kerül a szolgáltatás?',
    'Nem működik valami!',
    'Szeretnék emberrel beszélni'
  ];

  constructor(private chatService: ChatService, protected userService: UserService) {}

  ngOnInit() {
    this.userSub = this.userService.userChanges.subscribe(user => {
      this.isLoggedIn = !!user;
      if (this.isLoggedIn) {
        this.loadMessages();
      } else {
        this.messages = [];
        this.isOpen = false;
      }
    });
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  ngOnDestroy() {
    if (this.userSub) this.userSub.unsubscribe();
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    setTimeout(() => this.scrollToBottom(), 100);
  }

  loadMessages() {
    this.chatService.getUserMessages().subscribe((res) => {
      this.messages = res.data;
      setTimeout(() => this.scrollToBottom(), 100);
    });
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;

    const dto: CreateChatMessageDto = {
      message: this.newMessage.trim(),
      fromUser: this.userService.user?.id
    };

    this.chatService.sendMessage(dto).subscribe(() => {
      this.newMessage = '';
      this.loadMessages();
    });
  }

  selectSuggested(question: string) {
    this.newMessage = question;
    this.sendMessage();
  }

  clearChat() {
    if (!this.userService.user?.id) return;

    this.chatService.deleteAllMessages(this.userService.user.id).subscribe(() => {
      this.messages = [];
      this.scrollToBottom();
    });
  }

  private scrollToBottom(): void {
    try {
      this.scrollAnchor?.nativeElement?.scrollIntoView({ behavior: 'smooth' });
    } catch (err) {
      console.error(err);
    }
  }
}
