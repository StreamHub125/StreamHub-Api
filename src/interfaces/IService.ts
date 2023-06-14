export default interface IService<Type> {
  Create(_item: Type): Promise<Type>;
  /* objects need action for mongoose */
  Update(_filter: object, _update: object): Promise<Type>;
  Delete(_id: string): Promise<any>;
  FindById(_id: string): Promise<Type | null>;
  Find(): Promise<Type[] | null>;
}
