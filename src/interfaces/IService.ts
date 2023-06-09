export default interface IService<Type> {
  Create(item: Type): Promise<Type>;
  /* objects need action for mongoose */
  Update(filter: object, update: object): Promise<Type>;
  Delete(id: string): Promise<any>;
  FindById(id: string): Promise<Type | null>;
  Find(): Promise<Type[] | null>;
}
