var React = require('react')
var queryString = require('query-string')
var api = require('../utils/api')
var Link = require('react-router-dom').Link
var PropTypes = require('prop-types')

function Player(props) {
  return (
    <div>
      <h1 className='header'>{props.label}</h1>
      <h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
    </div>
  )
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired
}

class Results extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      loser: null,
      winner: null,
      error:null,
      loading:true
    }
  }

  componentDidMount() {
    var players = queryString.parse(this.props.location.search)

    api.battle([players.playerOne, players.playerTwo])
      .then(function(results) {

        if(results === null) {
          return this.setState(function () {
              return {
                error : 'Looks like error occured',
                loading:false

              }
          })
        }

        this.setState(function() {
          return {
            winner: results[0],
            loser: results[1],
            loading:false
          }
        })
      }.bind(this))
  }

  render() {
    var winner = this.state.winner
    var loser = this.state.loser
    var error = this.state.error
    var loading = this.state.loading

    if(loading) {
      return (
        <div>
          Loading
        </div>
      )
    }

    if(error) {
      return (
        <div>
        <p>{error}</p>
        <Link to='/battle'>
          Reset
        </Link>
        </div>
      )
    }

    return (
      <div className='row'>
        <Player
          label="Winner"
          score={winner.score} />

        <Player
          label="Loser"
          score={loser.score} />
      </div>
    )
  }
}

module.exports = Results
