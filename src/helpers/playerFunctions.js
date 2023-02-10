export const handleNextPrevButtons = (opt, actualSubtitle, video, handleChange, player, handleSeekTo) => {
    let currentSubtitleIndex = actualSubtitle + opt;
    
    if (actualSubtitle === -1) {
        const currentTime = player.getCurrentTime();
    if (opt === 1) {
        currentSubtitleIndex = video.subtitles.findIndex(subtitle => subtitle.start >= currentTime);
    } else {
        currentSubtitleIndex = video.subtitles.findIndex((subtitle, index, subtitles) => subtitle.start <= currentTime && subtitles[index + 1]?.start > currentTime);
    }
    }
    
    if (video.subtitles.length <= currentSubtitleIndex || currentSubtitleIndex < 0) {
        return;
    }
    
    handleChange('actualSubtitle', currentSubtitleIndex);
    handleSeekTo(player, video.subtitles[currentSubtitleIndex].start);
};
    
export const handlePlay = (player, handleChange) => {
    if (player.getPlayerState() !== 1) {
        player.playVideo();
        handleChange('playerState', true);
    } else {
        player.pauseVideo();
        handleChange('playerState', false);
    }
};
    
export const handleSeekTo = (player, seconds) => {
    player.seekTo(seconds);
};