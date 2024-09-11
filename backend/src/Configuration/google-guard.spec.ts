import { GoogleAuthGuard } from '../guards/google.guards'
describe('GoogleAuthGuard', () => {
  it('should be defined', () => {
    expect(new GoogleAuthGuard()).toBeDefined();
  });
});
