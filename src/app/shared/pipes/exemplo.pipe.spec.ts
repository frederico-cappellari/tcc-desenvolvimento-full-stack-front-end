import { ExemploPipe } from './exemplo.pipe';

describe('Exemplo Pipe', () => {
    const pipe =  new ExemploPipe();

    it('should verify if curso.label was find', () => {
        expect(pipe.transform(4)).toBe('Mecânica');
    });

    it('should verify if curso.label was not find', () => {
        expect(pipe.transform(5)).toBe('Curso não encontrado');
    });
});