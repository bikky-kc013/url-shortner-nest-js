import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  Param,
  Res,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { ShortnerService } from './shortner.service';
import { UrlShortner } from './dto/url-shortner.dto';
import { JwtAuthGuard } from '../authentication/guards/jwt-auth.guard';
import { RolesGuard } from '../authentication/guards/roles-auth.guard';
import { Roles } from '../authentication/decorators/roles.decorators';

@Controller('api/v1/shortner')
export class ShortnerController {
  constructor(private readonly shortnerService: ShortnerService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @Post()
  async shortner(@Request() req, @Body() data: UrlShortner) {
    const userId = req.user.id;
    const datas = await this.shortnerService.insert(userId, data);
    return {
      status: 'Success',
      url: datas,
      message: 'Successfully Shortened the url',
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('user')
  @Get(':url')
  async getShortUrl(@Param('url') url: string, @Res() res: Response) {
    const shortnedUrl = await this.shortnerService.get(url);
    if (!shortnedUrl) {
      throw new HttpException(
        {
          status: 'Fail',
          message: 'Invalid Url',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return res.redirect(shortnedUrl.originalUrl);
  }
}
