export abstract class Bootstrapper {
  constructor() {}
  abstract run(): Promise<void>
}
