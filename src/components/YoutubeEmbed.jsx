import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import { Box, Center } from '@chakra-ui/react';
import { SubtitleCards } from './SubtitleCards';
import { useYoutube } from '../hooks/useYoutube';
import '../styles/app.css'

const YoutubeEmbed = ({ video, width = 640, height = 360 }) => {
  const {
      currentSubtitleIndex,
      intervalId,
      player,
      playerLoaded,
      handleChange
  } = useYoutube();

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
        playerVars: { 'controls': '0', 'cc_lang_pref': 'sg' },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });

      handleChange('player', newPlayer);
    };
  }, [video]);


  useEffect(() => {
    if (player && playerLoaded) {
      handleChange('intervalId', setInterval(() => {
        if (player.getPlayerState() === window.YT.PlayerState.PLAYING) {
          onPlayerStateChange({ target: player });
        }
      }, 100));
  
      return () => clearInterval(intervalId);
    }
  }, [player, playerLoaded]);

  
  

  const onPlayerReady = (event) => {
    handleChange('playerLoaded', true);
    event.target.playVideo();
  }

  const onPlayerStateChange = (event) => {
    const { target, data } = event;
    // Data: -1 Cargado sin iniciar, 0 Terminado, 2 Paused, 1 Playing

    // if(data && (data != 1 && data != 2 )){
    //   return;
    // }

    const currentTime = target.getCurrentTime();
    const nextSubtitleIndex = video.subtitles.findIndex(subtitle => subtitle.start <= currentTime && subtitle.end > currentTime) ?? -1;
    handleChange('lastSubtitle', currentSubtitleIndex + 1);
    handleChange('currentSubtitleIndex', nextSubtitleIndex);
  }

  const handlePlay = () => {
    (player.getPlayerState() != 1) ? player.playVideo() : player.pauseVideo();
  }
 
  return (
    <Box>
      <Center onClick={ handlePlay } cursor='pointer'>
        <div style={{ pointerEvents: 'none' }}>
          <div id="video_player"></div>
        </div>
      </Center>
      <Box mt={6}>
        <SubtitleCards subtitles={ video.subtitles } currentSubtitle={ currentSubtitleIndex } />
      </Box>
    </Box>
  );

};

YoutubeEmbed.propTypes = {
  video: PropTypes.object.isRequired
};

export default YoutubeEmbed;