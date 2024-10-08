import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ALUNOS, CURSOS, ExemploService } from './exemplo.service';

describe('Exemplo Service', () => {
    let service: ExemploService;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ExemploService]
        });
        service = TestBed.inject(ExemploService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get path module', () => {
        expect(service.getPathModule()).toBe('/alunos');
    });

    it('should return an array of alunos', () => {
        const alunos = service.getExemplo();
        expect(alunos).toEqual(ALUNOS);
        expect(alunos.length).toBe(4);
    });

    it('should return an array of cursos', () => {
        const cursos = service.getCursos();
        expect(cursos).toEqual(CURSOS);
        expect(cursos.length).toBe(4);
    });
});