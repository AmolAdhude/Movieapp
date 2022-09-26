import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

/* Add css to your project */
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TopRated extends Component {
  state = {
    topRatedData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.getTopRatedData()
  }

  getTopRatedData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/top-rated-movies'
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
        topRatedData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  topRated = () => {
    const {topRatedData} = this.state
    return (
      <ul className="top-rated">
        {topRatedData.slice(Math.floor(Math.random() * 7 + 1), 9).map(
          (eachMovie, i) =>
            i < 2 && (
              <Link to={`/movies/${eachMovie.id}`} key={eachMovie.id}>
                <li className="slick-item" key={eachMovie.id}>
                  <img
                    className="top-rated-image"
                    src={eachMovie.backdropPath}
                    alt="movie poster"
                  />
                </li>
              </Link>
            ),
        )}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="trendingnow-loader-container">
      <Loader
        type="TailSpin"
        height="42.67px"
        width="42.67px"
        color="#D81F26"
      />
    </div>
  )

  retryAgain = () => this.trendingNow()

  renderTopRatedFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/dug30iszj/image/upload/v1664109617/MovieApp/Icon_joakz9.png"
        className="warning"
        alt="failure view"
      />
      <p className="failure-reason">Something went wrong. Please try again</p>
      <button type="button" className="try-again" onClick={this.onRetry}>
        Try Again
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.topRated()
      case apiStatusConstants.failure:
        return this.renderTopRatedFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default TopRated
