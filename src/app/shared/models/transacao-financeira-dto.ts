export interface TransacaoFinanceiraDTO {
  id?: number;
  descricao?: string;
  data?: any;
  tipo?: string;
  categoriaDescricao?: string;
  categoriaId?: number;
  valorMedio?: number;
  valor?: number;
  recorrente?: boolean;
  usuarioLogin?: string;
}
