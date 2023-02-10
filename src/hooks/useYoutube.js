import { useState } from "react";

export const useYoutube = () => {
    const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(null);
    const [intervalId, setIntervalId] = useState(null);
    const [player, setPlayer] = useState(null);
    const [playerLoaded, setPlayerLoaded] = useState(false);
    const [actualSubtitle, setActualSubtitle] = useState(false);
    const [repeat, setRepeat] = useState(false);
    const [playerState, setPlayerState] = useState(false);

    const handleChange = (type, payload) => {
        switch(type){
            case 'currentSubtitleIndex':
                setCurrentSubtitleIndex(payload);
            break;
            case 'intervalId':
                setIntervalId(payload);
            break;
            case 'player':
                setPlayer(payload);
            break;
            case 'playerLoaded':
                setPlayerLoaded(payload);
            break;
            case 'actualSubtitle':
                setActualSubtitle(payload);
            break;
            case 'repeat':
                setRepeat( prev => !prev );
            break;
            case 'playerState':
                setPlayerState( payload );
            break;
        }
    }
    return {
        currentSubtitleIndex,
        intervalId,
        player,
        playerLoaded,
        actualSubtitle,
        repeat,
        playerState,
        handleChange
    };
}