// 1. import `ChakraProvider` component
import { Box, Center, ChakraProvider, useColorModeValue } from '@chakra-ui/react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { router as router_paths } from './routes/routes';

const router = createBrowserRouter( router_paths );

function App() {
  // 2. Wrap ChakraProvider at the root of your app
  return (
    <ChakraProvider>
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
        <RouterProvider router={router} />
        </Box>
      </Center>
    </ChakraProvider>
  )
}

export default App;