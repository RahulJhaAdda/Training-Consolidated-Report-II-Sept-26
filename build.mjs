import {access} from 'node:fs/promises';
await access('public/index.html');
console.log('Static dashboard ready; /api/data is a Vercel Node function.');
