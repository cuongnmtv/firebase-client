export class Message {

    constructor(
        public id: string,
        public notifyCode: string,
        public topic: string,
        public group: string,
        public groupKey: string,
        public title: string,
        public body: string,
        public data: string,
        public callbackUrl: string,
        public userId: string,
        public seen: boolean
    ) { }
}