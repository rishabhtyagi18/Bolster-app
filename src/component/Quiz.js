
import React, { Fragment, useState, useEffect } from 'react';
import images from "./data.json";
import { Link } from 'react-router-dom';
import "./Css/Quiz.css";

const Quiz = () => {
  const [timeLeft, setTimeLeft] = useState(15);
  const [imageArray, setImageArray] = useState([]);
  const [imageGroup, setNextImageGroup] = useState(0);
  const [selectedImage, setSelectedImage] = useState('');
  const [score, setScore] = useState(0);
  const [valid, setValid] = useState('');
  const [clicked, setClicked] = useState(undefined);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  useEffect(() => {
    const sorted = images.sort(() => 0.5 - Math.random());
    setImageArray(sorted);
    setNextImageGroup(sorted[0]);
  }, []); 

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setTimeLeft(15);
    }
  }, [timeLeft]);


  useEffect(() => {
    const shuffledQuestions = shuffleArray(images);
    setImageArray(shuffledQuestions);
  }, []);

  const shuffleArray = array => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  const onImageClick = (e) => {
    const { target : { src } } = e;
    if (src.includes('fake')) {
      setClicked('fake');
    };
    if (src.includes('correct')) setClicked('correct');
    setSelectedImage(src);
  }

  const onClickNext = (index) => {
    let group = imageArray.find((image, i) => index === i);
    if(selectedImage.includes('fake')) {
      setValid(true);
      setNextImageGroup(group);
      setCurrentQuestion(index);
      setTimeLeft(15);
      setScore(score + 1);
      setTimeout(() => {
         setValid('');
        clearTimeout();
      }, 250);
    } else {
      setValid(false);
      setNextImageGroup(group);
      setCurrentQuestion(index);
      setTimeLeft(15);
      setTimeout(() => {
         setValid('');
        clearTimeout();
      }, 250);
    }
    setClicked(undefined);
  }

  const reset = () => {
    const sorted = images.sort(() => 0.5 - Math.random());
    setTimeLeft(15);
    setSelectedImage('');
    setCurrentQuestion(0);
    setScore(0);
    setValid('');
    setClicked(undefined);
    setNextImageGroup(sorted[0]);
    setImageArray(sorted);
  }

  return (
    <div>
    {currentQuestion === imageArray.length
    ?
      <Fragment>
        <div>
          <h2>Game Over!</h2>
          <h3>{`Your Score: ${score}/10`}</h3>
          <div>
            <button
              type='button'
              className='btn-primary'
              onClick={() => reset()}
            >
              Click here to retry!
            </button>
          </div>
          <br />
          <Link to="/signup" style={{textDecoration: 'none'}}>
            <button className="signup-btn">Sign up</button>
          </Link>
        </div>
      </Fragment>
        :
     <Fragment>
      <div>
          <div>
            <h2>SPOT THE FAKE GAME</h2>
            <h4>Question {currentQuestion + 1}</h4>
            <h4>Time Left : {timeLeft}s</h4>
          </div>
        </div>
        <br />
        <div className='flex-row'>
          <div
            className={`correct-image ${valid === false && valid !== '' ? 'invalid' : ''} ${clicked === 'correct' ? 'clicked' : ''}`}
            role="button"
            tabIndex="0"
            onClick={(e) => onImageClick(e)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') onImageClick(e)
            }}
          >
            <img 
              src={`/img/${imageGroup.correct}`}
              alt="landing page correct" 
              className='img-fluid' />
          </div>
          <div
            className={`correct-image ${valid === true && valid !== '' ? 'valid' : ''} ${clicked === 'fake' ? 'clicked' : ''}`}
            role="button"
            tabIndex="0"
            onClick={(e) => onImageClick(e)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') onImageClick(e)
            }}
          >
            <img src={`/img/${imageGroup.fake}`} alt="landing page fake" className='img-fluid' />
          </div>
        </div>
        <br />
        <br />
        {selectedImage !== '' &&
          <div>
            <button
              type='button'
              className='btn-primary'
              onClick={() => onClickNext(currentQuestion + 1)}
              disabled={timeLeft === 0}
            >
            NEXT
            </button>
          </div>
        }
     </Fragment>
    }
    </div>
  );
}

export default Quiz;
