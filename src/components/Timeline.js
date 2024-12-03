import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, StyleSheet, ActivityIndicator, Text } from 'react-native';

const Timeline = ({ thumbnails }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (thumbnails && thumbnails.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [thumbnails]);

  const renderThumbnail = ({ item }) => (
    <Image
      source={{ uri: `file://${item}` }}  
      style={styles.thumbnail}
      onError={() => console.log('Error loading image')}
    />
  );
  const handleEndReached = () => {
    console.log('End of list reached');
    
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#FC2EAA" />
      ) : (
        <FlatList
          data={thumbnails}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          renderItem={renderThumbnail}
          contentContainerStyle={styles.flatListContent}
          onEndReached={handleEndReached} 
          onEndReachedThreshold={0.1} 
        />
      )}
      {thumbnails.length === 0 && !loading && (
        <Text>No thumbnails generated.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingTop: 20,
  },
  flatListContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  thumbnail: {
    width: 80,
    height: 60,

  },
});

export default Timeline;
