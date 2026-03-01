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

        inputs = (if hasBun then [ pkgs.bun ] else [])
               ++ (if hasTypst then [ pkgs.typst ] else []);

        # typst font paths for the CV
        typst-font-paths = if system == "aarch64-darwin" then
          "/System/Library/Fonts:/Library/Fonts:$HOME/Library/Fonts"
        else
          "/usr/share/fonts:/usr/local/share/fonts";
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = inputs;

          shellHook = ''
            echo "🚀 Marp development environment ready!"
            echo "📦 Available packages:"
            ${if hasBun then ''echo "  - bun: $(bun --version)"'' else ""}
            ${if hasTypst then ''echo "  - typst: $(typst --version)"'' else ""}
            echo ""
            echo "🔤 Setting up font paths for macOS..."
            # System fonts + nix store fonts
            export TYPST_FONT_PATHS="${typst-font-paths}"
            echo "✅ Font paths configured"
            echo ""
            echo "💡 Tip: Run 'typst fonts' to see available fonts"
            echo "💡 Tip: Run 'typst fonts | grep -i arial' to find specific fonts"
          '';

          # Ensure we use a proper interactive shell
          shellWrapper = pkgs.writeShellScript "dev-shell" ''
            exec ${pkgs.zsh}/bin/zsh "$@"
          '';
        };
      }
    );
}
