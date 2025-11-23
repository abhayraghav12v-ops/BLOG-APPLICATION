
import multer from 'multer'
import path from 'path'
import fs from 'fs'

const uploadDir = path.join(process.cwd(), 'uploads')

try {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }
} catch (err) {
  console.error('Could not ensure upload directory exists:', err.message)
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

function fileFilter(req, file, cb) {
  const allowedFiles = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp']

  if (!allowedFiles.includes(file.mimetype)) {
    return cb(new Error('Only images are allowed'), false)
  }

  cb(null, true)
}

const upload = multer({ storage, fileFilter })

export default upload

