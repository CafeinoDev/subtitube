import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
  } from '@chakra-ui/react';
import YoutubeEmbed from './YoutubeEmbed';
import { list } from '../data/videolist';

  
  const IMAGE =
    'https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80';
  
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