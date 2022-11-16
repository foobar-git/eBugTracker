
export interface CommentNew {
    //id: number;       // ID is ommited here so EF will autoincrement new ID
    dateCreated: Date;
    postedByUser: string;
    content: string | undefined;
    appUserId: number;
    bugId: number;
}
