import ffmpeg from 'fluent-ffmpeg';


export const compressVideo = async (inputPath, outputPath) => {
    try {
      await new Promise((resolve, reject) => {
        ffmpeg(inputPath)
          .outputOptions('-c:v libx265', '-crf 28')
          .save(outputPath)
          .on('end', resolve)
          .on('error', reject);
      });
    } catch (error) {
      throw new Error(`Error compressing video: ${error.message}`);
    }
  };
  