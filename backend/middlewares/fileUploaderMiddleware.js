const multer = require('multer');
const path = require('path');

const fileUploaderMiddleware = (fileType) => {

    var directory = `uploads/`;

    switch (fileType) {
        case "profileImage":
            directory = directory + `profileImages`;
            break;
        case "certificates":
            directory = directory + `certificates`;
            break;
        case "reports":
            directory = directory + `reports`;
            break;
        default:
            break;
    }


    return (req, res, next) => {

        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, directory);
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now();
                const originalName = file.originalname;
                const fileExtension = path.extname(originalName);
                const filename = uniqueSuffix + '-' + req.user._id + fileExtension;
                cb(null, filename);
            }
        });

        const upload = multer({ storage });

        console.log(directory + " " + req.user._id);

        upload.single('file')(req, res, (err) => {
            if (err) {
                console.log("err in mw : " + err);
                return res.status(400).json({ success: false, message: 'File upload failed' });
            }

            if (!req.file) {
                return res.status(400).json({ success: false, message: 'No file uploaded!!' });
            }

            const fileUrl = `http://localhost:8080/${directory}/${req.file.filename}`;
            req.fileUrl = fileUrl;
            next();
        });
    };


};

module.exports = fileUploaderMiddleware;
