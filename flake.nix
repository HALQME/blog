{
  description = "Bun development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };
      in
      let
        cv-pdf = pkgs.stdenv.mkDerivation {
          pname = "cv-pdf";
          version = "1.0";
          src = ./.;
          nativeBuildInputs = [ pkgs.typst ];

          buildPhase = ''
            echo "Building CV PDF with typst..."
            typst build ./src/content/cv.typst -o cv.pdf
          '';

          installPhase = ''
            mkdir -p $out
            cp cv.pdf $out/cv.pdf
          '';
        };
      in
      {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            bun
            typst
          ];

          shellHook = ''
            echo "🚀 Development environment loaded!"
            echo "Bun: $(bun --version)"
            echo "Typst: $(typst --version)"
          '';
        };

        packages.cv-pdf = cv-pdf;
      }
    );
}
