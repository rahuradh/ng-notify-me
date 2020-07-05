export class EventEntity {
    constructor(
        public eventId: string,
        public userName: string,
        public eventName: string,
        public eventType: string,
        public eventDate: string,
        public notificationDays: number,
        public status: boolean,
        public createdDate: string
    ) { }
}