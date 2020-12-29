import React, { useState, useRef } from "react";
//import styles
import "./styles/app.scss";

//Adding components
import Library from "./components/Library";
import Nav from "./components/Nav";
import Player from "./components/Player";
import Song from "./components/Song";

// import data
import data from "./data";

function App() {
  // States
  const [songs, setSongs] = useState(data());
  const [currentSong, setcurrentSong] = useState(songs[1]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
  });
  const [libraryStatus, setLibraryStatus] = useState(false);
  // Ref
  const audioRef = useRef(null);

  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    const roundedCurrent = Math.round(currentTime);
    const roundedDuration = Math.round(duration);
    const animation = Math.round((roundedCurrent / roundedDuration) * 100);
    setSongInfo({
      ...songInfo,
      currentTime,
      duration,
      animationPercentage: animation,
    });
  };
  const songEndHandler = async (e) => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    await setcurrentSong(songs[(currentIndex + 1) % songs.length]);
    if (isPlaying) audioRef.current.play();
  };

  return (
    <div className={`App ${libraryStatus ? "library-active" : ""}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        currentSong={currentSong}
        setcurrentSong={setcurrentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        songs={songs}
        setSongs={setSongs}
      />
      <Library
        audioRef={audioRef}
        libraryStatus={libraryStatus}
        songs={songs}
        setcurrentSong={setcurrentSong}
        isPlaying={isPlaying}
        setSongs={setSongs}
      />
      <audio
        ref={audioRef}
        src={currentSong.audio}
        onTimeUpdate={timeUpdateHandler}
        onLoadedMetadata={timeUpdateHandler}
        onEnded={songEndHandler}
      ></audio>
    </div>
  );
}

export default App;
