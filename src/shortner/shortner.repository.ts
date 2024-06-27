import { Injectable } from '@nestjs/common';
import { Shortner } from './models/shortner.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UrlShortner } from './dto/url-shortner.dto';
import { v4 } from 'uuid';
@Injectable()
export class ShortnerRepository {
  constructor(
    @InjectRepository(Shortner)
    private shortnerRepository: Repository<Shortner>,
  ) {}
  async insert(userId: string, data: UrlShortner) {
    try {
      const save = await this.shortnerRepository.insert({
        id: v4(),
        user: { id: userId },
        originalUrl: data.originalUrl,
        shortenedUrl: data.shortenedUrl,
      });
      return save;
    } catch (error) {
      console.log(error);
    }
  }
  async findUrl(data: UrlShortner) {
    const findOne = await this.shortnerRepository.findOne({
      where: {
        originalUrl: data.originalUrl,
      },
    });
    return findOne;
  }

  async get(url: string) {
    const originalUrl = await this.shortnerRepository.findOne({
      where: { shortenedUrl: url },
    });
    await this.shortnerRepository.save({
      id: (await originalUrl).id,
      clicks: originalUrl.clicks + 1,
    });
    return originalUrl;
  }
}
