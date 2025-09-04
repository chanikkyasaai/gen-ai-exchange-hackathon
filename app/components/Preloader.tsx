import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { VideoView, useVideoPlayer } from 'expo-video';

interface PreloaderProps {
  onFinish: () => void;
}

const videoSource = require('../assets/kala.mp4');

export default function Preloader({ onFinish }: PreloaderProps) {
  const [shouldPlay, setShouldPlay] = useState(true);
  const hasFinished = useRef(false);
  
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
    if (shouldPlay) {
      player.play();
    }
  });

  useEffect(() => {
    // Fixed 4-second timer
    const timer = setTimeout(() => {
      if (!hasFinished.current) {
        hasFinished.current = true;
        setShouldPlay(false); // Stop rendering the video
        onFinish();
      }
    }, 4000);

    return () => {
      clearTimeout(timer);
      setShouldPlay(false);
    };
  }, [onFinish]);

  if (!shouldPlay) {
    return <View style={styles.container} />; // Return empty black view
  }

  return (
    <View style={styles.container}>
      <VideoView
        player={player}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        nativeControls={false}
        allowsFullscreen={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});
