with import <nixpkgs> {};
stdenv.mkDerivation {
  name = "env";
  nativeBuildInputs = [ cmake ];
  buildInputs = [ aws-sdk-cpp ];
}