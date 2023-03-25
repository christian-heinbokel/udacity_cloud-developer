export interface Jwk {
  kty: string // Key Type
  use: string // how the key was meant to be used - for example, "sig" (signature)
  kid: string // unique identifier for the key
  x5c: string // x509 certificate chain
  nbf?: string // not before
}
