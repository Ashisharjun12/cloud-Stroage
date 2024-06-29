import fs from "fs";
import {
  sendVideoToTelegram,
  getTelegramVideoLink,
} from "../services/telegramService.js";
import { StatusCodes } from "http-status-codes";

export const uploadSingleVideo = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res
        .status(StatusCodes.INSUFFICIENT_STORAGE)
        .json({ message: "No video uploaded." });
    }

    const response = await sendVideoToTelegram(file.path, file.filename);
    const videoId = response.result.video?.file_id;

    const fileLink = await getTelegramVideoLink(videoId);

    fs.unlinkSync(file.path);

    res.status(StatusCodes.CREATED).json({
      message: "Video uploaded successfully",
      fileLink,
      response,
    });
    console.log("response", response, "filelink", fileLink);
  } catch (error) {
    res.status(StatusCodes.BAD_GATEWAY).json({
      message: "An error occurred.",
      error: error.response ? error.response.data : error.message,
    });
  }
};

export const uploadMultipleVideos = async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No videos uploaded." });
    }

    const responses = await Promise.all(
      files.map(async (file) => {
        const response = await sendVideoToTelegram(file.path, file.originalname);
        const videoId = response.result.video.file_id;

        if (!videoId) {
          return res.status(400).json({ message: "Video ID not found." });
        }

        const videoLink = await getTelegramVideoLink(videoId);

        fs.unlinkSync(file.path);
        return { videoLink, response };
      })
    );

    res.status(200).json({
      message: "Videos uploaded successfully",
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