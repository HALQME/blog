{
  description = "Marp environment";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    let
      # systems you want to support (add/remove as needed)
      supportSystems = [ "x86_64-linux" "aarch64-darwin" ];
    in
    flake-utils.lib.eachSystem supportSystems (system:
      let
        # Import nixpkgs for the current system (preferred over legacyPackages)
        pkgs = import nixpkgs { inherit system; };

        # detect whether the packages exist in this pkgs set
        hasBun = builtins.hasAttr "bun" pkgs;
        hasTypst = builtins.hasAttr "typst" pkgs;

        # Beautiful Japanese monospace fonts
        fonts = [
          pkgs.udev-gothic
        ];

        inputs = (if hasBun then [ pkgs.bun ] else [])
               ++ (if hasTypst then [ pkgs.typst ] else [])
               ++ fonts;

        # Point to Nix store fonts
        typst-font-paths = builtins.concatStringsSep ":" (map (font: "${font}/share/fonts") fonts);
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = inputs;

          shellHook = ''
            echo "📦 Available packages:"
            ${if hasBun then ''echo "  - bun: $(bun --version)"'' else ""}
            ${if hasTypst then ''echo "  - typst: $(typst --version)"'' else ""}
            # Nix store fonts
            echo "🔧 TYPST_FONT_PATHS set to: ${typst-font-paths}"
            export TYPST_FONT_PATHS="${typst-font-paths}"
          '';

          # Ensure we use a proper interactive shell
          shellWrapper = pkgs.writeShellScript "dev-shell" ''
            exec ${pkgs.zsh}/bin/zsh "$@"
          '';
        };
      }
    );
}
