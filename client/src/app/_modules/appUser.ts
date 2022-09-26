import { Comment } from "./comment";
import { UserImage } from "./userImage";

export interface AppUser {
    id: number;
    username: string;
    imageUrl: string;
    created: number;
    dateCreated: Date;
    lastActive: Date;
    userType: string;
    name: string;
    surname: string;
    team: string;
    description: string;
    userImage: UserImage[];
    comments: Comment[];
}
