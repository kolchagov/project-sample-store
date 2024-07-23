class User {
    email: string;
    password?: string;
    _id?: string;
    accessToken?: string;

    constructor(email: string = '', password?: string, _id?: string, accessToken?: string) {
        this.email = email;
        this.password = password;
        this._id = _id;
        this.accessToken = accessToken;
    }
}

export default User;