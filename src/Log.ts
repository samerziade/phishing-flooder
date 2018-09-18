import { config, LogLevel } from './Config'

const { log } = config.application

export class Log {
  private static log = (lvl: LogLevel, msg: string): void => {
    if (lvl !== LogLevel.OFF && lvl >= log) {
      const map = ['OFF', 'DEBUG', 'INFO', 'ERROR']
      const fn = map[lvl].toLowerCase()

      console[fn](msg)
    }
  }

  public static debug = (msg: string): void => {
    Log.log(LogLevel.DEBUG, msg)
  }

  public static info = (msg: string): void => {
    Log.log(LogLevel.INFO, msg)
  }

  public static error = (msg: string): void => {
    Log.log(LogLevel.ERROR, msg)
  }
}
