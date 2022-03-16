import {Configuration, DefinePlugin, WebpackPluginInstance} from 'webpack';
import path from 'path';
import dotenv from 'dotenv';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const dotenvConfig = dotenv.config({
    path: path.join(__dirname, '.env'),
}).parsed;
const env = {
    ...process.env,
    ...dotenvConfig,
};

const isProduction = env.NODE_ENV !== 'development';

function getRules({target}: {target: 'client' | 'server'}) {
    const platformIndex = [target, 'index'];
    const isBrowser = target === 'client';

    return [
        {
            test: /\.tsx?$/,
            use: [
                {
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig.json',
                    },
                },
            ],
            resolve: {
                mainFiles: platformIndex,
            },
        },
        {
            test: /\.svg$/,
            use: '@svgr/webpack',
        },
        {
            test: /\.(png|jpe?g|gif|ico)$/i,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[name]-[hash].[ext]',
                        outputPath: '/images',
                        publicPath: 'images',
                    },
                },
            ],
        },
        {
            test: /\.css$/,
            resolve: {
                mainFiles: platformIndex,
            },
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            exportOnlyLocals: !isBrowser,
                            localIdentName: '[local]--[hash:base64:5]',
                            localIdentContext: path.resolve(__dirname, 'src'),
                        },
                        importLoaders: 1,
                        sourceMap: true,
                    },
                },
            ],
        },
    ];
}

const commonSettings: Configuration = {
    devtool: isProduction ? false : 'source-map',
    watchOptions: {
        ignored: /node_modules/,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src/'),
        },
        extensions: ['.tsx', '.ts', '.js', '.css'],
        fallback: {
            url: false,
        },
    },
};

function getWebappConfig({name, entryPath}: {name: string; entryPath: string}): Configuration {
    // @ts-ignore
    const cssExtractPlugin: WebpackPluginInstance = new MiniCssExtractPlugin({
        filename: 'index.css',
    });
    const definePlugin = new DefinePlugin({
        'process.env': {
            TEST_ENV: JSON.stringify(env.TEST_ENV),
        },
    });
    const htmlPlugin = new HtmlWebpackPlugin({
        filename(entryName: string) {
            return `index.html`;
        },
    });

    return {
        ...commonSettings,
        name,
        target: ['web', 'es2020'],
        entry: entryPath,
        module: {
            rules: getRules({target: 'client'}),
        },
        plugins: [cssExtractPlugin, definePlugin, htmlPlugin],
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'dist', name),
        },
    };
}

export default [
    getWebappConfig({name: 'test', entryPath: './src/index.ts'}),
];