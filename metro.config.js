const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const { wrapWithReanimatedMetroConfig } = require("react-native-reanimated/metro-config");

const config = getDefaultConfig(__dirname);

// Aplica o NativeWind
const nativeWindConfig = withNativeWind(config, { input: "./src/styles/global.css" });

// Aplica o Reanimated
module.exports = wrapWithReanimatedMetroConfig(nativeWindConfig);
