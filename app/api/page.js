// import { db } from '@vercel/postgres';

// export default async function handler(request, response) {
//   const client = await db.connect();

//   try {
//     // Create table if it doesn't exist
//     // await client.sql`CREATE TABLE IF NOT EXISTS pets (name varchar(255), owner varchar(255));`;

//     // // Insert data
//     // const names = ['Fiona', 'Lucy'];
//     // await client.sql`INSERT INTO pets (name, owner) VALUES (${names[0]}, ${names[1]});`;

//     // Select data
//     const pets = await client.sql`SELECT * FROM Pets;`;
//     console.log("I am pets", pets, "and", pets.rows);
//     return response.status(200).json({ pets });
//   } catch (error) {
//     console.error('Database error:', error);
//     return response.status(500).json({ error: 'Database query failed' });
//   } finally {
//     client.release(); // Release the client back to the pool
//   }
// }

import { db } from '@vercel/postgres';

export default async function handler(request, response) {
  const client = await db.connect();

  try {
    console.log(process.env.POSTGRES_URL);
    // Create table if it doesn't exist
    // await client.sql`CREATE TABLE IF NOT EXISTS pets (name varchar(255), owner varchar(255));`;

    // Insert data
    // const names = ['Fiona', 'Lucy'];
    // await client.sql`INSERT INTO pets (name, owner) VALUES (${names[0]}, ${names[1]});`;

    // Select data
    const pets = await client.sql`SELECT * FROM Pets;`;
    
    // Debug logs
    // console.log("Query result:", pets.toJSON);
    console.log("Pets rows:", pets?.rows);
    return <div>{pets.rows?.map((item)=>{
      return `${item.name}`
    })}</div>

    // return response.status(200).json({ pets: pets?.rows || [] });
  } catch (error) {
    console.error('Database error:', error);
    return response.status(500).json({ error: 'Database query failed' });
  } finally {
    client.release();
  }
}
