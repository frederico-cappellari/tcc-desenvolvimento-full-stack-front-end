export interface Usuario {
  aud: string;
  sub: string;
  name: string;
  soeMatricula: number;
  soeOrganizacao: string;
  soeCodOrganizacao: number;
  soeSetor: string;
  soeCodSetor: number;
  soeOrganizacaoVinculadaRhe: boolean;
  amr: string[];
}