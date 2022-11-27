
export interface BugsAssigned {
    id: number;
    name: string;
    filedByUser: string;
    dateCreated: Date;
    dateResolved: Date;
    description: string;
    isResolved: boolean;
    isActive: boolean;
    bugImages?: any;
    comments?: any;
    projectId: number;
}
