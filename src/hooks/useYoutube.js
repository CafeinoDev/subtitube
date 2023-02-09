import { useState } from "react";

export const useYoutube = () => {
    const [currentSubtitleIndex, setCurrentSubtitleIndex] = useState(null);
    const [intervalId, setIntervalId] = useState(null);
    const [player, setPlayer] = useState(null);
    const [playerLoaded, setPlayerLoaded] = useState(false);
    const [lastSubtitle, setLastSubtitle] = useState(-1);

    const handleChange = (type, payload) => {
        switch(type){
            case 'currentSubtitleIndex':
                setCurrentSubtitleIndex(payload)
            break;
            case 'intervalId':
                setIntervalId(payload)
            break;
            case 'player':
                setPlayer(payload)
            break;
            case 'playerLoaded':
                setPlayerLoaded(payload)
            break;
            case 'lastSubtitle':
                setLastSubtitle(payload)
            break;
        }
    }
    return {
        currentSubtitleIndex,
        intervalId,
        player,
        playerLoaded,
        lastSubtitle,
        handleChange
    };
}