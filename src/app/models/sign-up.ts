import { UserProfile } from './user-profile';

export class SignUp {
    player: UserProfile;
    active: boolean;

    constructor(player, active) {
        this.player = player;
        this.active = active;
    }
}
