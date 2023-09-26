import * as AWS from 'aws-sdk';

// Configuración general
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

// Exportar servicios
export const s3 = new AWS.S3();
export const sns = new AWS.SNS();