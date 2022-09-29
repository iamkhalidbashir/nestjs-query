/**
 * A function that acts as a constructor for a class.
 *
 * @typeparam T - the class instance type the constructor returns.
 */
export interface Class<T> {
    new (...args: any[]): T;
}
