const Express = require('express');
const compression = require('compression');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const morgan = require('morgan');
const session = require('express-session');
const path = require('path');
const ExpressValidator = require('express-validator');
const LocalStrategy = require('passport-local').Strategy;
const MongoStore = require('connect-mongo')(session);
// Webpack Requirements
const webpack = require('webpack');
const config = require('../webpack.config.dev');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
// Initialize the Express App
const app = new Express();
// Run Webpack dev server in development mode
if (process.env.NODE_ENV === 'development') {
  										const compiler = webpack(config);
  										app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  										app.use(webpackHotMiddleware(compiler));
}
// React And Redux Setup
const { configureStore } = require('../client/store');
const { Provider } = require('react-redux');
const React = require('react');
const { renderToString } = require('react-dom/server');
const { match, RouterContext } = require('react-router');
const Helmet = require('react-helmet');
// var required modules
import routes from '../client/routes';
const { fetchComponentData } = require('./util/fetchData');
import users from './routes/user.routes';
import issues from './routes/issue.routes';
import projects from './routes/project.routes';
import comments from './routes/comment.routes';
import serverConfig from './config';

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;
// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error) => {
  										if (error) {
    										console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    										throw error;
  }
});
// Apply body Parser and server public assets and routes
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(Express.static(path.resolve(__dirname, '../dist/client')));
app.use(Express.static(path.resolve(__dirname, '../uploads')));
app.use(morgan('dev'));
// Configuring passport
app.use(session({
  										cookie: {
    										maxAge: 3600000000,
  },
  										secret: 'mySecretKey',
  										saveUninitialized: true,
  										resave: true,
  										store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));
app.use(passport.initialize());
app.use(passport.session());
// Using the flash middleware provided by connect-flash to store messages in session
// and displaying in templates
const flash = require('connect-flash');
app.use(flash());
app.use('/api', users);
app.use('/api', issues);
app.use('/api', projects);
app.use('/api', comments);
// passport config
const User = require('./models/user');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// Render Initial HTML
const renderFullPage = (html, initialState) => {
  										const head = Helmet.rewind();

  // Manifests
  										const assetsManifest = process.env.webpackAssets && JSON.parse(process.env.webpackAssets);
  										const chunkManifest = process.env.webpackChunkAssets && JSON.parse(process.env.webpackChunkAssets);

  										return `
    <!doctype html>
    <html>
      <head>
        ${head.base.toString()}
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}
        ${head.script.toString()}

        ${process.env.NODE_ENV === 'production' ? `<link rel='stylesheet' href='${assetsManifest['/app.css']}' />` : ''}
        <script src="https://use.fontawesome.com/98ede4ddfc.js"></script>
        <link href='https://fonts.googleapis.com/css?family=Lato:400,300,700' rel='stylesheet' type='text/css'/>
        <link rel="shortcut icon" href="../favicon.ico" type="image/png" />
        <meta charset="utf-8" />
        <title>Brightwave BIT</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
          ${process.env.NODE_ENV === 'production' ?
          `//<![CDATA[
          window.webpackManifest = ${JSON.stringify(chunkManifest)};
          //]]>` : ''}
        </script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/vendor.js'] : '/vendor.js'}'></script>
        <script src='${process.env.NODE_ENV === 'production' ? assetsManifest['/app.js'] : '/app.js'}'></script>
      </body>
    </html>
  `;
};

const renderError = err => {
  										const softTab = '&#32;&#32;&#32;&#32;';
  										const errTrace = process.env.NODE_ENV !== 'production' ?
    `:<br><br><pre style="color:red">${softTab}${err.stack.replace(/\n/g, `<br>${softTab}`)}</pre>` : '';
  										return renderFullPage(`Server Error${errTrace}`, {});
};

// Server Side Rendering based on routes matched by React-router.
app.use((req, res, next) => {
  										match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    // if not logged in, redirect to login page
    // if(req.user == null && req.url != '/login'){
    //   console.log('LOG IN NOT OK!');
    //   redirectLocation = {
    //     pathname : '/login',
    //     search: ''
    //   }
    // }
    // if logged in, redirect to selectproject page
    										if (req.user && req.url == '/login') {
      										console.log('LOG IN OK!');
      										redirectLocation = {
        										pathname: '/selectproject',
        										search: '',
      };
    }
    										if (err) {
      										return res.status(500).end(renderError(err));
    }

    										if (redirectLocation) {
      										return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    }

    										if (!renderProps) {
      										return next();
    }

    										const store = configureStore();

    										return fetchComponentData(store, renderProps.components, renderProps.params)
      .then(() => {
        										const initialView = renderToString(
          <Provider store={store}>
              <RouterContext {...renderProps} />
          </Provider>
        );
        										const finalState = store.getState();

        										res
          .set('Content-Type', 'text/html')
          .status(200)
          .end(renderFullPage(initialView, finalState));
      })
      .catch((error) => next(error));
  });
});

// start app
app.listen(serverConfig.port, (error) => {
  										if (!error) {
    console.log(`Issue Tracker is running on port: ${serverConfig.port}!`); // eslint-disable-line
  }
});

export default app;
