import { createProxyMiddleware } from 'http-proxy-middleware'

export default (req, res) => {
    let target = ''
    // 代理目标地址
    // target 替换为你跨域请求的服务器 
    if (req.url.startsWith('/api')) {
        target = 'https://service-p0ngyeui-1318284787.gz.apigw.tencentcs.com/release'
    }
    // 创建代理对象并转发请求
    createProxyMiddleware({
        target,
        changeOrigin: true,
        pathRewrite: {
            '^/api/': '/',
        },
    })(req, res)
}
