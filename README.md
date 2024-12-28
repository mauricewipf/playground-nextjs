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

## MinIO Object Storage for Container

[Docker (rootless)](https://min.io/docs/minio/container/index.html)

```shell
mkdir -p ${HOME}/minio/data

docker run \
   -p 9000:9000 \
   -p 9001:9001 \
   --user $(id -u):$(id -g) \
   --name minio1 \
   -e "MINIO_ROOT_USER=admin" \
   -e "MINIO_ROOT_PASSWORD=admin123" \
   -v ${HOME}/minio/data:/data \
   quay.io/minio/minio server /data --console-address ":9001"
```

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
    -t mauricewipf/playground-nextjs:v0.0.2 \
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
    -e MINIO_ENDPOINT=localhost \
    -e MINIO_PORT=9000 \
    mauricewipf/playground-nextjs:v0.0.2
```

Run MinIO Docker Container

```shell
docker run \
    --rm \
    -p 9000:9090 \
    -e "MINIO_ROOT_USER=minioadmin" \
    -e "MINIO_ROOT_PASSWORD=minioadmin" \
    -v /Users/mauricewipf/minio/data:/data \
    quay.io/minio/minio:latest server /data
```

Push image

```shell
docker push mauricewipf/playground-nextjs:v0.0.2
```

Test pulling image

```shell
docker pull mauricewipf/playground-nextjs:v0.0.2
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
  --set image.tag=v0.0.2
```

Get service URL

```shell
minikube service playground-nextjs --url
```

## Deployment of MinIO

```shell
helm install playground-minio ./k8s/playground-minio -f ./k8s/playground-minio/values.yaml
```

```shell
helm upgrade playground-minio ./k8s/playground-minio -f ./k8s/playground-minio/values.yaml
```

Temporary port-forwarding

```shell
kubectl port-forward playground-minio-555d556d5d-7hgc4 9000 9090
```
