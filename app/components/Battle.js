var React = require('react')
var PropTypes = require('prop-types')

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

    return (
      <div>
        {!playerOne &&
          <PlayerInput
            id='playerOne'
            label='Player One'
            onSubmit={this.handleSubmit}/>}

        {
          playerOneImage !== null &&
          <PlayerPreview
            username={playerOne}
            image={playerOneImage}
            onReset={this.handleReset}/>
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
            image={playerTwoImage}
            onReset={this.handleReset}/>
        }
      </div>
    )
  }
}

function PlayerPreview(props) {
  return (
    <div>
      <div className='column'>
        <img
          className='avatar'
          src={props.image}
          alt={'Avator for' + props.username}
        />
        <h2 className='username'>@{props.username}</h2>
      </div>
      <button
        className='reset'>
          Reset
      </button>
    </div>
  )
}

PlayerPreview.propTypes = {
  username : PropTypes.string.isRequired,
  image : PropTypes.string.isRequired
}

module.exports = Battle
