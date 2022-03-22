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
  const [isNewsSearch, setIsNewsSearch] = React.useState(false);
  const [isNewsSaved, setIsNewsSaved] = React.useState(false);
  const [savedArticles, setSavedArticles] = React.useState([]);
  const [errorMessage, setErrorMessage] = React.useState('');
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
        setIsNewsSearch(true);
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
          return setErrorMessage('the user with the specified email not found');
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
        setErrorMessage('one or more of the fields were not provided');
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

  const handleSavedArticles = () => {
    auth
      .getArticles(jwt)
      .then((data) => {
        console.log(data);
        setIsNewsSaved(true);
        setSavedArticles(data.data);
      })
      .catch((err) => console.log(err));
    history.push('/articles');
  };

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

  const handleSaveArticle = (data) => {
    console.log(data);
    auth
      .saveArticles(data, jwt)
      .then((data) => {
        setSavedArticles([data.data, ...savedArticles]);
      })
      .catch((err) => console.log(err));
  };

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
  console.log(savedArticles);
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
            onClick={isNewsSaved ? handleDeleteArticle : handleSaveArticle}
            username={username}
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
            onClick={isNewsSaved ? handleDeleteArticle : handleSaveArticle}
          />
        </ProtectedRoute>
      </Switch>
      <SignIn
        isOpen={isSigninOpen}
        onClose={handleOnClose}
        onSignUp={handleSignupPopup}
        onSignInSubmit={handleSignIn}
      />
      <SignUp
        isOpen={isSignupOpen}
        onClose={handleOnClose}
        onSignIn={handleSigninPopup}
        onSignUpSubmit={handleSignUp}
      />
    </>
  );
}

export default App;
