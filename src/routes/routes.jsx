import { ListVideos } from '../components/List/ListVideos';
import VideoCard from '../components/Video/VideoCard';


export const router = [
    {
        path: '/',
        element: <ListVideos />
    },
    {
        path: '/video/:youtube_id',
        element: <VideoCard />
    }
];