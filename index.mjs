const API_KEY = 'AIzaSyDRurCodX8OKd_-eJnrvgq3uX-08qGAhqA';
const videoQueue = [];

function onYouTubeIframeAPIReady() {
    // Load YouTube API script asynchronously
    // ...
}

function requestSong() {
    const songLink = document.getElementById('songLink').value;
    const videoId = extractVideoId(songLink);
    if (videoId) {
        videoQueue.push(videoId);
        displayVideoQueue(videoQueue);
        document.getElementById('songLink').value = ''; // Clear the input field
    } else {
        alert('Invalid YouTube video link. Please try again.');
    }
}

function extractVideoId(url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function displayVideoQueue(queue) {
    const videoQueueElement = document.getElementById('videoQueue');
    videoQueueElement.innerHTML = ''; // Clear the existing queue

    queue.forEach(videoId => {
        const videoDiv = document.createElement('div');
        videoDiv.textContent = `Video ID: ${videoId}`;
        videoQueueElement.appendChild(videoDiv);
    });
}

function playVideo(videoId) {
    const player = new YT.Player('videoPlayer', {
        height: '400',
        width: '100%',
        videoId: videoId,
        playerVars: {
            'autoplay': 1,
            'controls': 1,
            'fs': 1,
            'rel': 0,
            'modestbranding': 1
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });

    function onPlayerReady(event) {
        // You can do something when the video is ready to play
    }

    function onPlayerStateChange(event) {
        if (event.data === YT.PlayerState.ENDED) {
            // Video ended, check if there are more videos in the queue
            if (videoQueue.length > 0) {
                const nextVideoId = videoQueue.shift(); // Dequeue the next video
                player.loadVideoById(nextVideoId); // Play the next video
                displayVideoQueue(videoQueue); // Update the displayed queue
            }
        }
    }
}
