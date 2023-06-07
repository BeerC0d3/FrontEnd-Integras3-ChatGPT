export interface IContextSupport {
  id: number;
  name: string;
  logo: string;
  file: string;
  contextSupportChildren: [];
}

export interface IEntityContextSupport {
  id: number | undefined;
  name: string | undefined;
  logo: string | undefined;
  nameLogo: string | undefined;
  file: string | undefined;
  nameFile: string | undefined;
}
