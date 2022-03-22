import React from 'react';

function SearchForm(props) {
  const [searchInput, setSearchInput] = React.useState('');

  const handleGetInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(searchInput);
  };
  return (
    <>
      <form className='search' onSubmit={handleOnSubmit}>
        <input
          className='search__input'
          type='text'
          placeholder='Enter topic'
          onChange={handleGetInput}
          value={searchInput}
        />
        <button className='search__button'>Search</button>
      </form>
    </>
  );
}

export default SearchForm;
