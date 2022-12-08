import { Comment } from "./comment";
import { UserImage } from "../_models/userImage";

export interface AppUser {
    id: number;
    username: string;
    userImage: string;
    created: number;
    dateCreated: Date;
    lastActive: Date;
    userType: string;
    name: string;
    surname: string;
    team: string;
    description: string;
    comments: Comment[];
}
