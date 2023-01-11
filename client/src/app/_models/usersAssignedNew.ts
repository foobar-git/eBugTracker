
export interface UsersAssignedNew {
    //id: number;       // ID is ommited here so EF will autoincrement new ID
    username: string;
    userId: number;
    userType: string;
    projectId: number;
}
