import React, { Component, lazy, Suspense } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import requireAuth from './HOC/authenticate';
import { signout } from '../actions/Authentication';

// Let us code split the app;
const Blogs = lazy(() =>
  import(/* webpackChunkName: "postindex" */ './post_index')
);
const PostNew = lazy(() =>
  import(/* webpackChunkName: "postnew" */ './post_new')
);
const ViewPost = lazy(() =>
  import(/* webpackChunkName: "viewpost" */ './view_post')
);
const EditPost = lazy(() =>
  import(/* webpackChunkName: "editpost */ './edit_post')
);
const Signup = lazy(() =>
  import(/* webpackChunkName: "signiup" */ './signup_form')
);
const Signin = lazy(() =>
  import(/* webpackChunkName: "signin" */ './signin_form')
);

class Header extends Component {
  logoutUser() {
    this.props.signout(() => {
      this.props.history.push('/signin');
    });
  }

  renderAuthMode(authenticated) {
    if (authenticated) {
      return (
        <section className="navbar-section">
          <a className="btn btn-link" onClick={this.logoutUser.bind(this)}>
            Logout
          </a>
        </section>
      );
    }
    return (
      <section className="navbar-section">
        <Link to="/signup" className="btn btn-link">
          Sign Up
        </Link>
        <Link to="/signin" className="btn btn-link">
          Sign In
        </Link>
      </section>
    );
  }

  render() {
    const { authenticated } = this.props;
    return (
      <div className="contianer">
        <div className="container">
          <div className="columns">
              <header className="navbar">
                <section className="navbar-section">
                  <Link to="/" className="btn btn-link">
                    Home
                  </Link>
                  {authenticated ? (
                    <Link to="/create_post" className="btn btn-link">
                      Create Post
                    </Link>
                  ) : (
                    ''
                  )}
                </section>
                {this.renderAuthMode(authenticated)}
              </header>
          </div>
        </div>
        <Suspense fallback={<div />}>
          <Route exact path="/" component={requireAuth(Blogs)} />
          <Route path="/signin" component={Signin} />
          <Route path="/create_post" component={requireAuth(PostNew)} />
          <Route path="/edit_post/:id" component={requireAuth(EditPost)} />
        </Suspense>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { signout }
  )(Header)
);
