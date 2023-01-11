import { UsersAssigned } from "./usersAssigned";
import { BugsAssigned } from "./bugsAssigned";

export interface AppProject {
    //id: number;       // ID is ommited here so EF will autoincrement new ID
    name: string;
    createdByUser: string;
    dateCreated: Date;
    dateCompleted: Date;
    isComplete: boolean;
    isOnHold: boolean;
    description: string;
    //usersAssigned: UsersAssigned[];
    //bugsAssigned: BugsAssigned[];
}


