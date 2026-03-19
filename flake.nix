{
  description = "Marp environment";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    nixpkgs,
    flake-utils,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (
      system: let
        # Import nixpkgs for the current system (preferred over legacyPackages)
        pkgs = import nixpkgs {inherit system;};

        # Beautiful Japanese monospace fonts
        fonts = [
          pkgs.udev-gothic
        ];

        inputs = [pkgs.bun pkgs.typst fonts];

        # Point to Nix store fonts
        typst-font-paths = builtins.concatStringsSep ":" (map (font: "${font}/share/fonts") fonts);
      in {
        devShells = {
          default = pkgs.mkShell {
            buildInputs = inputs;

            shellHook = ''
              echo "📦 Available packages:"
              echo "  - bun: $(bun --version)"
              echo "  - typst: $(typst --version)"
              # Nix store fonts
              echo "🔧 TYPST_FONT_PATHS set to: ${typst-font-paths}"
              export TYPST_FONT_PATHS="${typst-font-paths}"
            '';

            # Ensure we use a proper interactive shell
            shellWrapper = pkgs.writeShellScript "dev-shell" ''
              exec ${pkgs.zsh}/bin/zsh "$@"
            '';
          };
        };
      }
    );
}
