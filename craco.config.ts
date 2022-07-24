import path from 'path'

const config = {
  // webpack 配置
  webpack: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
}

export default config
