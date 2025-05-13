import { IUserRepository } from "../../../user/repositories/IUserRepository";
import { Post } from "../../entities/Post";
import { IPostRepository } from "../../repositories/IPostRepository";
import { PostService } from "../PostService";


describe('PostService', () => {
  let postRepoMock: jest.Mocked<IPostRepository>;
  let userRepoMock: jest.Mocked<IUserRepository>;
  let service: PostService;

  beforeEach(() => {
    postRepoMock = {
      getPost: jest.fn(),
      getPostById: jest.fn(),
      createPost: jest.fn(),
      updatePost: jest.fn(),
      deletePost: jest.fn(),
      searchPost: jest.fn(),
    };
    userRepoMock = {
      getUser: jest.fn(),
      getUserById: jest.fn(),
      getUserByEmail: jest.fn(),
      createUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    };
    service = new PostService(postRepoMock, userRepoMock);
  });

  describe('getPost', () => {
    it('should return list with posts', async () => {
      const posts = [{ id: 1, title: 'T', subtitle:'Sub', content: 'C', user_id: 2 }] as Post[];
      postRepoMock.getPost.mockResolvedValue(posts);

      const result = await service.getPost(10, 1);
      expect(postRepoMock.getPost).toHaveBeenCalledWith(10, 1);
      expect(result).toEqual(posts);
    });
  });

  describe('getPostById', () => {
    it('should return post if exists', async () => {
      const post = { id: 3, title: 'T', subtitle:'Sub', content: 'C', user_id: 2 } as Post;
      postRepoMock.getPostById.mockResolvedValue(post);

      const result = await service.getPostById(3);
      expect(postRepoMock.getPostById).toHaveBeenCalledWith(3);
      expect(result).toBe(post);
    });

    it('should throw error if not exists', async () => {
      postRepoMock.getPostById.mockResolvedValue(null);
      await expect(service.getPostById(99))
        .rejects
        .toThrow('Post with this ID not found.');
    });
  });

  describe('createPost', () => {
    const validPost = { title: 'T', subtitle:'Sub', content: 'DD', user_id: 2 } as Post;
    it('should create post if valid', async () => {
      userRepoMock.getUserById.mockResolvedValue({ id: 1, name: 'U', email: 'u@u.com' } as any);
      postRepoMock.createPost.mockResolvedValue({ ...validPost, id: 10 });

      const result = await service.createPost(validPost);
      expect(userRepoMock.getUserById).toHaveBeenCalledWith(validPost.user_id);
      expect(postRepoMock.createPost).toHaveBeenCalledWith(validPost);
      expect(result).toEqual({ ...validPost, id: 10 });
    });

    it('shoul throw error if not exists', async () => {
      userRepoMock.getUserById.mockResolvedValue(null);
      await expect(service.createPost(validPost))
        .rejects
        .toThrow('User with this ID not found.');
    });

    it('should throw error if title or content are missing', async () => {
      userRepoMock.getUserById.mockResolvedValue({ id: 1 } as any);
      await expect(service.createPost({ ...validPost, title: '' }))
        .rejects
        .toThrow('Title and content are required.');
      await expect(service.createPost({ ...validPost, content: '' }))
        .rejects
        .toThrow('Title and content are required.');
    });
  });

  describe('updatePost', () => {
    it('should update post if exists', async () => {
      const existing = { id: 5, title: 'Old', subtitle: 'subt', content: 'C', user_id: 2 } as Post;
      postRepoMock.getPostById.mockResolvedValue(existing);
      postRepoMock.updatePost.mockResolvedValue({ ...existing, title: 'New' });

      const result = await service.updatePost(5, { title: 'New' });
      expect(postRepoMock.getPostById).toHaveBeenCalledWith(5);
      expect(postRepoMock.updatePost).toHaveBeenCalledWith(5, { title: 'New' });
      expect(result).toEqual({ ...existing, title: 'New' });
    });

    it('should throw error if not exists', async () => {
      postRepoMock.getPostById.mockResolvedValue(null);
      await expect(service.updatePost(42, { title: 'X' }))
        .rejects
        .toThrow('Post with this ID not found.');
    });
  });

  describe('deletePost', () => {
    it('should call getPostById and deletePost', async () => {
      const existing = { id: 7, title: 'T', subtitle: 'ST', content: 'C', user_id: 3 } as Post;
      postRepoMock.getPostById.mockResolvedValue(existing);
      postRepoMock.deletePost.mockResolvedValue(undefined);

      const result = await service.deletePost(7);
      expect(postRepoMock.getPostById).toHaveBeenCalledWith(7);
      expect(postRepoMock.deletePost).toHaveBeenCalledWith(7);
      expect(result).toBeUndefined();
    });

    it('should throw error if post not found', async () => {
      postRepoMock.getPostById.mockResolvedValue(null);
      await expect(service.deletePost(100))
        .rejects
        .toThrow('Post with this ID not found.');
    });
  });

  describe('searchPost', () => {
    it('should return postlist with this keyword if exists', async () => {
      const results = [{ id: 2, title: 'Foo', content: 'Bar', subtitle: 'Sub', user_id: 1 }] as Post[];
      postRepoMock.searchPost.mockResolvedValue(results);

      const res = await service.searchPost('Foo');
      expect(postRepoMock.searchPost).toHaveBeenCalledWith('Foo');
      expect(res).toEqual(results);
    });

    it('should throw error if post with this keyword doesnt exists', async () => {
      postRepoMock.searchPost.mockResolvedValue([]);
      await expect(service.searchPost('Nada'))
        .rejects
        .toThrow('Posts with this keyword not found.');
    });
  });
});
