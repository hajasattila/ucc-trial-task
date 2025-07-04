import { User } from './user.model';

export interface ChatMessage {
  id: number;
  message: string;
  createdAt: string;
  updatedAt?: string;
  fromUser?: User;
  assignedAgent?: User;
  status: 'pending' | 'answered';
}

export interface CreateChatMessageDto {
  message: string;
  fromUser: number;
}

export interface UpdateChatMessageDto {
  status?: 'pending' | 'answered';
  assignedAgent?: number;
}
