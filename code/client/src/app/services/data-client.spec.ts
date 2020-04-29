import { DataClient } from './data-client';

describe('DataClient', () => {
  it('should create an instance', () => {
    expect(new DataClient(null)).toBeTruthy();
  });
});
