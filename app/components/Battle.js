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
      playerOneImage:'',
      playerTwo:'',
      playerTwoImage:''
    }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(id, username) {
    this.setState(function() {
        var newState = {}
        newState[id] = username
        newState[id + 'Image'] = 'https://github.com/' + username + '.png?size'
        return newState
    })

  }
  render() {
    var playerOne = this.state.playerOne
    var playerTwo = this.state.playerTwo

    return (
      <div>
      {!playerOne &&
        <PlayerInput
          id='playerOne'
          label='Player One'
          onSubmit={this.handleSubmit}/>}
      {!playerTwo &&
        <PlayerInput
          id='playerTwo'
          label='Player Two'
          onSubmit={this.handleSubmit} />}
      </div>
    )
  }
}

module.exports = Battle
