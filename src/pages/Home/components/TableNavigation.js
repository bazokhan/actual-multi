import PropTypes from 'prop-types';
import { Grid, IconButton, Text } from '@chakra-ui/react';
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ArrowRightIcon,
  ArrowLeftIcon
} from '@chakra-ui/icons';

const TableNavigation = ({
  pageNumber,
  totalPagesNumber,
  isFirstPage,
  isLastPage,
  getLastPage,
  getFirstPage,
  getPrevPage,
  getNextPage,
  ...props
}) => (
  <Grid
    gridTemplateColumns="auto auto 1fr auto auto"
    height="100%"
    overflowY="auto"
    {...props}
  >
    <IconButton
      colorScheme="gray"
      onClick={getFirstPage}
      isDisabled={isFirstPage}
      icon={<ArrowLeftIcon />}
    />
    <IconButton
      colorScheme="gray"
      onClick={getPrevPage}
      isDisabled={isFirstPage}
      icon={<ChevronLeftIcon />}
    />
    <Text>
      Page {pageNumber} of {totalPagesNumber}
    </Text>
    <IconButton
      colorScheme="gray"
      onClick={getNextPage}
      isDisabled={isLastPage}
      icon={<ChevronRightIcon />}
    />
    <IconButton
      colorScheme="gray"
      onClick={getLastPage}
      isDisabled={isLastPage}
      icon={<ArrowRightIcon />}
    />
  </Grid>
);

TableNavigation.propTypes = {
  pageNumber: PropTypes.number.isRequired,
  totalPagesNumber: PropTypes.number.isRequired,
  isFirstPage: PropTypes.bool.isRequired,
  isLastPage: PropTypes.bool.isRequired,
  getLastPage: PropTypes.func.isRequired,
  getFirstPage: PropTypes.func.isRequired,
  getPrevPage: PropTypes.func.isRequired,
  getNextPage: PropTypes.func.isRequired
};

export default TableNavigation;
