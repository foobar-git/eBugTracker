
export interface AppBugNew {
    //id: number;       // ID is ommited here so EF will autoincrement new ID
    name: string;
    filedByUser: string;
    imageURL1?: string;
    imageURL2?: string;
    bugImage1?: string;
    bugImage2?: string;
    dateCreated: Date;
    dateResolved: Date;
    edited: boolean;
    description: string | undefined;
    isResolved: boolean;
    isActive: boolean;
    images_?: any;
    comments?: any[];
    projectId: number;
}
