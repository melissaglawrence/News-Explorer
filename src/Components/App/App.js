import React from 'react';
import { useHistory, Route, Switch, Redirect } from 'react-router-dom';
import '../../App.css';
import api from '../../utils/newsApi';
import Main from '../Main/Main';
import SavedNews from '../SavedNews/SavedNews';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SuccessPopup from '../SuccessPopup/SuccessPopup';
import * as auth from '../../utils/auth';

function App() {
  const [isSigninOpen, setIsSigninOpen] = React.useState(false);
  const [isSignupOpen, setIsSignupOpen] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [news, setNews] = React.useState([]);
  const [isPreloaderOpen, setIsPreloaderOpen] = React.useState(false);
  const [isNews, setIsNews] = React.useState(false);
  const [isNewsSaved, setIsNewsSaved] = React.useState(false);
  const [savedArticles, setSavedArticles] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [tooltip, setTooltip] = React.useState('Save article');
  const history = useHistory();

  const handleOnClose = () => {
    setIsSigninOpen(false);
    setIsSignupOpen(false);
  };

  const handleSigninPopup = () => {
    setIsSignupOpen(false);
    setIsSigninOpen(true);
  };

  const handleSignupPopup = () => {
    setIsSigninOpen(false);
    setIsSignupOpen(true);
  };

  const handleGetNews = (search) => {
    setIsPreloaderOpen(true);
    api
      .getNews(search)
      .then((data) => {
        setNews(data.articles);
        setIsNews(true);
        setIsPreloaderOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const jwt = localStorage.getItem('jwt');
  const username = localStorage.getItem('username');
  const tokenCheck = React.useCallback(() => {
    if (jwt) {
      auth
        .getUser(jwt)
        .then((data) => {
          if (data) {
            console.log(data);
            setCurrentUser(data);
            setIsLogin(true);
          } else {
            setErrorMessage(
              'Token not provided or provided in the wrong format',
            );
          }
        })
        .catch(() => {
          setErrorMessage('The provided token is invalid ');
        });
    }
    return;
  }, [jwt]);

  React.useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  React.useEffect(() => {
    auth
      .getUserInfo(jwt)
      .then((data) => {
        setCurrentUser(data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [jwt]);

  const handleSignIn = (data) => {
    auth
      .signIn(data)
      .then((data) => {
        if (!data) {
          return setErrorMessage('Incorrect email or password');
        }
        if (data) {
          tokenCheck();
          setErrorMessage('');
          setIsSigninOpen(false);
          setIsLogin(true);
          return;
        }
      })
      .catch(() => {
        setErrorMessage('Incorrect email or password');
      });
  };

  const handleSignUp = (data) => {
    auth
      .signUp(data)
      .then((res) => {
        if (res) {
          setErrorMessage('');
          setIsSignupOpen(false);
          setIsLogin(true);
          return;
        } else {
          return setErrorMessage('One of the fields was filled in incorrectly');
        }
      })
      .catch(() => {
        return setErrorMessage('An error occured');
      });
  };

  const handleLogOut = () => {
    setIsLogin(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
  };

  //saved articles tab
  const handleSavedArticles = () => {
    auth
      .getArticles(jwt)
      .then((data) => {
        setSavedArticles(data.data);
      })
      .catch((err) => console.log(err));
    history.push('/articles');
  };

  //saved articles tab updates when an article is deleted
  React.useEffect(() => {
    auth
      .getArticles(jwt)
      .then((res) => {
        setSavedArticles(res.map((articles) => articles));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [history, jwt]);

  // React.useEffect((data) => {
  //   getSavedArticles();
  // }, []);

  // const getSavedArticles = (data) => {
  //   if (!data._id) {
  //     console.log(data);
  //     setIsNewsSaved(false);
  //     setTooltip('Save article');
  //   }
  //   setIsNewsSaved(true);
  //   setTooltip('Delete article');
  // };

  //saving an article
  const handleSaveArticle = (data) => {
    console.log(data);
    if (!data._id) {
      auth
        .saveArticles(data, jwt)
        .then((data) => {
          setSavedArticles([data.data, ...savedArticles]);
        })
        .catch((err) => console.log(err));
    }
    handleDeleteArticle(data);
  };

  //deleting an article
  const handleDeleteArticle = (data) => {
    console.log(data);
    auth
      .deleteArticle(data._id, jwt)
      .then(() => {
        setSavedArticles(
          savedArticles.filter((article) => article._id !== data._id),
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Switch>
        <Route exact path='/'>
          <Main
            onSignIn={handleSigninPopup}
            onSubmit={handleGetNews}
            isNews={isNews}
            isNewsSaved={isNewsSaved}
            news={news}
            isLoggedIn={isLogin}
            onSavedArticles={handleSavedArticles}
            onSignOut={handleLogOut}
            isUser={username}
            onClick={handleSaveArticle}
            username={username}
            tooltip={tooltip}
            signIn={handleSigninPopup}
          />
        </Route>
        <ProtectedRoute path='/articles' login={isLogin}>
          <SavedNews
            isNewsSaved={isNewsSaved}
            news={savedArticles}
            isLoggedIn={isLogin}
            savedArticleLength={savedArticles.length}
            username={username}
            onSignOut={handleLogOut}
            onClick={handleSaveArticle}
            tooltip={tooltip}
          />
        </ProtectedRoute>
      </Switch>
      <SignIn
        isOpen={isSigninOpen}
        onClose={handleOnClose}
        onSignUp={handleSignupPopup}
        onSignInSubmit={handleSignIn}
        errorMessage={errorMessage}
      />
      <SignUp
        isOpen={isSignupOpen}
        onClose={handleOnClose}
        onSignIn={handleSigninPopup}
        onSignUpSubmit={handleSignUp}
        errorMessage={errorMessage}
      />
    </>
  );
}

export default App;

