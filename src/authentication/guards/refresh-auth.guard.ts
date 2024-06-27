import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class refreshAuthGuard extends AuthGuard('jwt-refresh') {}
