export class User{
    constructor(user_id, type, dept_id, email, password, first, last){
        this.user_id = user_id;
        this.type = type;
        this.dept_id = dept_id;
        this.email = email;
        this.password = password;
        this.first = first;
        this.last = last;
    }
}