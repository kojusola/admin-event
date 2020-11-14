module.exports = {
    presets: [
        '@vue/cli-plugin-babel/preset'
    ],
    module: {
        rules: [{
            test: /\.scss$/,
            use: [
                'vue-style-loader',
                'css-loader',
                {
                    loader: 'sass-loader',
                    options: {
                        indentedSyntax: true,
                        sassOptions: {
                            indentedSyntax: true
                        }
                    }
                }
            ]
        }]
    },
}