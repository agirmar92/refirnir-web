import { UserProfile } from './user-profile';
import { EventComment } from './event-comment';
import { SignUp } from './sign-up';

export class Event {
    eventId?: string;
    creator: string;
    dateOfEvent: string;
    createdAt: string;
    maxPlayers: number;

    name?: string;
    signedUp?: Array<any> = [];
    comments?: Array<any> = [];

    creatorDetails?: UserProfile;
    signedUpDetails?: Array<SignUp> = [];
    commentsDetails?: Array<EventComment> = [];

    constructor(creator, dateOfEvent, createdAt, maxPlayers) {
        this.creator = creator;
        this.dateOfEvent = dateOfEvent;
        this.createdAt = createdAt;
        this.maxPlayers = maxPlayers;
    }
}
