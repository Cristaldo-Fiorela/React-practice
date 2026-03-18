export type TGuitar = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
}

export type TCartItem = TGuitar & {
  quantity: number;
}


/**
 * * herencia de atributos con INTERFACE
export interface TCartItem extends TGuitar {
  quantity: number;
}

 ** herencia de atributos con TYPE
export type TCartItem = TGuitar & {
  quantity: number;
}
  
** OMITE atributos que va a heredar el nuevo type Omit<TYPE, 'ATRIBUTO A OMITIR'>
export type TCartItem = Omit<TGuitar, 'id' | 'name' | 'price'>

** Creando un nuevo type con herencia de atributos de utility types Pick<TYPE, 'ATRIBUTO'>
export type TCartItem = Pick<TGuitar, 'id' | 'name' | 'price'> & {
  quantity: number;
}

 */