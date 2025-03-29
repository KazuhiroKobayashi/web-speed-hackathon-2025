import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

// public/images/*.jpeg
const publicImageDirectory = path.resolve(__dirname, '../../../public/images');
fs.readdir(publicImageDirectory, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }
  files
    .filter((file) => /^\d{3}\.jpeg$/.test(file))
    .forEach((file) => {
      const inputImagePath = path.join(publicImageDirectory, file);
      const outputImagePath = path.join(publicImageDirectory, file.replace('.jpeg', '.avif'));
      sharp(inputImagePath)
        .resize(480, 270)
        .avif({ quality: 50 })
        .toFile(outputImagePath, (err, _) => {
          if (err) {
            console.error(`Error converting ${file}:`, err);
          } else {
            console.log(`Converted ${file} to ${outputImagePath}`);
          }
        });
    });
});
