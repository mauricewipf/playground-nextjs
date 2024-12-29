import * as Minio from 'minio'

const minioClient = new Minio.Client({
  endPoint: `${process.env.MINIO_ENDPOINT}`,
  port: parseInt(process.env.MINIO_PORT as string),
  useSSL: false,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
})

/*
* If you are not using any Dynamic APIs anywhere else in this route,
* it will be prerendered during next build to a static page.
* The data can then be updated using Incremental Static Regeneration.
* To prevent the page from prerendering, you can add the following:
*/
export const dynamic = 'force-dynamic'

export default async function Page() {
  let names: any[] = [];

  function listBucket(buckName: string) {
    const objectsStream = minioClient.listObjects(buckName, '', false, {})
    const _data: any[] = [];

    return new Promise((resolve, reject) => {

      objectsStream.on('data', function (obj) {
        if (obj) {
          _data.push(obj);
        }
      })
      objectsStream.on('end', () => {
        resolve(_data);
      })
      objectsStream.on('error', function (e) {
        reject(e);
      })

    });
  }


  try {
    names = await listBucket('playground-minio') as any[];
  } catch (e) {
    console.error('Fetch error', e);
  }

  return (
    <>
      <h1 className="font-black m-3">Minio Overview</h1>
      <ul>
      {
        names.map((item, index) => (
          <li key={index}>{item?.name}</li>
        ))
      }
      </ul>
    </>
  );
}
