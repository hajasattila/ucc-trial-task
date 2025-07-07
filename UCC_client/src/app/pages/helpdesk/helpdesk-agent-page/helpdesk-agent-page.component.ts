import {Component, OnInit} from '@angular/core';
import {ChatService} from '../../../services/chat-services/chat.service';
import {ChatMessage, UpdateChatMessageDto} from '../../../interfaces/chat.message';
import {UserService} from '../../../services/user-services/user.service';

@Component({
  selector: 'app-helpdesk-agent-page',
  templateUrl: './helpdesk-agent-page.component.html',
  styleUrls: ['./helpdesk-agent-page.component.css']
})
export class HelpdeskAgentPageComponent implements OnInit {
  messages: ChatMessage[] = [];
  replyMap: { [id: number]: string } = {};
  isAgent = false;

  constructor(
    private chatService: ChatService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    const user = this.userService.getCurrentUser();
    this.isAgent = !!user?.isAgent;

    if (this.isAgent) {
      this.chatService.getUserMessages().subscribe((res) => {
        this.messages = res.data.filter((msg: ChatMessage) => msg.isHumanRequested === true);
      });
    } else {
      this.messages = []
    }
  }

  sendReply(messageId: number) {
    const reply = this.replyMap[messageId];
    if (!reply?.trim()) return;

    const originalMessage = this.messages.find(msg => msg.id === messageId);
    const toUserId = originalMessage?.users_permissions_user?.id;

    const dto: UpdateChatMessageDto = {
      status: 'answered',
      assignedAgent: this.userService.user?.id
    };

    this.chatService.sendMessage({
      message: reply.trim(),
      fromUser: this.userService.user?.id,
      toUser: toUserId
    }).subscribe(() => {
      this.replyMap[messageId] = '';
    });

    this.chatService.updateMessage(messageId, dto).subscribe();
  }
}
