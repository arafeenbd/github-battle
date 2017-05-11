var React = require('react')
var queryString = require('query-string')
var api = require('../utils/api')

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

    return (
      <div>
        Loser: {JSON.stringify(winner)}
      </div>
    )
  }
}

module.exports = Results
