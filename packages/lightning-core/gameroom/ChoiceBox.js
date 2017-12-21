import React from 'react'
import {Link} from 'react-router-dom'
//Components
import RaisedButton from 'material-ui/RaisedButton';
import reactCSS from 'reactcss'

const styles = reactCSS({
  default: {
    choice_box_overall: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%'
    }
  }
})
class ChoiceBox extends React.Component {
  constructor(props) {
    super(props)
    this.packet = {
      id: this.props.pubkey,
      socketId: this.props.socket.socketId
    };
  }

  handleStateRead() {
    console.log("STATE:", this.props.state);
  }
  handleCheck() {
    if (this.props.socket) {
      console.log("CHECK EMITTED");
      this.props.socket.emit('CHECK', this.props.gameState)
    } else {
      console.log("NO SOCKET");
    }
  }
  handleReady() {
    if (!this.props.socket) {
      console.log("Socket disconnected");
    }
    if (!this.props.pubkey) {
      console.log("Pubkey not available");
    }
    if (this.props.socket) {
      this.props.socket.emit('READY_UP', {
        pubkey: this.props.pubkey,
        displayName: 'Dr. Joe',
        socketId: this.props.socket.socketId
      })
    }
  }
  handleStart() {
    if (!this.props.socket) {
      console.log("Socket disconnected");
    }
    if (this.props.socket) {
      this.props.socket.emit('START_GAME', this.props.gameState)
    }
  }
  handleCall() {
    if (!this.props.socket) {
      console.log("Socket disconnected");
    }
    if (this.props.socket) {
      this.props.socket.emit('CALL', this.packet)
    }
  }
  handleBet() {
    if (!this.props.socket) {
      console.log("Socket disconnected");
    }
    if (this.props.socket) {
      this.props.socket.emit('BET', Object.assign({}, packet, {amount: 20}))
    }
  }
  handleFold() {
    if (!this.props.socket) {
      console.log("Socket disconnected");
    }
    if (this.props.socket) {
      this.props.socket.emit('FOLD', packet)
    }
  }
  render() {
    return (<div style={styles.choice_box_overall}>
      ChoiceBox
      <RaisedButton label="Log full state" onClick={() => {
          this.handleStateRead()
        }}/>
      <RaisedButton label="Check Game state" onClick={() => {
          this.handleCheck()
        }}/>
      <RaisedButton label="Ready up" onClick={() => {
          this.handleReady()
        }}/>
      <RaisedButton label="Start Game" onClick={() => {
          this.handleStart()
        }}/>
      <RaisedButton label="Call" onClick={() => {
          this.handleCall()
        }}/>
      <RaisedButton label="Bet" onClick={() => {
          this.handleBet()
        }}/>
      <RaisedButton label="Fold" onClick={() => {
          this.handleFold()
        }}/>
    </div>)
  }
}

module.exports = ChoiceBox
