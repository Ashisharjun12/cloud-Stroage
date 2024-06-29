import crypto from 'crypto';
import { _config } from '../config/config.js';

const { ENCRYPTION_SECRET} = _config

const encrypt = (text) => {
    const cipher = crypto.createCipher('aes-256-ctr', ENCRYPTION_SECRET);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};


const decrypt = (text) => {
    const decipher = crypto.createDecipher('aes-256-ctr', ENCRYPTION_SECRET);
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};


export {encrypt ,decrypt}