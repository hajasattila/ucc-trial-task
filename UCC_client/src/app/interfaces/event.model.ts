import {User} from './user.model';

export interface Event {
  id: number;
  title: string;
  occurrence: string;
  description?: string;
  user?: User;
}

export interface CreateEventDto {
  title: string;
  occurrence: string;
  description?: string;
  user: number;
}

export interface UpdateEventDto {
  description?: string;
}
