export abstract class CalculateMaxWaitingTimeProtocol {
  abstract calculate(date: Date): Promise<Date>
}
