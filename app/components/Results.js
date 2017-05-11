var React = require('react')
var queryString = require('query-string')
var api = require('../utils/api')
var Link = require('react-router-dom').Link

class Results extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      loser: null,
      winner: null
    }
  }

  componentDidMount() {
    var players = queryString.parse(this.props.location.search)

    api.battle([players.playerOne, players.playerTwo])
      .then(function(results) {

        if(results === null) {
          return this.setState(function () {
              return {
                error : 'Looks like error occured'
              }
          })
        }

        this.setState(function() {
          return {
            winner: results[0],
            loser: results[1]
          }
        })
      }.bind(this))
  }

  render() {
    var winner = this.state.winner
    var loser = this.state.loser

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
      <div>
        Loser: {JSON.stringify(winner)}
      </div>
    )
  }
}

module.exports = Results
