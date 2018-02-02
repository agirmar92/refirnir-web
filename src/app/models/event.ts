import { UserProfile } from './user-profile';
import { EventComment } from './event-comment';
import { SignUp } from './sign-up';

export class Event {
    creator: string;
    dateOfEvent: string;
    createdAt: string;
    maxPlayers: number;

    eventId?: string;
    name?: string;
    signedUp?: Array<any> = [];
    comments?: Array<any> = [];

    creatorDetails?: UserProfile;
    signedUpDetails?: Array<SignUp> = [];
    commentsDetails?: Array<EventComment> = [];
}
