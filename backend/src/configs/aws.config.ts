import * as AWS from 'aws-sdk';
import { S3Client } from '@aws-sdk/client-s3';

// Configuración general
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
  }
});

// Exportar servicios
export const s3 = new AWS.S3();
export const sns = new AWS.SNS();
export { s3Client };
