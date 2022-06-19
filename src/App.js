import axios from 'axios';
import React, {useEffect, useState} from 'react';
import './App.css';

function App() {

const [photo, setPhoto] = useState([]);
const [currentPage, setCurrentPage] = useState(0);
const [fetching, setFetching] = useState(true);

useEffect(() => {
  if(fetching) {
    console.log('fetching')
    axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currentPage}`)
    .then(response =>{
      setPhoto([...photo, ...response.data])
      setCurrentPage(prevState => prevState + 1)
      console.log(currentPage);
    }).finally(() => setFetching(false))
  }
  
}, [fetching])

useEffect(() => {
  document.addEventListener('scroll', scrollListener)
  return function() {
    document.removeEventListener('scroll', scrollListener)
  };
}, [])

const scrollListener = (e) => {
  if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 90) {
    setFetching(true);
  }
}
  return (
    <div className={'myApp'}>
      {photo.map(photo =>
            <div className="photo" key={photo.id}>
              <div className="title">{photo.id}. {photo.title}</div>
              <img src={photo.thumbnailUrl} alt="square"/>
            </div>
        )}
    </div>
  );
}

export default App;
