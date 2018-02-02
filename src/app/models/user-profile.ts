export class UserProfile {
    name: string;
    imageUrl: string;
    uid: string;

    constructor(uid, name, imageUrl) {
        this.uid = uid;
        this.name = name;
        this.imageUrl = imageUrl;
    }
}
