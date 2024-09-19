import { VehicleService } from './vehicle.service';
import { firstValueFrom } from 'rxjs';
import VehicleMemoryRepository from '../../repositories/memory/VehicleMemoryRepository';

describe('VehicleService', () => {
  let service: VehicleService;
  let repository: VehicleMemoryRepository;

  beforeEach(async () => {
    repository = new VehicleMemoryRepository();
    service = new VehicleService(repository)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of vehicles', async () => {
    await firstValueFrom(service.create({
      id: undefined,
      ano: 2020,
      marca: 'Chevrolet',
      modelo: 'Onix',
      placa: 'ABC-1234',
      renavam: '123456789',
      chassi: '123456789'
    }));

    const vehicles = await firstValueFrom(service.findAll());
    expect(vehicles).toBeTruthy();
    expect(vehicles.length).toBeGreaterThan(0);
  });

  it('should create a vehicle', async () => {
    const result = await firstValueFrom(service.create({
      id: undefined,
      ano: 2020,
      marca: 'Chevrolet',
      modelo: 'Onix',
      placa: 'ABC-1234',
      renavam: '123456789',
      chassi: '123456789'
    }));

    expect(result.ano).toBe(2020);
    expect(result.marca).toBe('Chevrolet');
    expect(result.modelo).toBe('Onix');
    expect(result.placa).toBe('ABC-1234');
    expect(result.renavam).toBe('123456789');
    expect(result.chassi).toBe('123456789');
  });

  it('should delete a vehicle', async () => {
    await firstValueFrom(service.create({
      id: undefined,
      ano: 2020,
      marca: 'Chevrolet',
      modelo: 'Onix',
      placa: 'ABC-1234',
      renavam: '123456789',
      chassi: '123456789'
    }));

    const result = await firstValueFrom(service.delete(1));
    expect(result).toBe(1);
  });

  it('should update a vehicle', async () => {
    await firstValueFrom(service.create({
      id: undefined,
      ano: 2020,
      marca: 'Chevrolet',
      modelo: 'Onix',
      placa: 'ABC-1234',
      renavam: '123456789',
      chassi: '123456789'
    }));

    const result = await firstValueFrom(service.update(1, {
      id: 1,
      ano: 2021,
      marca: 'Chevrolet',
      modelo: 'Onix',
      placa: 'ABC-1234',
      renavam: '123456789',
      chassi: '123456789'
    }));

    expect(result.ano).toBe(2021);
  });

  it('should find a vehicle by id', async () => {
    await firstValueFrom(service.create({
      id: undefined,
      ano: 2020,
      marca: 'Chevrolet',
      modelo: 'Onix',
      placa: 'ABC-1234',
      renavam: '123456789',
      chassi: '123456789'
    }));

    const result = await firstValueFrom(service.findById(1));
    expect(result?.id).toBe(1);
  });
});
