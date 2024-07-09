import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
  secret: 'test sercet key for jwt token.',
};

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
