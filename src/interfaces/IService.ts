export default interface IService<Type> {
  Create(_item: Type): Promise<Type | null>;
  /* objects need action for mongoose */
  /* Filter example {_id: 'cbkajbc'} and Update need partial of the type {nameProperty: valueOfProperty} */
  Update(_filter: object, _update: Partial<Type>): Promise<Type | null>;
  Delete(_id: string): Promise<any>;
  FindById(_id: string): Promise<Type | null>;
  /* Query is the filter and Set Limit and Page of parameters */
  Find(_query: object, _set: object): Promise<any | null>;
}
