import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Flex,
  Grid,
  IconButton,
  Text,
  Tooltip,
  useColorMode
} from '@chakra-ui/react';
import {
  EditIcon,
  MoonIcon,
  SunIcon,
  ViewIcon
} from '@chakra-ui/icons';
import { NavLink } from 'react-router-dom';
import Cell from '../components/Cell';
import useAccounts from '../hooks/useAccounts';

const Layout = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const {
    accounts,
    loading: accountsLoading,
    error: accountsError
  } = useAccounts();

  return (
    <Grid
      h="100vh"
      w="100vw"
      overflow="hidden"
      gridTemplateColumns="100px 1fr"
      columnGap="5px"
    >
      <Flex
        direction="column"
        borderRightColor={
          colorMode === 'light' ? 'bg.300' : 'bg.700'
        }
        borderRightWidth="1px"
        justifyContent="flex-start"
        alignItems="flex-start"
        height="100%"
        oveflowY="auto"
        bg={
          colorMode === 'light' ? 'main2.200' : 'main2.800'
        }
      >
        {accounts?.map(account => (
          <Cell
            key={account.id}
            loading={accountsLoading}
            error={accountsError}
          >
            <Tooltip label={account.name}>
              <NavLink
                to={`/accounts/${account.id}`}
                style={{ display: 'block', width: '100%' }}
                activeStyle={{
                  backgroundColor:
                    colorMode === 'light'
                      ? '#A99BFF'
                      : '#3F3C64'
                }}
              >
                <Avatar
                  name={account.name}
                  src={account.picture}
                  size="sm"
                  margin="10px"
                />
              </NavLink>
            </Tooltip>
          </Cell>
        ))}

        <NavLink
          to="/reports/create"
          style={{ display: 'block', width: '100%' }}
          activeStyle={{
            backgroundColor:
              colorMode === 'light' ? '#A99BFF' : '#3F3C64'
          }}
        >
          <Flex
            direction="column"
            justifyContent="flex-start"
            margin="10px"
          >
            <EditIcon size="sm" margin="5px 0" />
            <Text fontSize="12px">Create Report</Text>
          </Flex>
        </NavLink>
        <NavLink
          to="/"
          exact
          style={{ display: 'block', width: '100%' }}
          activeStyle={{
            backgroundColor:
              colorMode === 'light' ? '#A99BFF' : '#3F3C64'
          }}
        >
          <Flex
            direction="column"
            justifyContent="flex-start"
            margin="10px"
          >
            <ViewIcon size="sm" margin="5px 0" />
            <Text fontSize="12px">Overview</Text>
          </Flex>
        </NavLink>

        <IconButton
          onClick={toggleColorMode}
          margin="10px"
          size="sm"
          icon={
            colorMode === 'light' ? (
              <MoonIcon />
            ) : (
              <SunIcon />
            )
          }
        />
      </Flex>
      <Box width="100%" height="100%" overflow="hidden">
        {children}
      </Box>
    </Grid>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
