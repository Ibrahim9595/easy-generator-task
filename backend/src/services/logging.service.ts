import { Injectable, Logger, LoggerService } from '@nestjs/common';

@Injectable()
export class LoggingService implements LoggerService {
  private logger = new Logger();

  log(message: string) {
    this.logger.log(message);
  }

  error(message: string, stack?: string) {
    this.logger.error(message, stack);
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }

  fatal(message: string) {
    this.logger.fatal(message);
  }
}
