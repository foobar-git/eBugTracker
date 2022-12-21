
export interface AppBug {
    id: number;
    name: string;
    filedByUser: string;
    imageURL: string;
    bugImage1: string;
    bugImage2: string;
    bugImage3: string;
    bugImage4: string;
    bugImage5: string;
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
