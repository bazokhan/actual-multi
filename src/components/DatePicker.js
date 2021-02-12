import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Grid,
  IconButton,
  useColorMode
} from '@chakra-ui/react';
import { observer } from 'mobx-react';
import { motion } from 'framer-motion';
import {
  ChevronLeftIcon,
  ChevronRightIcon
} from '@chakra-ui/icons';
import { MONTHS } from '../constants';
import range from '../helpers/range';

const MotionGrid = observer(motion.custom(Grid));

const DatePicker = ({ store, isFixed, ...props }) => {
  const { colorMode } = useColorMode();
  const isInvalid = !store.raw;
  if (isInvalid) {
    return null;
  }
  const { year, month, day } = store;
  const years = range(year - 4, year + 4);
  const days = store.daysInCurrentMonth;
  const position = isFixed
    ? {
        position: 'fixed',
        top: store.position?.y || 0,
        left: store.position?.x || 0,
        zIndex: 1000
      }
    : {};

  return (
    <MotionGrid
      gridTemplateColumns={`repeat(${
        store.mode !== 'day' ? 3 : 9
      },1fr)`}
      borderWidth="1px"
      borderColor={
        colorMode === 'light' ? 'bg.300' : 'bg.700'
      }
      boxShadow="md"
      p="20px"
      bg={colorMode === 'light' ? 'bg.200' : 'bg.800'}
      {...position}
      {...props}
    >
      {store.mode === 'month' ? (
        <>
          <IconButton
            padding="10px"
            size="md"
            variant="ghost"
            icon={<ChevronLeftIcon />}
            justifySelf="start"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              if (isInvalid) return;
              store.updateDate(
                new Date(year - 1, month, day)
              );
            }}
          />
          <Button
            variant="ghost"
            isActive={year === store.year}
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              if (isInvalid) return;
              store.updateMode('year');
            }}
          >
            {year}
          </Button>
          <IconButton
            padding="10px"
            size="md"
            variant="ghost"
            icon={<ChevronRightIcon />}
            justifySelf="end"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              if (isInvalid) return;
              store.updateDate(
                new Date(year + 1, month, day)
              );
            }}
          />
          {MONTHS.map((m, index) => (
            <Button
              variant="ghost"
              key={m}
              isActive={
                store.month === index && year === store.year
              }
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                store.updateDate(
                  new Date(year, index, day)
                );
                store.updateMode('day');
              }}
            >
              {m}
            </Button>
          ))}
        </>
      ) : null}
      {store.mode === 'year'
        ? years.map(datePickerYear => (
            <Button
              variant="ghost"
              key={year}
              isActive={store.year === datePickerYear}
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                if (isInvalid) return;
                store.updateDate(
                  new Date(datePickerYear, month, day)
                );
                store.updateMode('month');
              }}
            >
              {datePickerYear}
            </Button>
          ))
        : null}
      {store.mode === 'day' ? (
        <>
          <IconButton
            padding="10px"
            size="md"
            variant="ghost"
            icon={<ChevronLeftIcon />}
            justifySelf="start"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              if (isInvalid) return;
              store.updateDate(
                new Date(year, month - 1, day)
              );
            }}
          />
          <Button
            variant="ghost"
            gridColumn="2 / 9"
            isActive={year === store.year}
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              if (isInvalid) return;
              store.updateMode('month');
            }}
          >
            {MONTHS[month]} {year}
          </Button>
          <IconButton
            padding="10px"
            size="md"
            variant="ghost"
            icon={<ChevronRightIcon />}
            justifySelf="end"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              if (isInvalid) return;
              store.updateDate(
                new Date(year, month + 1, day)
              );
            }}
          />
          {days.map(datePickerDay => (
            <Button
              variant="ghost"
              width="20px"
              minWidth="20px"
              paddingLeft="2px"
              paddingRight="2px"
              fontSize="12px"
              height="20px"
              key={datePickerDay.toDateString()}
              isActive={
                store.timestamp === datePickerDay.getTime()
              }
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                store.updateDate(new Date(datePickerDay));
              }}
            >
              {datePickerDay.getDate()}
            </Button>
          ))}
        </>
      ) : null}
    </MotionGrid>
  );
};

DatePicker.propTypes = {
  store: PropTypes.object.isRequired,
  isFixed: PropTypes.bool
};

DatePicker.defaultProps = {
  isFixed: false
};

export default observer(DatePicker);
