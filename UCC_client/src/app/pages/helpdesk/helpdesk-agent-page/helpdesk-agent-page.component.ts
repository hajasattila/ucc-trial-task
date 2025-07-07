import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../../services/chat-services/chat.service';
import { ChatMessage, UpdateChatMessageDto } from '../../../interfaces/chat.message';
import { UserService } from '../../../services/user-services/user.service';

@Component({
  selector: 'app-helpdesk-agent-page',
  templateUrl: './helpdesk-agent-page.component.html',
  styleUrls: ['./helpdesk-agent-page.component.css']
})
export class HelpdeskAgentPageComponent implements OnInit {
  messages: ChatMessage[] = [];
  replyMap: { [id: number]: string } = {};

  constructor(private chatService: ChatService, private userService: UserService) {}

  ngOnInit(): void {
    this.chatService.getMessagesForAgents().subscribe((res) => {
      this.messages = res.data;
    });
  }

  sendReply(messageId: number) {
    const reply = this.replyMap[messageId];
    if (!reply?.trim()) return;

    const dto: UpdateChatMessageDto = {
      status: 'answered',
      assignedAgent: this.userService.user?.id
    };

    // válasz létrehozása új chat-message-ként
    this.chatService.sendMessage({
      message: reply.trim(),
      fromUser: this.userService.user?.id
    }).subscribe(() => {
      this.replyMap[messageId] = '';
    });

    // válaszolt üzenet státuszának frissítése
    this.chatService.updateMessage(messageId, dto).subscribe();
  }
}
