import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import { Box, Center, Skeleton } from '@chakra-ui/react';
import { SubtitleCards } from './SubtitleCards';
import { useYoutube } from '../hooks/useYoutube';
import { handleNextPrevButtons, handlePlay, handleSeekTo } from '../helpers/playerFunctions';
import { YoutubeControls } from './YoutubeControls';
import '../styles/app.css'

const YoutubeEmbed = ({ video, width = 640, height = 360 }) => {
  const {
      currentSubtitleIndex,
      intervalId,
      player,
      playerLoaded,
      repeat,
      actualSubtitle,
      playerState,
      handleChange
  } = useYoutube(null);

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
          onPlayerStateChange({ target: player, currentSubtitleIndex });
        }
      }, 100));
  
      return () => clearInterval(intervalId);
    }
  }, [player, playerLoaded]);
  
  useEffect( ()  => {
    if(repeat && actualSubtitle >= 0 && (actualSubtitle !== currentSubtitleIndex)){
      handleSeekTo(player, video.subtitles[actualSubtitle].start);
      return;
    }

    handleChange('actualSubtitle', currentSubtitleIndex);
  }, [currentSubtitleIndex]);

  const onPlayerReady = (event) => {
    handleChange('playerLoaded', true);
    // event.target.playVideo();
    event.target.seekTo(14);
  }

  const onPlayerStateChange = (event) => {
    const { target, data } = event;

    const currentTime = target.getCurrentTime();
    const nextSubtitleIndex = video.subtitles.findIndex(subtitle => subtitle.start <= currentTime && subtitle.end > currentTime);

    handleChange('currentSubtitleIndex', nextSubtitleIndex);
  }
 
  return (
    <Box w='100%'>

      <Skeleton height='360px' isLoaded={playerLoaded} display={ playerLoaded ? 'none' : 'block' } />
      <Center onClick={ () => handlePlay(player, handleChange) } cursor='pointer' display={ playerLoaded ? 'block' : 'none' }>
        <div style={{ pointerEvents: 'none' }}>
          <div id="video_player"></div>
        </div>
      </Center>

      <Box>

        <Skeleton mt={3} height="40px" isLoaded={playerLoaded} display={ playerLoaded ? 'none' : 'block' } />

        <YoutubeControls 
          actualSubtitle={ actualSubtitle } 
          handleChange={ handleChange } 
          player={ player } 
          playerState={ playerState } 
          repeat={ repeat } 
          video={ video } 
          playerLoaded={ playerLoaded }
          handleNextPrevButtons={ handleNextPrevButtons }
          handleSeekTo={ handleSeekTo }
          handlePlay={ handlePlay }
        />

        <Box mt={3} >
          <SubtitleCards subtitles={ video.subtitles } currentSubtitle={ actualSubtitle } />
        </Box>
      </Box>
    </Box>
  );
};

YoutubeEmbed.propTypes = {
  video: PropTypes.object.isRequired
};

export default YoutubeEmbed;