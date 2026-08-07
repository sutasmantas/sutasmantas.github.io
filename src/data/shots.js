// Screenshots resolved through astro:assets rather than served from public/.
//
// Going through the asset pipeline buys three things the gates care about:
// intrinsic width and height are read from the file so a wrong hand-written
// aspect ratio cannot cause layout shift, the browser is offered webp, and a
// missing file is a build error instead of a silent 404 in production.
//
// Every shot is a 1440x900 capture of the live GitHub Pages demo, taken at the
// same viewport on 2026-08-07 so the set reads as one system, not thirteen.
const files = import.meta.glob('../assets/shots/*.png', {
  eager: true,
  import: 'default',
});

export const shots = Object.fromEntries(
  Object.entries(files).map(([path, img]) => [
    path.split('/').pop().replace('.png', ''),
    img,
  ]),
);

export function shotFor(name) {
  const img = shots[name];
  if (!img) {
    throw new Error(
      `No screenshot named "${name}" in src/assets/shots. Have: ${Object.keys(shots).join(', ')}`,
    );
  }
  return img;
}
