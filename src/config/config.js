import { config } from "dotenv";

config();

const { PORT } = process.env;

export const _config = {PORT}