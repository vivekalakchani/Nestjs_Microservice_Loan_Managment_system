export class UserCreatedEvent {
  constructor(
    public readonly loanId: string,
    public readonly amount: number,
    public readonly duration: number,
    public readonly trackingNumber: string,
  ) {}
}
