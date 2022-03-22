import React from 'react';

function NewsCard(props) {
  const newDate = () => {
    const month = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const nDate = props.publishedAt.slice(0, 10);
    const splitDate = nDate.split('-');
    return `${month[splitDate[1] - 1]} ${splitDate[2]}, ${splitDate[0]}`;
  };

  const handleSave = (e) => {
    e.preventDefault();
    props.onClick(props.news);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    props.onClick(props.news);
  };

  return (
    <>
      <li className='news__item'>
        <div>
          <img className='news__img' src={props.image} />
          <button
            className={`news__button button ${
              props.isNewsSaved ? 'news__delete' : 'news__save'
            }`}
            type='button'
            aria-label='save'
            onClick={props.isNewsSaved ? handleDelete : handleSave}
          >
            <div className='news__tooltip'>
              {props.isNewsSaved ? 'Delete Article' : 'Save Article'}
            </div>
          </button>
        </div>
        <div className='news__info'>
          <p className='news__date'>{newDate()}</p>
          <h3 className='news__title'>{props.title}</h3>
          <p className='news__text'>{props.content}</p>
          <p className='news__tag'>{props.tag}</p>
        </div>
      </li>
    </>
  );
}

export default NewsCard;
