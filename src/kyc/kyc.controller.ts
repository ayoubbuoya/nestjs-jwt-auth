import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { KycService } from './kyc.service';
import { Public } from 'src/auth/constants';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
} from '@nestjs/swagger';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { KycAddDto } from './dto/kyc.dto';

const storage = diskStorage({
  destination: './uploads/kyc',
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname.split('.')[0] +
        '-' +
        Date.now() +
        '.' +
        file.originalname.split('.')[1],
    );
  },
});

@Controller('kyc')
export class KycController {
  constructor(private kycService: KycService) {}

  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'frontCin', maxCount: 1 },
        {
          name: 'backCin',
          maxCount: 1,
        },
      ],
      { storage },
    ),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload KYC CIN files',
    required: true,
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        frontCin: {
          type: 'string',
          format: 'binary',
        },
        backCin: {
          type: 'string',
          format: 'binary',
        },
        name: {
          type: 'string',
        },
        cin: {
          type: 'number',
        },
        selfieImage: {
          type: 'string',
        },
      },
    },
  })
  @ApiOperation({ summary: 'Upload files' })
  @Post('add')
  async addKyc(
    @Request() req,
    @Body() body: KycAddDto,
    @UploadedFiles()
    files: {
      frontCin?: Express.Multer.File;
      backCin?: Express.Multer.File;
    },
  ) {
    console.log('Files from controller : ', files);
    if (!files.frontCin || !files.backCin) {
      throw new BadRequestException(
        'Both frontCin and backCin files must be uploaded.',
      );
    }

    const frontCin = files.frontCin[0];
    const backCin = files.backCin[0];
    const user = req.user;

    console.log('User : ', user);

    await this.kycService.addNewKyc([frontCin, backCin], body);

    return 'success';
  }
}
