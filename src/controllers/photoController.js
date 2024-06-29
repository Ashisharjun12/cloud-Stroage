import fs from "fs";
import {
  sendPhotoToTelegram,
  getTelegramPhotoLink,
} from "../services/telegramService.js";
import {StatusCodes} from "http-status-codes"

export const uploadSinglePhoto = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(StatusCodes.INSUFFICIENT_STORAGE).json({ message: "No photo uploaded." });
     
    }

    const response = await sendPhotoToTelegram(file.path, file.filename);
    const photoId = response.result.photo[0]?.file_id;

    const fileLink = await getTelegramPhotoLink(photoId);

    fs.unlinkSync(file.path);

    res.status(StatusCodes.CREATED).json({
      message: "File uploaded successfully",
      fileLink,
      response,
    });
    console.log("respone", response, "filelink", fileLink);
  } catch (error) {
    res.status(StatusCodes.BAD_GATEWAY).json({
      message: "An error occurred.",
      error: error.response ? error.response.data : error.message,
    });
  }
};

export const uploadMultiplePhotos = async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded." });
    }

    const responses = await Promise.all(
      files.map(async (file) => {
        const response = await sendPhotoToTelegram(
          file.path,
          file.originalname
        );
        const photoId = response.result.photo[0]?.file_id;

        if (!photoId) {
          return res.status(400).json({ message: "photo id not found." });
        }

        const photoLink = await getTelegramPhotoLink(photoId);

        fs.unlinkSync(file.path);
        return { photoLink, response };
      })
    );

    res.status(200).json({
      message: "photos uploaded successfully",
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
