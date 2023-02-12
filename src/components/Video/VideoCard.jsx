import {
  Box,
  Button,
    Center,
  } from '@chakra-ui/react';
import { Link as ReactLink, useParams } from 'react-router-dom';
import YoutubeEmbed from './YoutubeEmbed';
import { list } from '../../data/videolist';
import { ArrowBackIcon } from '@chakra-ui/icons';


  const VideoCard = () => {
    const { youtube_id } = useParams();

    return (
      <Center>
        <Box w='100%'>
          <Button as={ ReactLink } to='/' mb={4} colorScheme="teal" leftIcon={ <ArrowBackIcon /> }>Go back</Button>
        
          { list[youtube_id] ? (

            <YoutubeEmbed video={ list[youtube_id] } />
          ) : (
            <>
              Aún no tenemos subtítulo para este video
            </>
          )}
          </Box>
      </Center>
    );
  }

  export default VideoCard;