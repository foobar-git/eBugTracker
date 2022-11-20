
export interface Comment {
    id: number;
    dateCreated: Date;
    postedByUser: string;
    content: string | undefined;
    appUserId: number;
    bugId: number;
    edited: boolean;
}
