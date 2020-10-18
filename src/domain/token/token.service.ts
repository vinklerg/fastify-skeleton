export interface TokenService<TokenType, PayloadType> {
  sign(payload: PayloadType): TokenType;
  verify(token: TokenType): PayloadType;
}
