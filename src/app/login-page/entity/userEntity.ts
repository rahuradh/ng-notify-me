export class UserEntity {
    constructor(
        public userId: string,
        public userName: string,
        public password: string,
        public role: string,
        public createdDate: string,
        public updatedDate: string
    ) { }
}