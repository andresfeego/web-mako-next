export default function handler(req, res) {
    res.send(`
    User-agent: *
    Allow: /
    Sitemap: https://www.mako.guru/sitemap.xml
    `
    ); // Send your `robots.txt content here
}