export type ExternalReferenceType = {
  IDENTIFIER: 'identifier';
};
export type FacebookIdentifierOptions = {
  facebook: {
    userID: string;
  };
};
export type ExternalReferenceOptions = FacebookIdentifierOptions | {};
export type ExternalReference = {
  type: ExternalReferenceType;
  options: ExternalReferenceOptions;
};
export const isFacebookIdentifierExternalReference = (
  options: ExternalReferenceOptions,
): options is FacebookIdentifierOptions => !!(options as FacebookIdentifierOptions).facebook;
