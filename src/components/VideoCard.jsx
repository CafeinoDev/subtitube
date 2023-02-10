import {
    Box,
    Center,
    useColorModeValue,
  } from '@chakra-ui/react';
import YoutubeEmbed from './YoutubeEmbed';
import { list } from '../data/videolist';
  
  const VideoCard = () => {
    return (
      <Center py={12}>
        <Box
          role={'group'}
          p={6}
          maxW={'720px'}
          w={'full'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'2xl'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}>
            <Center>
                <YoutubeEmbed video={ list['TnGl01FkMMo'] } />
            </Center>
        </Box>
      </Center>
    );
  }

  export default VideoCard;