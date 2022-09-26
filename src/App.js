import {Route, Switch, Redirect} from 'react-router-dom'

import LoginPage from './components/LoginPage'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Popular from './components/Popular'
import Account from './components/Account'
import SearchFilter from './components/SearchResult'
import NotFound from './components/NotFound'
import MovieDetailView from './components/MovieDetailView'
import ProfilePage from './components/ProfilePage'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/movies/:id" component={MovieDetailView} />
    <ProtectedRoute exact path="/search" component={SearchFilter} />
    <ProtectedRoute exact path="/popular" component={Popular} />
    <ProtectedRoute exact path="/Account" component={Account} />
    <ProtectedRoute exact path="/profilepage" component={ProfilePage} />

    <Route path="/not-found" component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
