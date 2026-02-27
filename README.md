# ホームページ // homepage

my personal website ando homepage !!!

<img width="740" height="460" alt="Screenshot" src="https://github.com/user-attachments/assets/4a32ec71-837b-44bb-8e1d-6dbc78310714" />

## Tech Stack

- Vite + React
- Typescript
- Shadcn UI
- Tailwindcss
- GitHub Pages

***

## Development

> Note: This project uses Deno for development. Please make sure you have Deno installed on your machine. However, you can also use node/npm for development if you prefer. Just make sure to change the commands accordingly. (e.g., `npm i` instead of `deno i`, and `npm run dev` instead of `deno task dev`)

- Install dependencies:

```bash
deno i
```

- Run development server:

```bash
deno task dev
```

- Using this command for generating project IDs in `src/apps/projects/projects.ts`:

```bash
python -c "import secrets; print(secrets.token_urlsafe(6))"
```
