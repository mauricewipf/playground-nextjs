This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Build Application

More on standalone builds: https://nextjs.org/docs/app/api-reference/config/next-config-js/output#automatically-copying-traced-files

```shell
npm run build
```

## Build Docker image

Build Docker image

```shell
docker build \
    --no-cache \
    -t mauricewipf/playground-nextjs:latest \
    -t mauricewipf/playground-nextjs:$(git rev-parse --short HEAD) \
    -f container/Dockerfile .
```

Verify

```shell
docker images
```

Run the Docker Container

```shell
docker run \
    --rm \
    -p 3000:3000 \
    -e API_ENDPOINT=https://mauwi-playground.com/api/cats \
    mauricewipf/playground-nextjs:$(git rev-parse --short HEAD)
```

Push image

```shell
docker push mauricewipf/playground-nextjs:$(git rev-parse --short HEAD)
```

Test pulling image

```shell
docker pull mauricewipf/playground-nextjs:$(git rev-parse --short HEAD)
```

## Deployment with Helm

Validate chart

```shell
helm lint ./container/k8s
```

See mapped Values on Deployment, Service and Ingress

```shell
helm template playground-nextjs ./container/k8s -f ./container/k8s/values.yaml
```

Install with Helm

```shell
helm install playground-nextjs ./container/k8s -f ./container/k8s/values.yaml
```

Update

```shell
helm upgrade playground-nextjs \
  ./container/k8s \
  -f ./container/k8s/values.yaml \
  --set image.tag=$(git rev-parse --short HEAD)
```

Get service URL

```shell
minikube service playground-nextjs --url
```
