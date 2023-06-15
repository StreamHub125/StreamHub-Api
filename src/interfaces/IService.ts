export default interface IService<Type> {
  Create(_item: Type): Promise<Type>;
  /* objects need action for mongoose */
  Update(_filter: object, _update: object): Promise<Type | null>;
  Delete(_id: string): Promise<any>;
  FindById(_id: string): Promise<Type | null>;
  Find(_query: object, _set: object): Promise<any | null>;
}
