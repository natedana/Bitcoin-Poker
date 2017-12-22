import React from 'react'
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
// Components
import Table from './Table.js';
import Pot from './Pot.js';
import Hand from './Hand.js';
import ChoiceBox from './ChoiceBox.js';

// Styles
import styles from './styles'

class Game extends React.Component {
  constructor(props) {
    super(props)
    console.log('gamestate',this.props);
  }

  render() {
    console.log();
    return (
    <div style={styles.container_overall}>
      <div name='header' style={styles.container_header}>
        <div style={ styles.container_header_item } >BALANCE: {this.props.state.core.accounts.balances.channel}</div>
        <Link to='/Lobby'><div style={styles.container_header_item}>Leave Game</div></Link>
      </div>
      <div name='body' style={styles.container_body}>
        <div name='body-top' style={styles.container_body_top}>
          <Table gameState={this.props.gameState} spread={this.props.spread} />
        </div>
        <div name='body-bottom' style={styles.container_body_bottom}>
          <div name='pot' style={styles.info_item}>
            <Pot gameState={this.props.gameState} />
          </div>
          <div name='hand' style={styles.info_item}>
            <Hand gameState={this.props.gameState}/>
          </div>
          <div name='choices' style={styles.info_item}>
            <ChoiceBox pubkey={this.props.pubkey} gameState={this.props.gameState} socket={this.props.socket} state={this.props.state} player={this.props.player}/>
          </div>
        </div>
      </div>
      <div name='footer' className={styles.container_footer}>
        <marquee style={{color: 'white'}}>{
          this.props.gameState.hand ?
          (this.props.gameState.hand.order[0] === this.props.state.core.accounts.pubkey
                ? "YOUR TURN, make a move."
                : this.props.gameState.players.filter( player => player.id === this.props.gameState.hand.order[0])[0].displayName + " is playing.")
          : ""
        }</marquee>
      </div>
    </div>
  )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // onUserMadeMove: (move) => dispatch(userMadeMove(move)),
  };
};

const mapStateToProps = (state) => {
  return {
    gameState: state.core.game,
    socket: state.core.socket,
    player: state.core.player,
    state: state,
    pubkey: state.core.accounts.pubkey,
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Game);
