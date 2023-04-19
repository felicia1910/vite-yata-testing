export interface RouterList {
  content?: string;
  path: string;
  route?: string;
  active?: string;
  ratio?: string;
  id?: string;
  component: any,
  department?:any
}

export interface Router {
  title:string,
  list:RouterList[]
}
