import { Comment } from "./comment";

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
