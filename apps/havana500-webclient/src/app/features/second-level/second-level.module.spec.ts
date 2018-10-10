import { SecondLevelModule } from './second-level.module';

describe('SecondLevelModule', () => {
  let secondLevelModule: SecondLevelModule;

  beforeEach(() => {
    secondLevelModule = new SecondLevelModule();
  });

  it('should create an instance', () => {
    expect(secondLevelModule).toBeTruthy();
  });
});
