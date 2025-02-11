import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { TagService } from './tag.service';
import { Tag } from './tag.entity/tag.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as fs from 'fs';

type MockType<T> = {
  [P in keyof T]?: jest.Mock<any>;
};

describe('TagService', () => {
  process.env.SERVER_ADDRESS = 'http://testhost:3000';
  let service: TagService;
  let repositoryMock: MockType<Repository<any>>;

  beforeEach(async () => {
    repositoryMock = {
      find: jest.fn(),
      findOne: jest.fn(),
      save: jest.fn(),
      createQueryBuilder: jest.fn().mockReturnValue({
        delete: jest.fn().mockReturnThis(),
        from: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        execute: jest.fn().mockResolvedValue({ affected: 1 }),
      }),
      delete: jest.fn().mockResolvedValue({ affected: 1 }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TagService,
        {
          provide: getRepositoryToken(Tag),
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<TagService>(TagService);

    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    jest.spyOn(fs, 'rename').mockImplementation((oldPath, newPath, callback) => callback(null));
    jest.spyOn(fs, 'unlink').mockImplementation((path, callback) => callback(null));
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getTagsByFamily', () => {
    it('should return an array of tags for the given family', async () => {
      const mockTags = [
        { id: 1, name: 'Tag1', icon: 'icon1.png', family: 'technology' },
        { id: 2, name: 'Tag2', icon: 'icon2.png', family: 'technology' },
        { id: 3, name: 'Tag3', icon: 'icon3.png', family: 'technology' },
      ];
      repositoryMock.find.mockResolvedValue(mockTags);

      const result = await service.getTagsByFamily('technology');
      expect(result).toEqual(mockTags);
      expect(repositoryMock.find).toHaveBeenCalledWith({
        select: ['id', 'name', 'icon', 'family'],
        where: [{ family: 'technology'}],
      });
    });

    it('should return an empty array if no tags are found', async () => {
      repositoryMock.find.mockResolvedValue([]);
      
      const result = await service.getTagsByFamily('language');
      expect(result).toEqual([]);
      expect(repositoryMock.find).toHaveBeenCalledWith({
        select: ['id', 'name', 'icon', 'family'],
        where: [{ family: 'language'}],
      });
    });
  });

  describe('getAllTagsNames', () => {
    it('should return an array of all the tags', async () => {
      const mockTags = [
        { id: 1, name: 'Tag1', icon: 'icon1.png', family: 'environment' },
        { id: 2, name: 'Tag2', icon: 'icon2.png', family: 'environment' },
        { id: 3, name: 'Tag3', icon: 'icon3.png', family: 'technology' },
        { id: 4, name: 'Tag4', icon: 'icon4.png', family: 'environment' },
        { id: 5, name: 'Tag5', icon: 'icon5.png', family: 'technology' },
      ];
      repositoryMock.find.mockResolvedValue(mockTags);

      const result = await service.getAllTagsNames();
      expect(result).toEqual(mockTags);
      expect(repositoryMock.find).toHaveBeenCalledWith({
        select: ['id', 'name', 'family'],
      });
    });

    it('should return an empty array if no tags are found', async () => {
      repositoryMock.find.mockResolvedValue([]);

      const result = await service.getAllTagsNames();
      expect(result).toEqual([]);
      expect(repositoryMock.find).toHaveBeenCalledWith({
        select: ['id', 'name', 'family'],
      });
    });
  });

  describe('createTagIcon', () => {
    const mockTag = { name: 'test-tag', icon: 'old-icon.png', family: 'language'}; 
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should rename the file correctly', async () => {
      await service.createTagIcon(mockTag);

      expect(fs.existsSync).toHaveBeenCalled();
      expect(fs.rename).toHaveBeenCalledWith(
        './public/uploads/tagIcons/old-icon.png',
        './public/uploads/tagIcons/tag-icon-test-tag.png',
        expect.any(Function),
      );
    });

    it('should delete .jpg file if .png is being renamed', async () => {
      (fs.existsSync as jest.Mock).mockImplementation((path) => path.endsWith('.jpg'));

      await service.createTagIcon(mockTag);

      expect(fs.unlink).toHaveBeenCalledWith(
        './public/uploads/tagIcons/tag-icon-test-tag.jpg',
        expect.any(Function)
      );
      expect(fs.rename).toHaveBeenCalled();
    });

    it('should delete .png file if .jpg is being renamed', async () => {
      mockTag.icon = 'old-icon.jpg';
      (fs.existsSync as jest.Mock).mockImplementation((path) => path.endsWith('.png'));

      await service.createTagIcon(mockTag);

      expect(fs.unlink).toHaveBeenCalledWith(
        './public/uploads/tagIcons/tag-icon-test-tag.png',
        expect.any(Function)
      );
      expect(fs.rename).toHaveBeenCalled();
    });

    /*it('should handle error if unlink fails', async () => {
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      jest.spyOn(fs, 'unlink').mockImplementation((path, callback) => callback(new Error('Unlink failed')));

      await expect(service.createTagIcon(mockTag)).rejects.toThrowError(new HttpException('Invalid path', HttpStatus.BAD_REQUEST));
    });*/
  });

  describe('createTag', () => {
    const mockTag = { name: 'test-tag', icon: 'icon.png', family: 'language' };
    
    it('should create a tag if the name is unique', async () => {
      repositoryMock.find.mockResolvedValue([]);
      jest.spyOn(service, 'createTagIcon').mockImplementation(async () => Promise.resolve());
      repositoryMock.save.mockResolvedValue({ id: 1 });

      const result = await service.createTag(mockTag);

      expect(repositoryMock.find).toHaveBeenCalled();
      expect(service.createTagIcon).toHaveBeenCalledWith(mockTag);
      expect(repositoryMock.save).toHaveBeenCalledWith(expect.objectContaining({ name: mockTag.name }));
      expect(result).toEqual({ id: 1 });
    });

    it('should throw an error if tag name already exists', async () => {
      repositoryMock.find.mockResolvedValue([{ name: mockTag.name }]);

      await expect(service.createTag(mockTag)).rejects.toThrow(HttpException);
      await expect(service.createTag(mockTag)).rejects.toThrowError(new HttpException('Invalid name', HttpStatus.CONFLICT));
    });
  });

  describe('updateTag', () => {
    const mockTag = { id: 1, name: 'test-tag', icon: 'icon.png', family: 'language' };

    it('should update the tag', async () => {
      const oldTag = { id: 1, name: 'old-tag', icon: 'icon.png', family: 'language' };
      repositoryMock.find.mockResolvedValue([ oldTag ]);
      jest.spyOn(service, 'createTagIcon').mockImplementation(async () => Promise.resolve());
      repositoryMock.save.mockResolvedValue({ id: oldTag.id });

      const result = await service.updateTag(mockTag);

      expect(repositoryMock.find).toHaveBeenCalled();
      expect(repositoryMock.save).toHaveBeenCalledWith(mockTag);
      expect(result).toEqual({ id: mockTag.id });
    });

    it('should throw an error if tag name already exists', async () => {
      const newTag = { id: 2, name: mockTag.name, icon: 'icon.png', family: 'technology' };

      repositoryMock.find.mockResolvedValue([ mockTag ]);
      await expect(service.updateTag(newTag)).rejects.toThrowError(new HttpException('Invalid name', HttpStatus.CONFLICT));
    });

    it('should update the icon if a new one is provided', async () => {
      const serverAddress: string = 'http://testhost:3000';
      const newTag = { id: 1, name: 'test-tag', icon: 'new-icon.png', family: 'language' };

      repositoryMock.find.mockResolvedValue([ mockTag ]);
      jest.spyOn(service, 'createTagIcon').mockImplementation(async () => Promise.resolve());
      repositoryMock.save.mockResolvedValue({ id: mockTag.id });

      const result = await service.updateTag(newTag);

      expect(service.createTagIcon).toHaveBeenCalledWith(newTag);
      expect(newTag.icon).toContain(`${serverAddress}/public/uploads/tagIcons/tag-icon-${newTag.name.replace(' ', '-')}.png`);
      expect(result).toEqual({ id: mockTag.id });
    });
  });

  describe('deleteTagById', () => {
    const mockTag = { id: 1, name: 'test-tag', icon: 'icon.png', family: 'language' };
    
    it('should delete a tag and its icon', async () => {
      repositoryMock.findOne.mockResolvedValue(mockTag);
      (fs.existsSync as jest.Mock)
        .mockReturnValueOnce(false)   //.jpg not exists
        .mockReturnValueOnce(true);  //.png exists
      jest.spyOn(fs, 'unlink').mockImplementation((path, callback) => callback(null));

      const result = await service.deleteTagById(mockTag.id);

      expect(repositoryMock.findOne).toHaveBeenCalledWith({
        select: ['id', 'name'],
        where: { id: mockTag.id },
      });
      expect(fs.existsSync).toHaveBeenCalledWith(`./public/uploads/tagIcons/tag-icon-${mockTag.name.replace(' ', '-')}.png`);
      expect(fs.unlink).toHaveBeenCalledWith(`./public/uploads/tagIcons/tag-icon-${mockTag.name.replace(' ', '-')}.png`, expect.any(Function));
      expect(repositoryMock.delete).toHaveBeenCalledWith(mockTag.id);
      expect(result).toEqual({ rowsDeleted: 2 });
    });

    it('should delete a tag even if an icon file does not exists', async () => {
      repositoryMock.findOne.mockResolvedValue(mockTag);
      (fs.existsSync as jest.Mock).mockReturnValue(false);

      const result = await service.deleteTagById(mockTag.id);

      expect(fs.unlink).not.toHaveBeenCalled();
      expect(repositoryMock.delete).toHaveBeenCalledWith(mockTag.id);
      expect(result).toEqual({ rowsDeleted: 2 });
    });

    it('should handle fs.unlink error', async () => {
      repositoryMock.findOne.mockResolvedValue(mockTag);
      (fs.existsSync as jest.Mock).mockReturnValue(true);
      jest.spyOn(fs, 'unlink').mockImplementation((path, callback) => callback(new Error('Unlink failed')));

      const invalidPathSpy = jest.spyOn(service, 'invalidPath').mockImplementation(() => {
        throw new Error('Invalid path');
      });

      await expect(service.deleteTagById(mockTag.id)).rejects.toThrowError(new HttpException ('Invalid path', HttpStatus.BAD_REQUEST));
      expect(invalidPathSpy).toHaveBeenCalled();
    });

    it('should throw an error if the tag does not exists', async () => {
      repositoryMock.findOne.mockResolvedValue(null);

      await expect(service.deleteTagById(99)).rejects.toThrow("Cannot read properties of null (reading 'name')");

      expect(repositoryMock.findOne).toHaveBeenCalledWith({
        select: ['id', 'name'],
        where: { id: 99 },
      });
      expect(repositoryMock.delete).not.toHaveBeenCalled();
    });
  });
});
