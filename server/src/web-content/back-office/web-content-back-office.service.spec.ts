import { Test, TestingModule } from '@nestjs/testing';
import { WebContentBackOfficeService } from './web-content-back-office.service';

describe('WebContentBackOfficeService', () => {
  let service: WebContentBackOfficeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebContentBackOfficeService],
    }).compile();

    service = module.get<WebContentBackOfficeService>(WebContentBackOfficeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
