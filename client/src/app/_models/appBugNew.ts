import { BugImage } from "./bugImage";

export interface AppBugNew {
    //id: number;       // ID is ommited here so EF will autoincrement new ID
    name: string;
    filedByUser: string;
    imageLocation?: string;
    dateCreated: Date;
    dateResolved: Date;
    edited: boolean;
    description: string | undefined;
    isResolved: boolean;
    isActive: boolean;
    images_?: any;
    bugImages?: BugImage[];
    comments?: any[];
    projectId: number;
}
