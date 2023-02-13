import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import { Box, Center, Skeleton } from '@chakra-ui/react';
import { SubtitleCards } from './SubtitleCards';
import { useYoutube } from '../../hooks/useYoutube';
import { handleNextPrevButtons, handlePlay, handleSeekTo } from '../../helpers/playerFunctions';
import { YoutubeControls } from './YoutubeControls';
import '../../styles/app.css'
import { ProgressBar } from './ProgressBar';

const YoutubeEmbed = ({ video, width = 640, height = 360 }) => {
  const {
      actualSubtitle,
      currentSubtitleIndex,
      currentTime,
      handleChange,
      player,
      playerLoaded,
      playerState,
      repeat,
      videoDuration,
      isPlaying,
  } = useYoutube(null);

  useEffect(() => {
  
    return () => {
      handleChange('playerLoaded', null);
      window.YT = null;
    }
  }, [])
  

  useEffect(() => {
    // Creating and appending youtube video iframe
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];

    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = function() {
      const newPlayer = new window.YT.Player('video_player', {
        height,
        width,
        videoId: video.id,
        playerVars: { controls: '0', autoplay: '0' },
        events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
        }
      });

      // Store player
      handleChange('player', newPlayer);

      // Handle current video time
      const iframeWindow = newPlayer.getIframe().contentWindow;

      window.addEventListener("message", function(event) {
        if(event.source == iframeWindow){
          var data = JSON.parse(event.data);

          if(
            data.event === "infoDelivery" &&
            data.info &&
            data.info.currentTime
          ){
            const time = Math.floor(data.info.currentTime);

            if (time !== currentTime) {
              handleChange('currentTime', time);
            }
          }
        }
      });

    };

    return () => {
      handleChange('player', null);
      tag.remove();
      handleChange('playerLoaded', false);
      delete window.onYouTubeIframeAPIReady;
    };
  }, [video]);
  
  
  useEffect(() => {
    if(player && playerLoaded){
      handleChange('videoDuration', player.getDuration());
    }
  }, [player, playerLoaded])

  useEffect(() => {
    if (window.YT && player.getPlayerState() === window.YT.PlayerState?.PLAYING) {
      onPlayerStateChange({ target: player, currentSubtitleIndex });
    }
  }, [currentTime])

  useEffect( ()  => {
    if((typeof actualSubtitle != 'boolean' && actualSubtitle != null) && repeat && actualSubtitle >= 0 && (actualSubtitle !== currentSubtitleIndex)){
      handleSeekTo(player, video.subtitles[actualSubtitle]?.start);
      return;
    }

    handleChange('actualSubtitle', currentSubtitleIndex);

    return () => { handleChange('actualSubtitle', null) }
  }, [currentSubtitleIndex]);

  const onPlayerReady = () => {
    handleChange('playerLoaded', true);
  }

  const onPlayerStateChange = (event) => {
    if(event.data === window.YT.PlayerState?.ENDED){
      handleChange('playerState', false);
    }

    const currentTime = event.target.getCurrentTime();
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

        {
          playerLoaded && <ProgressBar handleChange={ handleChange } videoDuration={videoDuration} currentTime={ currentTime } handleSeekTo={ handleSeekTo } player={ player } />
        }

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


        <Box mt={3} display={ playerLoaded ? 'block' : 'none' }>
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