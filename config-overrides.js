const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function override(config, env) {
    // Добавляем плагин CopyWebpackPlugin для копирования файлов из src в public
    config.plugins.push(
        new CopyWebpackPlugin({
            patterns: [
                { from: 'src', to: 'public' },
            ],
        })
    );

    return config;
};
