import React, { useState } from 'react'
import { Box, Button, Card, CardBody, CardFooter, Center, FormControl, FormLabel, Grid, GridItem, Heading, Image, Select, Text } from '@chakra-ui/react'
import { Link as ReachLink } from "react-router-dom"
import { list } from '../../data/videolist';


export const ListVideos = () => {
    const [languageFilter, setLanguageFilter] = useState('all');

  return (
    <Center>
        <Box w="100%">
            <Center>
                <Heading size={'lg'}>Subtitube - Learn with subtitles</Heading>
            </Center>

            <Box maxW={300}>
                <FormControl>
                    <FormLabel>Select Language</FormLabel>
                    <Select defaultValue='all' onChange={ (e) => setLanguageFilter(e.target.value) }>
                        <option value='all'>ALL</option>
                        <option value='en'>EN</option>
                        <option value='es'>ES</option>
                    </Select>
                </FormControl>
            </Box>

            <Box display='block' mt={4}>
                <Grid
                    templateColumns='repeat(2, 1fr)'
                    gap={4}
                >
                    { Object.entries(list).map( ([ key, data ]) => 
                    {
                        return languageFilter === 'all' || data.originalLang === languageFilter ? (
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
                    ) : null;
                }) }
                </Grid>
            </Box>
        </Box>
    </Center>
  )
}
