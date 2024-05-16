import fileUploader from "express-fileupload";
import { join } from "path";
import fs from "fs";
import async from "async";
export const multiFileUploader = async (req, res, next) => {
    const uploadFolder = "./public/uploads/";
    let fileName;
    try {
      fileUploader()(req, res, async (err) => {
        if (req.files) {
          let files = Array.isArray(req.files.files)
            ? req.files.files
            : [req.files.files];
          await Promise.all(
            files.map(async (file) => {
              if (file && file.name) {
                const filePath = join(process.cwd(), uploadFolder, file.name);
                console.log("Saving file to:", filePath);
                if (!fs.existsSync(uploadFolder)) {
                  fs.mkdirSync(uploadFolder, { recursive: true });
                }
  
                await file.mv(filePath);
              } else {
                console.error("Invalid file object:", file);
              }
            })
          );
        }
        next();
      });
    } catch (err) {
      res.status(500).send(err);
    }
  };
  