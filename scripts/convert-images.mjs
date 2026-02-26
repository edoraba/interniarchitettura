import { readdir, unlink, writeFile } from 'fs/promises';
import { basename, dirname, extname, join } from 'path';
import sharp from 'sharp';

const IMG_DIR = join(process.cwd(), 'public', 'img');
const QUALITY = 80;
const EXTENSIONS = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'];

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-_.]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

async function getImageFiles(dir) {
  const files = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      const subFiles = await getImageFiles(fullPath);
      files.push(...subFiles);
    } else if (EXTENSIONS.includes(extname(entry.name))) {
      files.push(fullPath);
    }
  }

  return files;
}

async function convertImage(filePath) {
  const dir = dirname(filePath);
  const name = basename(filePath, extname(filePath));
  const slugName = slugify(name);
  const outputPath = join(dir, `${slugName}.webp`);

  try {
    await sharp(filePath).webp({ quality: QUALITY }).toFile(outputPath);

    // Try to remove original, but don't fail if locked
    try {
      await unlink(filePath);
    } catch {
      // File might be locked by IDE/watcher - skip deletion
    }

    console.log(`  ✓ ${basename(filePath)} → ${slugName}.webp`);
    return { original: basename(filePath), converted: `${slugName}.webp` };
  } catch (err) {
    console.error(`  ✗ ${basename(filePath)}: ${err.message}`);
    return null;
  }
}

async function generateManifest(imgDir) {
  const manifest = {};
  const folders = await readdir(imgDir, { withFileTypes: true });

  for (const folder of folders) {
    if (!folder.isDirectory()) continue;
    const folderPath = join(imgDir, folder.name);
    const files = await readdir(folderPath);
    const webpFiles = files.filter(f => extname(f) === '.webp').sort();
    if (webpFiles.length > 0) {
      manifest[folder.name] = webpFiles;
    }
  }

  return manifest;
}

async function main() {
  console.log('\n🖼  Converting images to WebP...\n');

  const files = await getImageFiles(IMG_DIR);

  if (files.length === 0) {
    console.log('No images found to convert.');
    return;
  }

  console.log(`Found ${files.length} images to convert.\n`);

  const results = [];
  for (const file of files) {
    const result = await convertImage(file);
    if (result) results.push(result);
  }

  // Generate manifest
  const manifest = await generateManifest(IMG_DIR);
  const manifestPath = join(IMG_DIR, 'manifest.json');
  await writeFile(manifestPath, JSON.stringify(manifest, null, 2));

  console.log(`\n✓ Converted ${results.length}/${files.length} images`);
  console.log(`✓ Manifest written to public/img/manifest.json\n`);
}

main().catch(console.error);
