// File Controller
import { sendFileToTelegram, getTelegramFileLink } from '../services/telegramService.js';

export const uploadFile = async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ message: 'No file uploaded.' });
        }

        const response = await sendFileToTelegram(file.path, file.filename);
        const fileLink = await getTelegramFileLink(response.result.sticker.thumbnail.file_id);

        res.status(200).json({
            message: 'File uploaded successfully',
            fileLink,
            response
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'An error occurred.', 
            error: error.response ? error.response.data : error.message 
        });
    }
};

export const getFile = async (req, res) => {
    const { fileName } = req.params;
    try {
        const response = await getTelegramFileLink(fileName);  // This might need to be adjusted based on how you store file references
        res.status(200).json({
            message: 'File retrieved successfully',
            fileLink: response,
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'An error occurred.', 
            error: error.response ? error.response.data : error.message 
        });
    }
};