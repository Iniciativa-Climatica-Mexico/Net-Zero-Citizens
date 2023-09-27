// import multer from 'multer';
// import multerS3 from 'multer-s3';
// import { s3 } from '../configs/aws.config';

// const upload = multer({
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.AWS_BUCKET_NAME || '',
//     metadata: (req, file, cb) => {
//       cb(null, { fieldName: file.fieldname });
//     },
//     key: (req, file, cb) => {
//       const { companyId, fileDescription } = req.body;
//       cb(null, `${companyId}/${file.originalname}/${fileDescription}`);
//     },
//     acl: 'public-read'
//   })
// });

// export { upload };





// import multer, { StorageEngine, FileFilterCallback } from 'multer'
// import path from 'path'
// import fs from 'fs/promises'
// import { Request } from 'express'

// // Verificar y crear el directorio uploads si no existe
// const uploadDir = path.join(__dirname, '../uploads')
// fs.access(uploadDir).catch(() => fs.mkdir(uploadDir, { recursive: true }))

// const storage: StorageEngine = multer.diskStorage({
//   destination: (
//     req: Request,
//     file: Express.Multer.File,
//     cb: (error: Error | null, destination: string) => void
//   ) => {
//     cb(null, 'uploads/')
//   },
//   filename: (
//     req: Request,
//     file: Express.Multer.File,
//     cb: (error: Error | null, filename: string) => void
//   ) => {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
//     cb(
//       null,
//       file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)
//     )
//   },
// })

// const fileFilter = (
//   req: Request,
//   file: Express.Multer.File,
//   cb: FileFilterCallback
// ) => {
//   // Puedes añadir lógica aquí para filtrar tipos de archivos si es necesario
//   cb(null, true) // Aceptar el archivo
// }

// export const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
// })
