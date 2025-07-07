export interface ChatMessage {
  id: number;
  message: string;
  createdAt: string;
  isHumanRequested: boolean;
  isBotMessage?: boolean;
  statusEnum?: 'pending' | 'answered';
  users_permissions_user?: {
    id: number;
    username?: string;
    email?: string;
  };
  toUser?: {
    id: number;
    username?: string;
    email?: string;
  };
}


export interface CreateChatMessageDto {
  message: string;
  fromUser: number;
  toUser?: number;
}


export interface UpdateChatMessageDto {
  status?: 'pending' | 'answered';
  assignedAgent?: number;
}
