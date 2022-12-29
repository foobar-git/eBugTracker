
export interface AppBug {
    id: number;
    name: string;
    filedByUser: string;
    imageURL1: string;
    imageURL2: string;
    bugImage1: string;
    bugImage2: string;
    dateCreated: Date;
    dateResolved: Date;
    edited: boolean;
    description: string;
    isResolved: boolean;
    isActive: boolean;
    images_?: any;
    comments: any[];
    projectId: number;
}
