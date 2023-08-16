This is my portfolio project made with [Next.js](https://nextjs.org/), [Three.js](https://threejs.org/) and hosted statically on [GitHub Pages
](https://pages.github.com/)under the link: [https://vofes.github.io/portfolio/](https://vofes.github.io/portfolio/).

## Making changes

First, pull this repository:

```shell
git clone https://github.com/vofes/portfolio.git
```

Download npm dependencies:

```
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Deploying

Test optimized bulid by building it first locally:
Use Live Server or Vercel to launch static build locally.

```
npm run build
cd ./out
```

After verifying push to github where it will be automatically build and deployed by GitHub Actions:

```
cd ..
git branch -M main
git add .
git commit -m "commit name"
git push -u origin main
```
