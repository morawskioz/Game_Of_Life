var path = require("path");
module.exports={
    entry:"./js/app.js",
    output: { filename: "out.js",
        path: path.resolve(__dirname, "js") },
    watch: true,
    module: {
        rules: [{
            test: /\.jsx$/, exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: { presets: ['es2015', "react"] }
            }
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader',
                    'sass-loader'
                ]
            }
        ]
    }
};