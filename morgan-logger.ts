import morgan from 'morgan';
import fs from 'fs';

// Tạo một luồng ghi log
export const accessLogStream = fs.createWriteStream('access.log', { flags: 'a' });

