import { Test, TestingModule } from '@nestjs/testing';
import { Base64Service } from './base64.service';

describe('Base64Service', () => {
  let service: Base64Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Base64Service],
    }).compile();

    service = module.get<Base64Service>(Base64Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
