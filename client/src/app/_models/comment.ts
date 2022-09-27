
export interface Comment {
    id: number;
    dateCreated: Date;
    postedByUser: string;
    content: string;
    appUserId: number;
    bugId: number;
}
