import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import Preloader from '../Preloader/Preloader';

function NewsCardList(props) {
  const [currentIndex, setCurrentIndex] = React.useState(3);

  return (
    <>
      <section className='news'>
        <h2 className='news__search-results'>
          {props.isNewsFailed ? null : 'Search results'}
        </h2>
        {props.isPreloaderOpen ? (
          <Preloader isNewsFailed={props.isNewsFailed} />
        ) : null}
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
                tooltip={article.isSaved ? 'Saved!' : 'Save Article'}
                onClick={props.onClick}
                signIn={props.signIn}
                isNewsSearch={true}
                savedId={props.savedId}
              />
            );
          })}
        </ul>
        {props.isNewsFailed ? null : (
          <button
            type='button'
            className='news__show-more button'
            onClick={() => setCurrentIndex(currentIndex + 3)}
          >
            Show more
          </button>
        )}
      </section>
    </>
  );
}

export default NewsCardList;
