import React from 'react';
import NewsCard from '../NewsCard/NewsCard';

function NewsCardList(props) {
  const [currentIndex, setCurrentIndex] = React.useState(3);

  return (
    <>
      <section className='news'>
        <h2 className='news__search-results'>{'Search results'}</h2>
        <ul className='news__list'>
          {props.news.slice(0, currentIndex).map((article, index) => {
            return (
              <NewsCard
                key={index}
                news={article}
                link={article.url}
                image={article.urlToImage}
                title={article.title}
                content={article.content}
                tag={article.source.name}
                publishedAt={article.publishedAt}
                isLoggedIn={props.isLoggedIn}
                tooltip={props.tooltip}
                onClick={props.onClick}
                isNewsSaved={props.isNewsSaved}
                signIn={props.signIn}
              />
            );
          })}
        </ul>
        <button
          type='button'
          className='news__show-more button'
          onClick={() => setCurrentIndex(currentIndex + 3)}
        >
          Show more
        </button>
      </section>
    </>
  );
}

export default NewsCardList;
