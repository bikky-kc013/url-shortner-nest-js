import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { datasource } from './config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  private readonly logger = new Logger(TypeOrmConfigService.name);

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    try {
      return datasource;
    } catch (error) {
      this.logger.error('Error creating TypeORM options', error);
      throw new Error('Failed to create TypeORM options');
    }
  }
}
