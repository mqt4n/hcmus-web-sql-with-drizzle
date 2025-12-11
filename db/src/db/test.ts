import { db, schema } from '../index';

(async () => {
  const detais = await db.select().from(schema.deTai).limit(2);
  console.log('DETAI', detais);

  const chuDes = await db.select().from(schema.chuDe).limit(2);
  console.log('CHUDE', chuDes);
})();
