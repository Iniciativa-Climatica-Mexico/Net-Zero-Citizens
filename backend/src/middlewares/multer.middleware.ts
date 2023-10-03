import multer from 'multer'

// Create a multer instance with destination config

const upload = multer()

export default upload.single('file')
