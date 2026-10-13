# Pallet Ross

React + Vite recreation of the supplied Pallet Ross marketplace animation. All layout, text, menus, buttons, folders, pricing, dialogs and animation logic are editable source. No Framer runtime, iframe, or whole-page video is used.

## Run

```sh
npm install
npm run dev
```

Open http://127.0.0.1:4176. `npm run build` creates a production build in `dist`.

## Files

- `src/main.jsx`: React sections and interactions.
- `src/style.css`: layout, responsive styles and motion.
- `public/assets`: local artwork crops and font.
- `extract-assets.py`: records the frame coordinates used to extract artwork from the supplied reference. The video and reference frames are not needed to run the website.

## Reference and scope

Visual reference: user-supplied `original-c33ce0d880b26637e8ad3ddd194159d6.mp4`, Pallet Ross concept. Artwork crops retain the reference's resolution and occasionally its overlapping artwork. General Sans is a close visual font match; the exact original typeface was not supplied. Scroll motion was rebuilt from observation, not recovered from the original animation project.

This is a frontend recreation. Membership saves an interest email locally; it does not charge money or create a server account. Class media was not supplied, so its dialog displays a preview image. Theme preference is saved locally. Asset rights remain with their original owners.
