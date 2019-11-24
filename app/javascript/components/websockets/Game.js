import React from 'react';
import { connect } from 'react-redux';

import { entityActions, websocketActions } from 'store/actions';

import get from 'lodash/get';

class Game extends React.Component {
  static mapStateToProps = state => (
    { gameChannel: get(state, 'websockets.gameChannel') }
  );

  initializeWebsocket() {
    this.props.dispatch(websocketActions.connect('gameChannel'));

    const gameSubscription = App.cable.subscriptions.create(
      { channel: 'GameChannel' },
      {
        received: data => this.handleDataReceived(data),
        transition: data => this.handleTransition(data)
      }
    );

    this.props.dispatch(websocketActions.connected(
      {
        channel: 'gameChannel',
        subscription: {
          ...gameSubscription,
          ...gameSubscription.__proto__
        }
      }
    ));
  }

  handleDataReceived = (data) => {
    this.props.dispatch(entityActions.setEntity(data));
  };

  handleTransition = data => {
    this.props.gameChannel.perform('transition_to', data);
  };

  componentDidMount() {
    this.initializeWebsocket();
  }

  render () {
    return null;
  }
}

export default connect(Game.mapStateToProps)(Game);