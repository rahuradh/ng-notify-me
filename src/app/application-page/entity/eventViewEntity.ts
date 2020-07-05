export class EventViewEntity {
    constructor(
        public eventId: string,
        public userName: string,
        public eventName: string,
        public eventType: string,
        public eventDate: string,
        public notificationDays: string,
        public status: string,
        public createdDate: string
    ) { }
}