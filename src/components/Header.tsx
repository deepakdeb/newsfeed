import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className='header'>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand">Newsfeed</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to='/most-viewed'>Most Viewed</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/most-shared'>Most Shared</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/most-emailed'>Most Emailed</Link>
          </li>
          </ul>
        </div>
	    </nav>
    </header>
  )
}

export default Header