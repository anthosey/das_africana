export class AuthUser {
    constructor(public token: string,
                public tokenExpiryDate: Date,
                public userId: string,
                public email: string,
                public mobile: string,
                public firstName: string,
                public lastName: string,
                public contactAddress: string) {}

}