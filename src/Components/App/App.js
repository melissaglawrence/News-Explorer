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
  const [isSuccessOpen, setIsSuccessOpen] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [news, setNews] = React.useState([]);
  const [isPreloaderOpen, setIsPreloaderOpen] = React.useState(false);
  const [isNews, setIsNews] = React.useState(false);
  const [isNewsFailed, setIsNewsFailed] = React.useState(false);
  const [isNewsSaved, setIsNewsSaved] = React.useState(false);
  const [savedArticles, setSavedArticles] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState('');
  const history = useHistory();

  const handleOnClose = () => {
    setIsSigninOpen(false);
    setIsSignupOpen(false);
    setIsSuccessOpen(false);
    setErrorMessage('');
  };

  const handleSigninPopup = () => {
    setIsSignupOpen(false);
    setIsSigninOpen(true);
    setIsSuccessOpen(false);
  };

  const handleSignupPopup = () => {
    setIsSigninOpen(false);
    setIsSignupOpen(true);
    setIsSuccessOpen(false);
  };

  const handleGetNews = (search) => {
    setIsPreloaderOpen(true);
    setIsNewsFailed(false);
    setIsNews(true);
    api
      .getNews(search)
      .then((data) => {
        if (data.totalResults > 0) {
          setNews(data.articles);
          setIsNews(true);
          setIsNewsFailed(false);
          setIsPreloaderOpen(false);
          return;
        }
        setIsPreloaderOpen(true);
        setIsNewsFailed(true);
        setIsNews(true);
        setNews([]);
      })
      .catch((err) => {
        setIsPreloaderOpen(true);
        setIsNewsFailed(true);
        setIsNews(true);
        setNews([]);
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
          setIsSuccessOpen(true);
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

  //saving an article
  const handleSaveArticle = (data) => {
    if (!data.isSaved) {
      auth
        .saveArticles(data, jwt)
        .then((data) => {
          setSavedArticles([data.data, ...savedArticles]);
          return;
        })
        .catch((err) => console.log(err));
    }
    handleDeleteArticle(data);
  };

  //deleting an article
  const handleDeleteArticle = (data) => {
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
            isNewsFailed={isNewsFailed}
            news={news}
            isLoggedIn={isLogin}
            onSavedArticles={handleSavedArticles}
            onSignOut={handleLogOut}
            isUser={username}
            onClick={handleSaveArticle}
            username={username}
            signIn={handleSigninPopup}
            isPreloaderOpen={isPreloaderOpen}
          />
        </Route>
        <ProtectedRoute path='/articles' login={isLogin}>
          <SavedNews
            news={savedArticles}
            isLoggedIn={isLogin}
            savedArticleLength={savedArticles.length}
            username={username}
            onSignOut={handleLogOut}
            onClick={handleDeleteArticle}
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
      <SuccessPopup
        isOpen={isSuccessOpen}
        onClose={handleOnClose}
        onSignIn={handleSigninPopup}
      />
    </>
  );
}

export default App;

