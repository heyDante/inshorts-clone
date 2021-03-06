import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import GoBack from '../GoBack/GoBack';

import { auth, addNewsToFirestore, fetchNews } from '../../firebase/firebase.utils';

import './NewsForm.scss';

const getCurrentTime = () => {
  const date = new Date();
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };
  const time = new Intl.DateTimeFormat('en-US', options).format(date);
  return time;
};

const getCurrentDate = () => {
  const dt = new Date();
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weekday: 'long'
  };
  const date = new Intl.DateTimeFormat('en-US', options).format(dt);
  return date;
};

const NewsForm = ({ setNews }) => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [sourceName, setSourceName] = useState('');
  const [sourceUrl, setSourceUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [author, setAuthor] = useState('');

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Adding user');

    const newsObject = {
      title,
      summary,
      sourceName,
      sourceUrl,
      imageUrl,
      author,
      time: getCurrentTime(),
      date: getCurrentDate()
    };

    console.log(newsObject);

    await addNewsToFirestore(newsObject);

    const updatedNews = await fetchNews();

    setNews(updatedNews);

    setTitle('');
    setSummary('');
    setSourceName('');
    setSourceUrl('');
    setImageUrl('');
    setAuthor('');

    history.push('/');
  };

  return (
    <div className="news-form">
      <h2 className="news-form__heading">News Form</h2>
      <form className="news-form-group" onSubmit={handleSubmit}>
        <input type="text" value={title}
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea value={summary}
          placeholder="max 60 - 65 words"
          onChange={(e) => setSummary(e.target.value)}
        ></textarea>

        <input type="text" value={sourceName}
          placeholder="sourceName"
          onChange={(e) => setSourceName(e.target.value)}
        />
        <input type="text" value={sourceUrl}
          placeholder="sourceUrl"
          onChange={(e) => setSourceUrl(e.target.value)}
        />
        <input type="text" value={imageUrl}
          placeholder="imageUrl"
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <input type="text" value={author}
          placeholder="added by"
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button className="news-form-group__button" type="submit">Add</button>
      </form>

      <button className="news-form__signout" onClick={() => auth.signOut()}>Sign Out</button>

      <GoBack />
    </div>
  );
};

export default NewsForm;