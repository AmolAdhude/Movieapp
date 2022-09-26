import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

/* Add css to your project */
import './index.css'

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TrendingMovies extends Component {
  state = {
    trendingNowData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount = () => {
    this.getTrendingNowData()
  }

  getTrendingNowData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/trending-movies'
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
        trendingNowData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  trendingNow = () => {
    const {trendingNowData} = this.state
    return (
      <Slider {...settings}>
        {trendingNowData.map(eachMovie => (
          <Link to={`/movies/${eachMovie.id}`} key={eachMovie.id}>
            <div className="slick-item" key={eachMovie.id}>
              <img
                className="logo-image"
                src={eachMovie.backdropPath}
                alt="movie poster"
              />
            </div>
          </Link>
        ))}
      </Slider>
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

  renderTrendingNowFailureView = () => (
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
        return this.trendingNow()
      case apiStatusConstants.failure:
        return this.renderTrendingNowFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default TrendingMovies
