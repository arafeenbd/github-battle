var React = require('react')
var PropTypes = require('prop-types')
var Link = require('react-router-dom').Link
var PlayerPreview = require('./PlayerPreview')

class PlayerInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    var value = event.target.value
    this.setState(function(){
      return {
        username:value
      }
    })
  }

  handleSubmit(event) {
    this.props.onSubmit(
      this.props.id,
      this.state.username
    )

    event.preventDefault()
  }

  render () {
    return (
      <form className='column' onSubmit={this.handleSubmit}>
        <label className='header' htmlFor='username'>
          {this.props.label}
        </label>
        <input
          id='username'
          placeholder='github username'
          type='text'
          autoComplete='off'
          value={this.state.username}
          onChange={this.handleChange}
          />
        <button
          className='button'
          type='submit'>
            Submit
        </button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id:PropTypes.string.isRequired,
  label:PropTypes.string.isRequired,
  onSubmit:PropTypes.func.isRequired
}

class Battle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playerOne:'',
      playerOneImage:null,
      playerTwo:'',
      playerTwoImage:null
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  handleSubmit(id, username) {
    this.setState(function() {
        var newState = {}
        newState[id] = username
        newState[id + 'Image'] = 'https://github.com/' + username + '.png?size'
        return newState
    })
  }

  handleReset(id) {
    this.setState(function() {
      var newState = {}
      newState[id] = ''
      newState[id+'Image'] = null
      return newState
    })
  }

  render() {
    var playerOne = this.state.playerOne
    var playerTwo = this.state.playerTwo
    var playerOneImage = this.state.playerOneImage
    var playerTwoImage = this.state.playerTwoImage
    var match = this.props.match

    return (
      <div>
        <div className='row'>
          {!playerOne &&
            <PlayerInput
              id='playerOne'
              label='Player One'
              onSubmit={this.handleSubmit}/>}

          {
            playerOneImage !== null &&
            <PlayerPreview
              username={playerOne}
              image={playerOneImage}>
              <button
                className='reset'
                onClick={this.handleReset.bind(null, 'playerOne')}>
                  Reset
              </button>
            </PlayerPreview>
          }
          {!playerTwoImage &&
            <PlayerInput
              id='playerTwo'
              label='Player Two'
              onSubmit={this.handleSubmit} />}
          {
            playerTwoImage !== null &&
            <PlayerPreview
              username={playerTwo}
              image={playerTwoImage}>
              <button
                className='reset'
                onClick={this.handleReset.bind(null, 'playerTwo')}>
                  Reset
              </button>
            </PlayerPreview>
          }
        </div>
        { playerOneImage && playerTwoImage &&
          <Link className='button'
            to={{
                  pathname: match.url + '/results',
                  search: '?playerOne=' + playerOne + '&playerTwo=' + playerTwo
                }}>
            Battle
          </Link>
        }
      </div>
    )
  }
}

module.exports = Battle
