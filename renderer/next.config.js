module.exports = {
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/dashboard/orders',
  //       permanent: true,
  //     },
  //     {
  //       source: '',
  //       destination: '/dashboard/orders',
  //       permanent: true,
  //     },
  //   ]
  // },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images:{
    unoptimized:true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  webpack: (config, { isServer }) => {

    if (!isServer) {
      config.target = 'electron-renderer';
      config.node = {
        __dirname: true,
      }
    }
    config.output.globalObject = 'this';
    return config;
  },
};
