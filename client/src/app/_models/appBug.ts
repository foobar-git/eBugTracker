import { BugImage } from "./bugImage";

export interface AppBug {
    id: number;
    name: string;
    filedByUser: string;
    imageLocation: string;
    dateCreated: Date;
    dateResolved: Date;
    edited: boolean;
    description: string;
    isResolved: boolean;
    isActive: boolean;
    images_?: any;
    bugImages: BugImage[];
    comments: any[];
    projectId: number;
}
