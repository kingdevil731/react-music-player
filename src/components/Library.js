import React from "react";

import LibrarySong from "./LibrarySong";

const Library = ({
  songs,
  setcurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  libraryStatus,
}) => {
  return (
    <div className={`library ${libraryStatus ? "active-library" : ""}`}>
      <h2>Library</h2>
      <div className="library-songs">
        {songs.map((song) => (
          <LibrarySong
            audioRef={audioRef}
            song={song}
            setcurrentSong={setcurrentSong}
            songs={songs}
            id={song.id}
            key={song.id}
            isPlaying={isPlaying}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  );
};

export default Library;
