/* eslint-disable no-console */
import { render, screen } from '@testing-library/react';
import App from '.';

const { expect, beforeAll } = global;

const originalWarn = console.warn.bind(console.warn);
const originalLog = console.log.bind(console.log);
const originalError = console.error.bind(console.error);

beforeAll(() => {
  console.warn = msg => {
    if (
      msg?.toString().includes('indexedDB') ||
      msg?.toString().includes('Dexie')
    )
      return;
    originalWarn(msg);
  };
  console.log = msg => {
    if (
      msg?.toString().includes('indexedDB') ||
      msg?.toString().includes('Dexie')
    )
      return;
    originalLog(msg);
  };
  console.error = msg => {
    if (
      msg?.toString().includes('indexedDB') ||
      msg?.toString().includes('Dexie')
    )
      return;
    originalError(msg);
  };
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Submit/i);
  expect(linkElement).toBeInTheDocument();
});
