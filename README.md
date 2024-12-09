This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Build Docker image

Build Docker image

```
docker build --no-cache -t mauricewipf/playground-nextjs:latest -f container/Dockerfile .
```

Verify

```
docker images
```

Run the Docker Container

```
docker run --rm -p 3000:3000 mauricewipf/playground-nextjs:latest
```


## Deployment with Helm

Install with Helm

```
helm install -f ./container/k8s/values.yaml playground-nextjs ./container/k8s
```

Update

```
helm upgrade -f ./container/k8s/values.yaml playground-nextjs ./container/k8s
```
