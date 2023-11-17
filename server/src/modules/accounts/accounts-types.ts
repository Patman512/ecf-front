export interface InsertUserParams {
    firstName: string;
    lastName: string;
    email: string;
    pwdHash: string;
    accountType: number;
}

export interface UserAccountInfo extends InsertUserParams {
    id: number;
}
