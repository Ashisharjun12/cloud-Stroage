
import fs from "fs";
import {
  sendFileToTelegram,
  getTelegramFileLink,
} from "../services/telegramService.js";

export const uploadSingleFile = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No photo uploaded." });
    }

    const response = await sendFileToTelegram(file.path, file.filename);
    const fileId = response.result.sticker?.file_id || response.result.document?.file_id;

    const fileLink = await getTelegramFileLink(fileId);

    fs.unlinkSync(file.path);

    res.status(200).json({
      message: "File uploaded successfully",
      fileLink,
      response,
    });
    console.log("respone", response, "filelink", fileLink);
  } catch (error) {
    res.status(500).json({
      message: "An error occurred.",
      error: error.response ? error.response.data : error.message,
    });
  }
};


export const uploadMultipleFiles = async (req, res) => {
    try {
      const files = req.files;
      if (!files || files.length === 0) {
        return res.status(400).json({ message: "No files uploaded." });
      }
  
      const responses = await Promise.all(
        files.map(async (file) => {
          const response = await sendFileToTelegram(
            file.path,
            file.originalname
          );
          const fileId = response.result.sticker?.file_id || response.result.document?.file_id;
  
          if (!fileId) {
            return res.status(400).json({ message: "file id not found." });
          }
  
          const fileLink = await getTelegramFileLink(fileId);
  
          fs.unlinkSync(file.path);
          return { fileLink, response };
        })
      );
  
      res.status(200).json({
        message: "file uploaded successfully",
        files: responses,
        numberOfFiles: files.length,
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred.",
        error: error.response?.data || error.message,
      });
    }
  };

// export const getFile = async (req, res) => {
//     const { fileName } = req.params;
//     try {
//         const response = await getTelegramFileLink(fileName);  // This might need to be adjusted based on how you store file references
//         res.status(200).json({
//             message: 'File retrieved successfully',
//             fileLink: response,
//         });
//     } catch (error) {
//         res.status(500).json({ 
//             message: 'An error occurred.', 
//             error: error.response ? error.response.data : error.message 
//         });
//     }
// };