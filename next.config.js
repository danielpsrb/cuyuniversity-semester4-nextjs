/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "cdn.myanimelist.net"
            },
            {
                hostname: "avatars.githubusercontent.com"
            },
            {
                hostname: "img.icons8.com"
            },
            {
                hostname: "lh3.googleusercontent.com"
            },
            {
                hostname: "gitlab.com"
            },
            {
                hostname: "cdn.discordapp.com"
            },
            {
                hostname: "platform-lookaside.fbsbx.com"
            },
            {
                hostname: "www.shutterstock.com"
            }
        ]
    }
}

module.exports = nextConfig
