import { TestBed } from '@angular/core/testing';

import { AlquilerServiceService } from './alquiler-service.service';

describe('AlquilerServiceService', () => {
  let service: AlquilerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlquilerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
