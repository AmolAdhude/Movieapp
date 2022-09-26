import './index.css'

const FailureView = props => {
  const {onRetry} = props
  const onClickRetry = () => {
    onRetry()
  }
  return (
    <div className="failed-view">
      <img
        className="failed-image"
        src="https://res.cloudinary.com/dug30iszj/image/upload/v1663953471/MovieApp/Popular%20page/Background-Complete_lqujhu.png"
        alt="failure view"
      />
      <p className="failed-heading">Something went wrong. Please try again</p>
      <button className="retry-btn" type="button" onClick={onClickRetry}>
        Try Again
      </button>
    </div>
  )
}

export default FailureView
