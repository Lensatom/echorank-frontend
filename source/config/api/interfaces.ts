export interface IPOST {
  route: string;
  data: any;
  authorization?: boolean;
  isFormData?: boolean;
}

export interface IGET {
  route: string;
  authorization?: boolean;
}

export interface IPUT {
  route: string;
  data: any;
  authorization?: boolean;
  isFormData?: boolean;
}

export interface IDELETE {
  route: string;
  data: any;
  authorization?: boolean;
  isFormData?: boolean;
}