export type Identity = {
  userID: string;
};
export type WithIdentity<T> = T & { identity: Identity };
export type WithoutIdentity<T> = Pick<T, Exclude<keyof T, 'identity'>>;
