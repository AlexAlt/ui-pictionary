import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { authenticationActions } from 'store/actions';

import withCurrentUser from 'components/hoc/withCurrentUser';

import Modal from './Modal';

class Login extends Component {
  static propTypes = {
    currentUser: PropTypes.object,
    dispatch: PropTypes.func.isRequired
  };

  state = { email: '' };

  handleChange = ({ target: { value } }) => {
    this.setState({ email: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.dispatch(authenticationActions.login(
      { email: this.state.email }
    )).then(() => this.setState({ email: '' }));
  };

  render() {
    return (
      <Modal visible={!this.props.currentUser}>
        <div className='Login'>
          <div className='Login__title'>
            Login to play
          </div>

          <form onSubmit={this.handleSubmit}>
            <div className='FormInput'>
              <label>Email</label>
              <input type='text' value={this.state.email} onChange={this.handleChange} />
            </div>

            <div className='Login__actions'>
              <button type='submit' className='Button Button--primary'>
                Login
              </button>
            </div>
          </form>
        </div>
      </Modal>
    )
  }
}

export default withCurrentUser(connect(Login.mapStateToProps)(Login));
