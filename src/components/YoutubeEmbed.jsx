import React, { useEffect } from 'react';
import PropTypes from "prop-types";
import { Box, Button, Center, HStack, Icon } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon, RepeatIcon, TriangleDownIcon } from '@chakra-ui/icons';
import { FaPlay, FaPause } from 'react-icons/fa'
import { SubtitleCards } from './SubtitleCards';
import { useYoutube } from '../hooks/useYoutube';
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
      handleSeekTo(video.subtitles[actualSubtitle].start);
      return;
    }

    handleChange('actualSubtitle', currentSubtitleIndex);
  }, [currentSubtitleIndex]);


  const onPlayerReady = (event) => {
    handleChange('playerLoaded', true);
    event.target.playVideo();
    event.target.seekTo(14);
  }

  const onPlayerStateChange = (event) => {
    const { target, data } = event;

    const currentTime = target.getCurrentTime();
    const nextSubtitleIndex = video.subtitles.findIndex(subtitle => subtitle.start <= currentTime && subtitle.end > currentTime);

    handleChange('currentSubtitleIndex', nextSubtitleIndex);
  }

  const handleNextPrevButtons = (opt) => {
    let currentSubtitleIndex = actualSubtitle + opt;


    if(actualSubtitle == -1){
      const currentTime = player.getCurrentTime();
      if (opt === 1) {
        currentSubtitleIndex = video.subtitles.findIndex(subtitle => subtitle.start >= currentTime);
      } else {
        currentSubtitleIndex = video.subtitles.findIndex((subtitle, index, subtitles) => subtitle.start <= currentTime && subtitles[index + 1]?.start > currentTime);
      }
    }
    
    if(video.subtitles.length <= currentSubtitleIndex || currentSubtitleIndex < 0){
      return;
    }

    handleChange('actualSubtitle', currentSubtitleIndex);
    handleSeekTo(video.subtitles[currentSubtitleIndex].start);
  }

  const handlePlay = () => {
    if(player.getPlayerState() != 1) {
      player.playVideo()
      handleChange('playerState', true)  
    }else{
      player.pauseVideo();
      handleChange('playerState', false)  
    } 
  }

  const handleSeekTo = (seconds) => {
    player.seekTo(seconds);
  }
 
  return (
    <Box w='100%'>
      <Center onClick={ handlePlay } cursor='pointer'>
        <div style={{ pointerEvents: 'none' }}>
          <div id="video_player"></div>
        </div>
      </Center>

      <Box>
        <HStack mt={3}>
          <Button colorScheme='teal' variant='outline' onClick={ () => handleNextPrevButtons(-1) }><ArrowBackIcon /></Button>
          <Button colorScheme='teal' variant='outline' onClick={ () => handleNextPrevButtons(1) }><ArrowForwardIcon /></Button>
          <Button colorScheme='teal' onClick={ () => { handleChange('repeat') } } variant={ repeat ? 'solid' : 'outline' }><RepeatIcon /></Button>
          <Button colorScheme='teal' variant='outline' onClick={ handlePlay }><Icon as={ playerState == 1 ? FaPause : FaPlay  } /></Button>
        </HStack>

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