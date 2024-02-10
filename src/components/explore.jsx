import React, { useEffect } from 'react';

function Explore() {


    const videoFilenames = ['Do you want to become a fullstack developer', 'Who is a fullstack developer', 'myreel1.mp4'];


  useEffect(() => {
    document.getElementById('mainhomebar').style.backgroundColor = '';
    document.getElementById('mainsearchbar').style.backgroundColor = '';
    document.getElementById('mainexplorebar').style.backgroundColor = '#dbdbdb';
    document.getElementById('mainreelsbar').style.backgroundColor = '';
    document.getElementById('mainaddbar').style.backgroundColor = '';
    document.getElementById('mainnotificationbar').style.backgroundColor = '';
    document.getElementById('mainprofilebar').style.backgroundColor = '';
  }, []);

  return (
    <div>
      <h1>Explore</h1>

    </div>
  );
}

export default Explore;
