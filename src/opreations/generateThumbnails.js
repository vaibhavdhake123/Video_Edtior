import { FFmpegKit } from 'ffmpeg-kit-react-native';
import RNFS from 'react-native-fs';
import { getRealPathFromURI } from 'react-native-get-real-path';

export const generateThumbnails = async (videoPath, interval, duration) => {
  try {
    let resolvedPath = videoPath;

    
    if (videoPath.startsWith('content://')) {
      resolvedPath = await getRealPathFromURI(videoPath);
      console.log('Resolved path:', resolvedPath);
    }

    const outputDir = `${RNFS.CachesDirectoryPath}/thumbnails`;

    
    if (await RNFS.exists(outputDir)) {
      await RNFS.unlink(outputDir);
    }
    await RNFS.mkdir(outputDir);

    const generatedThumbnails = [];
    for (let i = 0; i < duration; i += interval) {
      const outputFilePath = `${outputDir}/thumb_${i}.jpg`;
      const command = `-i "${resolvedPath}" -ss ${i} -frames:v 1 -q:v 2 "${outputFilePath}"`;

      const session = await FFmpegKit.execute(command);
      const returnCode = await session.getReturnCode();

      if (returnCode.isValueSuccess()) {
        console.log(`Thumbnail generated successfully: ${outputFilePath}`);
        generatedThumbnails.push(outputFilePath);
      } else {
        const logs = await session.getLogsAsString();
        console.error(`Failed to generate thumbnail at ${i}s. Logs:`, logs);
      }
    }

    return generatedThumbnails;
  } catch (error) {
    console.error('Error in generateThumbnails:', error);
    throw error;
  }
};
