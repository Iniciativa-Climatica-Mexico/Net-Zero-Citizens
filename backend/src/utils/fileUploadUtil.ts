import multer from 'multer'

// Create a multer instance with destination config
const storage = multer.diskStorage({})

const upload = multer({ storage: storage })

export default upload // Use this utility function to handle file uploads
