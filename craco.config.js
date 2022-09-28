module.exports = {
    style: {
        postcssOptions: {
            plugins: [
                require('taiwlindcss'),
                require('autoprefixer'),
            ],
        },
    },
    webpack: {
        configure: {
            experiments: {
                topLevelAwait: true
            }
        }
    }
}
