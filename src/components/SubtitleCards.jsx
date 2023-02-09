import { Box, Card, CardBody, Text } from '@chakra-ui/react'
import React from 'react'

export const SubtitleCards = ({ subtitles = [], currentSubtitle = -1 }) => {
  return (
    <>
        <Box gap={2} display='flex' flexDirection='column'>
            { subtitles.map( (subtitle, index) => (
                <Card variant='outline' key={ index } display={ currentSubtitle === index ? 'block' : 'none' }>
                    <CardBody>
                        <Text fontSize='lg' fontWeight='medium'>{ subtitle.text.en }</Text>
                        <Text fontSize='sm'>{ subtitle.text.es }</Text>
                    </CardBody>
                </Card>
            ) ) }
        </Box>
    </>
  )
}
