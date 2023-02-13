import React, { useState, useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
  } from '@chakra-ui/react'

export const ProgressBar = ({ handleChange, videoDuration, currentTime, handleSeekTo, player }) => {
    const [time, setTime] = useState(0);

    const pauseVideo = () => {
        player.pauseVideo();
    }

    const updateTime = (time) => {
        player.playVideo();
        handleSeekTo(player, time);
        handleChange('playerState', true);
    }

    useEffect(() => {
      setTime(currentTime);
    }, [currentTime])

    return (
        <Box mt={2}>
            <Slider defaultValue={0} min={0} step={1} max={videoDuration} value={time} onChange={ setTime } onChangeStart={ pauseVideo } onChangeEnd={(e)=> { updateTime(e) }}>
                <SliderTrack>
                    <SliderFilledTrack bgColor='teal' />
                </SliderTrack>
                <SliderThumb bgColor='teal' />
            </Slider>
        </Box>
    )
}
