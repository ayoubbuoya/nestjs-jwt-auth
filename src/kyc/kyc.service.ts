import { Injectable } from '@nestjs/common';
import { KycAddDto } from './dto/kyc.dto';

@Injectable()
export class KycService {
  constructor() {}

  async addNewKyc(kycImages: Express.Multer.File[], kycData: KycAddDto) {
    console.log('Images : ', kycImages);
    console.log('Data : ', kycData);
    return true;
  }
}
