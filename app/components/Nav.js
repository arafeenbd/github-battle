var React = require('react')
var NavLink = require('react-router-dom').NavLink

function Nav() {
  return (
    <ul className='nav'>
      <li>
        <NavLink activeClassName='active' to='/'>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/batlle'>
          Battle
        </NavLink>
      </li>
      <li>
        <NavLink activeClassName='active' to='/popular'>
         Popular
        </NavLink>
      </li>
    </ul>
  )
}

module.exports = Nav;
