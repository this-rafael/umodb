export class GlobalEnv {
  // eslint-disable-next-line no-use-before-define
  public static instance: GlobalEnv = new GlobalEnv()

  public static build(): void {
    GlobalEnv.instance = new GlobalEnv()
  }

  public readonly useKafka = true

  public readonly host: string = 'localhost'

  public readonly port: string = '9094'
}
