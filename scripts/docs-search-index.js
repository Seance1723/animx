import fs from 'fs';
import path from 'path';

const distDir = path.resolve(process.cwd(), 'dist');
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

const searchData = {
  version: "3.33.0",
  items: [
    {
      title: "AnimX Home",
      type: "guide",
      url: "docs/index.html",
      keywords: ["home", "start", "welcome"],
      summary: "Welcome to AnimX v3.33.0 Documentation."
    }
  ]
};

fs.writeFileSync(path.join(distDir, 'animx.docs-search.json'), JSON.stringify(searchData, null, 2));
console.log('Generated animx.docs-search.json');
