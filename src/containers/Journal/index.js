import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { Icon, Popconfirm } from 'antd';
import BackButton from '../../components/BackButton';
import JournalComponent from '../../components/Journal';

import './journal.css';

class Journal extends Component {
  state = {
    journal: {
      grateful: {
        title: 'Family',
        body:
          'some dummy and very stupid data, some dummy and very stupid data, some dummy and very stupid data',
      },
      developing: {
        title: 'not finding time',
        body:
          'some dummy and very stupid data, some dummy and very stupid data, some dummy and very stupid data, some dummy and very stupid data, some dummy and very stupid data',
      },
      challenge: {
        title: 'reading more books',
        body:
          'some dummy and very stupid data, some dummy and very stupid data',
      },
      timestamp: '2019-10-30T09:17:27.037Z', // It will be stored in DB as an ISO string
    },
    history: '',
  };

  handleConfirm = e => {
    const { history } = this.state;
    history.push('/home');
  };

  handleGoBack = e => {
    const { history } = this.state;
    history.push('/home');
  };

  render() {
    const { journal } = this.state;
    return (
      <div className="journal-page">
        <div className="journal-page__header">
          <BackButton handleBack={this.handleGoBack} />
          <div>
            <Popconfirm
              title="Do you really want to delete this entry?"
              onConfirm={this.handleConfirm}
              okText="Yes"
              cancelText="cancel"
            >
              <Icon type="delete" className="header__icon" />
            </Popconfirm>
          </div>
        </div>
        <div className="journal-card__top">
          <div className="journal-card__date">
            <Icon type="calendar" className="journal-card__icon" />
            <span>
              {
                moment('2019-10-30T09:17:27.037Z')
                  .format('MMMM Do, h:mm a')
                  .split(',')[0]
              }
            </span>
          </div>
          <div className="journal-card__time">
            <Icon type="clock-circle" className="journal-card__icon" />
            <span>
              {
                moment('2019-10-30T09:17:27.037Z')
                  .format('MMMM Do, h:mm a')
                  .split(',')[1]
              }
            </span>
          </div>
        </div>
        {journal && journal.grateful && (
          <JournalComponent
            className="journal__first"
            questionTitle="Grateful for:"
            question={journal.grateful}
          />
        )}

        {journal && journal.challenge && (
          <JournalComponent
            questionTitle="Challenge:"
            question={journal.challenge}
          />
        )}
        {journal && journal.developing && (
          <JournalComponent
            questionTitle="Developing:"
            question={journal.developing}
          />
        )}
      </div>
    );
  }
}

Journal.protoTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};

export default Journal;
