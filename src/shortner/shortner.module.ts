import { Module } from '@nestjs/common';
import { ShortnerController } from './shortner.controller';
import { ShortnerService } from './shortner.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shortner } from './models/shortner.entity';
import { ShortnerRepository } from './shortner.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Shortner])],
  controllers: [ShortnerController],
  providers: [ShortnerService, ShortnerRepository],
})
export class ShortnerModule {}
