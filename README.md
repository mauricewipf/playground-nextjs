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
    -t mauricewipf/playground-nextjs:v0.0.8 \
    -f k8s/playground-nextjs/Dockerfile .
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
    --env-file .env \
    mauricewipf/playground-nextjs:v0.0.8
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
docker push mauricewipf/playground-nextjs:v0.0.8
```

Test pulling image

```shell
docker pull mauricewipf/playground-nextjs:v0.0.8
```

## Deployment with Helm

Validate chart

```shell
helm lint ./k8s/playground-nextjs
```

See mapped Values on Deployment, Service and Ingress

```shell
helm template playground-nextjs ./k8s/playground-nextjs -f ./k8s/playground-nextjs/values.yaml
```

Install or upgrade with Helm

```shell
helm upgrade --install playground-nextjs ./k8s/playground-nextjs -f ./k8s/playground-nextjs/values.yaml --set image.tag=v0.0.8
```

Get service URL

```shell
minikube service playground-nextjs --url
```

## Deployment of MinIO

```shell
helm template playground-minio \
  ./k8s/playground-minio \
  -f ./k8s/playground-minio/values.yaml
```

```shell
helm upgrade --install playground-minio \
  ./k8s/playground-minio \
  -f ./k8s/playground-minio/values.yaml
```

## Create or update secret

Create or get secret from http://minio.mauwi-playground.com/access-keys

```shell
kubectl delete secret playground-minio-secret

# Check .env.prod.yaml for values
kubectl create secret generic playground-minio-secret \
--from-literal=MINIO_ACCESS_KEY="SET_ON_INSTALL" \
--from-literal=MINIO_SECRET_KEY="SET_ON_INSTALL"
```

Temporary port-forwarding

```shell
# Find the pod name and forward port
kubectl port-forward $(kubectl get pods | grep -E "^playground-minio-" | awk '{print $1}') 9090 9090
```

```shell
minikube service playground-minio --url
```
