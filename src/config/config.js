import { config } from "dotenv";

config();

const { PORT, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID ,ENCRYPTION_SECRET} = process.env;

export const _config = { PORT, TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID ,ENCRYPTION_SECRET};
