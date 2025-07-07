import { User } from './user.model';

export interface ChatMessage {
  id: number;
  message: string;
  createdAt: string;
  updatedAt?: string;
  fromUser?: User;
  assignedAgent?: User;
  status: 'pending' | 'answered';
  isHumanRequested?: boolean;
  users_permissions_user?: User;
}

export interface CreateChatMessageDto {
  message: string;
  fromUser: number;
}

export interface UpdateChatMessageDto {
  status?: 'pending' | 'answered';
  assignedAgent?: number;
}
