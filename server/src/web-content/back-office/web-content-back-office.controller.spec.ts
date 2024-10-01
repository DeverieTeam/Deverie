import { Test, TestingModule } from '@nestjs/testing';
import { WebContentBackOfficeController } from './web-content-back-office.controller';

describe('WebContentBackOfficeController', () => {
  let controller: WebContentBackOfficeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebContentBackOfficeController],
    }).compile();

    controller = module.get<WebContentBackOfficeController>(WebContentBackOfficeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
