import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import TrendingMovies from '../TrendingNow'
import Originals from '../Originals'
import TopRated from '../TopRated'
import Footer from '../Footer'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    initialPoster: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getHomePagePoster()
  }

  getHomePagePoster = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)
    const apiUrl = `https://apis.ccbp.in/movies-app/trending-movies`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      // console.log(data)
      const fetchedDataLength = data.results.length
      const randomPoster =
        data.results[Math.floor(Math.random() * fetchedDataLength)]
      const updatedData = {
        id: randomPoster.id,
        backdropPath: randomPoster.backdrop_path,
        title: randomPoster.title,
        overview: randomPoster.overview,
        posterPath: randomPoster.poster_path,
      }
      // console.log(updatedData)
      this.setState({
        initialPoster: {...updatedData},
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onRetry = () => {
    this.getHomePagePoster()
  }

  renderFailureView = () => (
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

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader
        testid="loader"
        type="TailSpin"
        height={35}
        width={380}
        color=" #D81F26"
      />
    </div>
  )

  renderSuccessView = () => {
    const {initialPoster} = this.state
    const {backdropPath, title, overview} = initialPoster
    return (
      <>
        <div
          className="devices-container"
          alt={title}
          style={{
            background: `linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(24, 24, 24, 0.546875) 38.26%, #181818 92.82%, #181818 98.68%, #181818 108.61%),url(${backdropPath})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            minHeight: '605px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Header className="header-opacity" />
          <div className=" home-header-content heading-container">
            <h1 className=" movie-details-name home-poster-title" key={title}>
              {title}
            </h1>
            <h1
              className=" movie-details-description home-poster-overview"
              key={overview}
            >
              {overview}
            </h1>
            <button
              className=" movies-details-play-button  home-poster-play-btn"
              type="button"
            >
              Play
            </button>
          </div>
        </div>
      </>
    )
  }

  renderHomePoster = () => {
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
      <div className="root-container">
        {this.renderHomePoster()}
        <div className="bottom-container">
          <div className="main-container">
            <h1 className="section-heading">Trending Now</h1>
            <div className="slick-container">
              <TrendingMovies />
            </div>
          </div>
          <div className="main-container">
            <h1 className="section-heading">Top Rated</h1>
            <div className="slick-container">
              <TopRated />
            </div>
          </div>
          <div className="main-container">
            <h1 className="section-heading">Originals</h1>
            <div className="slick-container">
              <Originals />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}
export default Home
