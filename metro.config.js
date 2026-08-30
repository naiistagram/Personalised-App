const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Some packages (e.g. zustand) ship an ESM build with `import.meta`, which
// Metro's web bundle can't run as a plain <script>. Disabling package-exports
// resolution makes Metro fall back to each package's CJS `main` entry instead.
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
