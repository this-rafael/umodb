/**
 * This abstraction represents a strategy to calculate the max waiting time of a mutation result
 */
export abstract class CalculateMaxWaitingTimeProtocol {
  /**
   * @description This method describe a common contract to calculate the max waiting time of a mutation result
   * @param date - The date to calculate the max waiting time
   */
  abstract calculate(date: Date): Promise<Date>
}
