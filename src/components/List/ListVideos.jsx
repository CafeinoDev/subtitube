import React from 'react'
import { Box, Button, Card, CardBody, CardFooter, Center, Grid, GridItem, Heading, Image, Text } from '@chakra-ui/react'
import { Link as ReachLink } from "react-router-dom"
import { list } from '../../data/videolist';


export const ListVideos = () => {
  return (
    <Center>
        <Box w="100%">
            <Center>
                <Heading size={'lg'}>Subtitube - Learn with subtitles</Heading>
            </Center>

            <Box display='block' mt={4}>
                <Grid
                    templateColumns='repeat(2, 1fr)'
                    gap={4}
                >
                    { Object.entries(list).map( ([ key, data ]) => (
                        <GridItem w='100%' key={ key }>
                            <Card variant='outline' as={ ReachLink } to={`/video/${key}`} height='100%'>
                                <CardBody display='flex' flexDir='column'>
                                    <Image
                                        src={`https://i.ytimg.com/vi/${key}/maxresdefault.jpg`}
                                        alt={data.title}
                                        borderRadius='lg'
                                    />
                                    <Heading size='sm' my={4}>{ data.title }</Heading>
                                    <Box flex="1" display='flex' alignItems="end">
                                        <Button colorScheme='blue'>
                                            Train this
                                        </Button>
                                    </Box>
                                </CardBody>
                            </Card>
                        </GridItem>
                    )) }
                </Grid>
            </Box>
        </Box>
    </Center>
  )
}
