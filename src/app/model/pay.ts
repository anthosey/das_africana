export class Pay {
    constructor(
        public email: string,
        public name: string,
        public paymentMode: string,
        public paymentDate: Date,
        public paymentYear: number,
        public amount: string

        ) {}
}
