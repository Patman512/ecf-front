export interface AddUserParams {
    firstName: string;
    lastName: string;
    email: string;
    pwdHash: string;
    accountType: number;
}

export interface AddUserFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    accountType: number;
}
