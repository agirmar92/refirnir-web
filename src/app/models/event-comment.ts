import { UserProfile } from './user-profile';

export class EventComment {
    author: UserProfile;
    text: string;
    createdAt: DateTimeFormat;

    constructor(author, text, createdAt) {
        this.author = author;
        this.text = text;
        this.createdAt = createdAt;
    }
}
