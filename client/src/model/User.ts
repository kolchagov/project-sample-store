class User {
    public email: string;
    public username?: string;
    public password?: string;
    public _id?: string;
    public accessToken?: string;
    public address?: string;
    public state?: string;
    public city?: string;
    public zip?: string;
    public subscribed?: boolean;

    constructor(email: string = '', password?: string, _id?: string, accessToken?: string) {
        this.email = email;
        this.password = password;
        this._id = _id;
        this.accessToken = accessToken;
    }
}

export default User;