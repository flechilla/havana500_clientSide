import { CommentHomeModule } from './comment-home.module';

describe('CommentHomeModule', () => {
  let commentHomeModule: CommentHomeModule;

  beforeEach(() => {
    commentHomeModule = new CommentHomeModule();
  });

  it('should create an instance', () => {
    expect(commentHomeModule).toBeTruthy();
  });
});
