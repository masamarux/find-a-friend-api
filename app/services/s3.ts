import { env } from '@/env';
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";

export class S3Service {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({ 
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY,
        secretAccessKey: env.AWS_SECRET_KEY
      },
      region: env.AWS_REGION
    });
  }

  async storeImage(key: string, image: Buffer) {
    await this.client.send(new PutObjectCommand({
      Bucket: env.AWS_BUCKET,
      Key: key,
      Body: image,
      ContentType: 'image/png'
    }))
  }

  async retrieveImage(key: string) {
    try {
      const file = await this.client.send(new GetObjectCommand({
        Bucket: env.AWS_BUCKET,
        Key: key
      }))
  
      if(!file.Body) {
        throw new Error('File not found');
      }
  
      return file.Body?.transformToString('base64');
    } catch (error: any) {
      if(error.name === 'NoSuchKey') {
        throw new Error('File not found')
      }

      throw error;
    }
  }
}