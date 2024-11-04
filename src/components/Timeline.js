import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, View, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { FFmpegKit } from 'ffmpeg-kit-react-native';
import RNFS from 'react-native-fs';


const Timeline = ({ videoUri, currentTime, onThumbnailPress, scrollViewRef, duration, setVideoTime }) => {
  const [thumbnails, setThumbnails] = useState([]);
  const [loading, setLoading] = useState(true);
  const thumbnailCount = 10;

  useEffect(() => {
    generateThumbnails();
  }, [videoUri]);

  useEffect(() => {
    const thumbnailWidth = 60; 
    const position = (currentTime / duration) * thumbnailWidth * thumbnails.length;
    scrollViewRef.current?.scrollTo({ x: position, animated: true });
  }, [currentTime]);

  const generateThumbnails = async () => {
    setLoading(true);

    const newThumbnails = [];

    for (let i = 0; i < thumbnailCount; i++) {
      const time = (i / thumbnailCount) * duration; // Time for each thumbnail
      const outputFilePath = `${RNFS.DocumentDirectoryPath}/thumbnail_${i}.jpg`; // Define output path

      // Generate the thumbnail using ffmpeg
      await FFmpegKit.execute(`-i ${videoUri} -ss ${time} -vframes 1 ${outputFilePath}`);
      newThumbnails.push(outputFilePath); // Add path to array
    }

    setThumbnails(newThumbnails);
    setLoading(false);
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.timelineContainer}
    >
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        thumbnails.map((thumbnail, index) => {
          const time = (index / thumbnails.length) * duration;
          const isCurrentTime = Math.abs(currentTime - time) < (duration / thumbnailCount);
          
          return (
            <TouchableOpacity key={index} onPress={() => setVideoTime(time)}>
              <Image source={{ uri: thumbnail }} style={[styles.thumbnail, isCurrentTime && styles.currentThumbnail]} />
            </TouchableOpacity>
          );
        })
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  timelineContainer: { padding: 10 },
  thumbnail: { width: 75, height: 75, marginRight: 5 },
  currentThumbnail: { borderColor: 'blue', borderWidth: 2 },
});

export default Timeline;
