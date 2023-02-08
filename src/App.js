// 1. import `ChakraProvider` component
import { ChakraProvider } from '@chakra-ui/react';
import VideoCard from './components/VideoCard';

function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
      <VideoCard />
    </ChakraProvider>
  )
}

export default App;