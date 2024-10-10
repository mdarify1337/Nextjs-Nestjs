import { GithubAuthGuard } from "src/guards/github.guards";
describe('GithubAuthGuard', () => {
  it('should be defined', () => {
    expect(new (GithubAuthGuard)).toBeDefined();
  });
});
