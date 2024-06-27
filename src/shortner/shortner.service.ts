import { Injectable } from '@nestjs/common';
import { ShortnerRepository } from './shortner.repository';
import { UrlShortner } from './dto/url-shortner.dto';
import { v4 } from 'uuid';
@Injectable()
export class ShortnerService {
  constructor(private shortnerRepository: ShortnerRepository) {}

  async insert(userId: string, data: UrlShortner) {
    const findUrl = await this.shortnerRepository.findUrl(data);
    if (findUrl) {
      return findUrl.shortenedUrl;
    }
    const uniqueId = v4().split('-')[0];
    data.shortenedUrl = uniqueId;
    await this.shortnerRepository.insert(userId, data);
    return uniqueId;
  }

  async get(url: string) {
    const data = await this.shortnerRepository.get(url);
    if (!data) {
      return null;
    }
    return data;
  }
}
