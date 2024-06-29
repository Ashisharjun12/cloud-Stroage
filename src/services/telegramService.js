import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import { _config } from '../config/config.js';

const { TELEGRAM_BOT_TOKEN } = _config;

export const sendFileToTelegram = async (filePath, fileName) => {
    try {
        const updatesResponse = await axios.get(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getUpdates`
        );

        const latestChat = updatesResponse.data.result[0]?.message?.chat;
        if (!latestChat) {
            throw new Error('No chat found in updates.');
        }
        const chatId = latestChat.id;

        const form = new FormData();
        form.append('chat_id', chatId); 
        form.append('document', fs.createReadStream(filePath), {
            filename: fileName,
        });

        const response = await axios.post(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`,
            form,
            {
                headers: form.getHeaders(),
            }
            
        );
        
        return response.data;
    } catch (error) {
        console.error('Error uploading to Telegram:', error.response?.data || error.message);
        throw error;
    }
};

export const getTelegramFileLink = async (fileId) => {
    try {
        const response = await axios.get(
            `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getFile?file_id=${fileId}`
        );
        const filePath = response.data.result.file_path;
        
        return `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${filePath}`;
    } catch (error) {
        console.error('Error retrieving file link from Telegram:', error.response ? error.response.data : error.message);
        throw error;
    }
};


