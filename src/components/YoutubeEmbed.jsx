import React, { useState, useEffect } from 'react';
import PropTypes from "prop-types";
import { Box, Center, Text } from '@chakra-ui/react';

const YoutubeEmbed = ({ video, width = 640, height = 360 }) => {
  const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(null);
  const [intervalId, setIntervalId] = useState(null);
  const [player, setPlayer] = useState(null);
  const [playerLoaded, setPlayerLoaded] = useState(false);

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];

    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = function() {
      const newPlayer = new window.YT.Player('video_player', {
        height,
        width,
        videoId: video.id,
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange,
          'onSeek' : onPlayerStateChange
        }
      });

      setPlayer(newPlayer);
    };
  }, [video]);


  useEffect(() => {
    if (player && playerLoaded) {

      setIntervalId(setInterval(() => {
        if (player.getPlayerState() === window.YT.PlayerState.PLAYING) {
          onPlayerStateChange({ target: player });
        }
      }, 100));
  
      return () => clearInterval(intervalId);
    }
  }, [player, playerLoaded]);

  
  function onPlayerReady(event) {
    setPlayerLoaded(true);
    event.target.playVideo();
  }

  function onPlayerStateChange(event) {
    const { target, data } = event;
    // Data: -1 Cargado sin iniciar, 0 Terminado, 2 Paused, 1 Playing

    // if(data && (data != 1 && data != 2 )){
    //   return;
    // }

    const currentTime = target.getCurrentTime();
    const nextSubtitleIndex = video.subtitles.findIndex(subtitle => subtitle.start <= currentTime && subtitle.end > currentTime) ?? '';
    setCurrentSubtitleIndex(nextSubtitleIndex);
  }

  return (
    <Box>
      <Center>
        <div id="video_player"></div>
      </Center>
      <div>
        {video.subtitles[currentSubtitleIndex] ? (
          <>
            <Text fontSize='lg'>{ video.subtitles[currentSubtitleIndex].text.en }</Text>
            <Text fontSize='sm'>{ video.subtitles[currentSubtitleIndex].text.es }</Text>
          </>
        ) : (
          <>
            <Text fontSize='lg'>-</Text>
            <Text fontSize='sm'>-</Text>
          </>
        )}
      </div>
    </Box>
  );

};

YoutubeEmbed.propTypes = {
  video: PropTypes.object.isRequired
};

export default YoutubeEmbed;