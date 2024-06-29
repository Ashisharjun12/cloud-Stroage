## telegram stroage api

- `https://api.telegram.org/<Your_Token>/getUpdates` -> check from server.

## telegram fuke type
 - 1. File Types for Upload:
 -   sendDocument: Allows you to send general files (e.g., .pdf, .doc, .zip).
 -   sendPhoto: Sends photos as files (e.g., .jpg, .png).
 -   sendVideo: Sends videos (e.g., .mp4).
 -   sendAudio: Sends audio files (e.g., .mp3).
 -   sendVoice: Sends voice messages (e.g., .ogg).

- 2.  File Types for Retrieval:
-    getFile: Retrieves information about a file on the Telegram servers, including its path.
-    getFileLink: Retrieves a direct URL to download a file from Telegram servers.
-  3. File Types for Deletion:
 -    deleteMessage: Deletes a message, including any files attached to it.