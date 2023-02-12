import React from 'react'
import { Button, HStack, Icon } from '@chakra-ui/react';
import { RepeatIcon } from '@chakra-ui/icons';
import { FaPause, FaPlay } from 'react-icons/fa';
import { BsFillCaretLeftFill, BsFillCaretRightFill } from 'react-icons/bs';

export const YoutubeControls = ({
        actualSubtitle, 
        handleChange, 
        player, 
        playerState, 
        repeat,
        playerLoaded,
        video,
        handleNextPrevButtons,
        handleSeekTo,
        handlePlay
    }) => 
    {
        return (
            <HStack mt={3} display={ playerLoaded ? 'block' : 'none' }>
                <Button colorScheme='teal' variant='outline' onClick={ () => handleNextPrevButtons(-1, actualSubtitle, video, handleChange, player, handleSeekTo) }><Icon as={ BsFillCaretLeftFill } /></Button>
                <Button colorScheme='teal' variant='outline' onClick={ () => handleNextPrevButtons( 1, actualSubtitle, video, handleChange, player, handleSeekTo) }><Icon as={ BsFillCaretRightFill } /></Button>
                <Button colorScheme='teal' onClick={ () => { handleChange('repeat') } } variant={ repeat ? 'solid' : 'outline' }><RepeatIcon /></Button>
                <Button colorScheme='teal' variant='outline' onClick={() => handlePlay(player, handleChange)}><Icon as={ playerState == 1 ? FaPause : FaPlay  } /></Button>
            </HStack>
        );
    };