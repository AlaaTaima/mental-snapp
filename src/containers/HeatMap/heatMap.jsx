import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import ReactTooltip from 'react-tooltip';
import CalenderHeatMap from 'react-calendar-heatmap';
import moment from 'moment';

import LogoHeader from '../../components/LogoHeader';
import JournalCard from '../../components/JournalCard';
import NavigationBar from '../../components/navigationBar';
import { ReactComponent as NoJournals } from '../assets/images/noJournals.svg';
import 'react-calendar-heatmap/dist/styles.css';
import './heatMap.css';

const heatMap = props => {
  const { data, journals, handleClick } = props;

  const toolTipData = value => {
    if (value.date) {
      return {
        'data-tip': `${value.date.slice(0, 10)} has ${value.count} journals`,
      };
    }
    return {
      'data-tip': 'No journals yet',
    };
  };

  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  return (
    <div className="heat-map">
      <LogoHeader />
      <h3 className="heat-map__month">
        <Icon type="calendar" className="heat-map__icon" />
        {moment().format('MMMM')}
      </h3>
      <div className="heat-map__container">
        <div className="heat-map__body">
          <CalenderHeatMap
            startDate={firstDay}
            endDate={lastDay}
            values={data}
            classForValue={value => {
              if (!value || !value.count) {
                return 'color-empty';
              }
              return `color-scale-${value.count > 4 ? 4 : value.count}`;
            }}
            tooltipDataAttrs={toolTipData}
            showWeekdayLabels={false}
            showMonthLabels={false}
            horizontal={false}
            onClick={handleClick}
          />
          <ReactTooltip />
          <div className="heat-map__legend">
            <span className="heat-map__text">less activity</span>
            <div className="heat-map__box heat-map__box--scale1" />
            <div className="heat-map__box heat-map__box--scale2" />
            <div className="heat-map__box heat-map__box--scale3" />
            <div className="heat-map__box heat-map__box--scale4" />
            <span className="heat-map__text">more activity</span>
          </div>
          <p className="heat-map__text">
            Pick a day to check your activity in it
          </p>
        </div>

        {/* here we will display any journals */}
        <div className="heat-map__journals">
          {journals.length !== 0 ? (
            journals.map(journal => (
              <Link to={`journal/${journal.id}`} key={journal.id}>
                <JournalCard
                  time={moment(journal.timestamp).format('h:mm a')}
                  date={moment(journal.timestamp).format('MMMM Do')}
                  grateful={journal.grateful.title}
                  challenge={journal.challenge.title}
                  developing={journal.developing.title}
                />
              </Link>
            ))
          ) : (
            <div className="heat-map__empty">
              <p className="heat-map__journals__message">
                no journals for this day
              </p>
              <div className="heat-map__journals__image">
                <NoJournals />
              </div>
            </div>
          )}
        </div>
      </div>
      <NavigationBar />
    </div>
  );
};

heatMap.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      count: PropTypes.number.isRequired,
    })
  ).isRequired,
  handleClick: PropTypes.func.isRequired,
  journals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      grateful: PropTypes.shape({
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
      }).isRequired,
      challenge: PropTypes.shape({
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
      }).isRequired,
      developing: PropTypes.shape({
        title: PropTypes.string.isRequired,
        body: PropTypes.string.isRequired,
      }).isRequired,
      timestamp: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default heatMap;
