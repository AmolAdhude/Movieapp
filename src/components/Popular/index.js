import './index.css'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Header from '../Header'
import FailureView from '../FailureView'
import Footer from '../Footer'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Popular extends Component {
  state = {
    popularData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.renderPopularMoviesData()
  }

  renderPopularMoviesData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    console.log(response)
    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = fetchedData.results.map(eachMovie => ({
        title: eachMovie.title,
        backdropPath: eachMovie.backdrop_path,
        overview: eachMovie.overview,
        id: eachMovie.id,
        posterUrl: eachMovie.poster_path,
      }))
      this.setState({
        popularData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderSuccessView = () => {
    const {popularData} = this.state

    return (
      <div className="popular-movie-container">
        <ul className="popular-ul-container">
          {popularData.map(each => (
            <Link to={`/movies/${each.id}`} key={each.id} target="blank">
              <li className="popular-li-item" key={each.id}>
                <img
                  className="popular-poster"
                  src={each.posterUrl}
                  alt={each.title}
                />
              </li>
            </Link>
          ))}
        </ul>
      </div>
    )
  }

  onRetry = () => {
    this.renderPopularMoviesData()
  }

  renderFailureView = () => <FailureView onRetry={this.onRetry} />

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader
        testid="loader"
        type="TailSpin"
        height={35}
        width={380}
        color="#D81F26"
      />
    </div>
  )

  renderPopularMovies = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="Popular-container">
        <Header />
        <div className="popular-result-container">
          {this.renderPopularMovies()}
        </div>
        <Footer />
      </div>
    )
  }
}

export default Popular
