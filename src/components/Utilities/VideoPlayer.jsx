"use client"

import { useState } from "react"
import Youtube from "react-youtube"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const VideoPlayer = ({ youtubeId }) => {
    const [isOpen, setIsOpen] = useState(true)

    const handleVideoPlayer = () => {
        setIsOpen((prevState) => !prevState)
    }

    const option = {
        width: "300",
        height: "250"
    }

    const Player = () => {
        const handleVideoError = () => {
            toast.warning(
                <div>
                    Video is broken, Please try another video.
                    {/* <span role="img" aria-label="emoji">😢</span>{' '} */}
                </div>,
                    {
                        position: "top-center",
                        autoClose: 5000, // Durasi toast tampil (ms)
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    }
                );
        };

        return (
            <div className="fixed bottom-2 right-2">
                <button
                    onClick={handleVideoPlayer}
                    className="text-color-primary float-right bg-color-secondary px-3 mb-1 hover:bg-color-red transition-all"
                >
                    X
                </button>
                <Youtube
                    videoId={youtubeId}
                    onReady={(event) => event.target.pauseVideo()}
                    opts={option}
                    onError={handleVideoError}
                />
                <ToastContainer />
            </div>
        );
    }

    const ButtonOpenPlayer = () => {
        return (
            <button
                onClick={handleVideoPlayer}
                className="rounded fixed bottom-5 right-5 w-32 bg-color-primary text-color-dark text-xl hover:bg-color-aqua transition-all shadow-xl glow"
            >
                Watch Trailer
            </button>
        )
    }

    return isOpen ? <Player /> : <ButtonOpenPlayer/>
}

export default VideoPlayer