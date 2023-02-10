import React from 'react'
import { Box, Card, CardBody, Text, SkeletonText } from '@chakra-ui/react'

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

            <Card variant='outline' display={ currentSubtitle === -1 ? 'block' : 'none' }>
                <CardBody>
                    <SkeletonText noOfLines={2} spacing='4' skeletonHeight='4' />
                </CardBody>
            </Card>
        </Box>
    </>
  )
}
