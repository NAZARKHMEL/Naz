import conn from 'mssql';

async function config () {


  const config = {
    user: 'admin0',
    password: 'azure_test_2024',
    server: 'nazarazureserver.database.windows.net',
    port: 1433,
    database: 'nazprosjekt',
    authentication: {
      type: 'default'
    },
    options: {
      encrypt: true
    }
  }
  //JoelMK,Say10,Schumacca_Hagen_hermanformo_Makka,hermanformo,usrVAC_Amenguderstor_LUCKYOWL,kadalsaune_Bdbsbsijz_hkvi,testtingindholdpd_Test2,ELcashman,
  // Functions for creating all tables
  // const tableExists = async (tableName) => {
  //   try {
  //     await conn.connect(config);

  //     const result = await conn.query`
  //     SELECT COUNT(*)
  //     FROM INFORMATION_SCHEMA.TABLES
  //     WHERE TABLE_NAME = ${tableName}
  //   `;

  //     return result.recordset[0][''];
  //   } catch (err) {
  //     console.error('Error checking table existence:', err);
  //     return false;
  //   } finally {

  //     await conn.close();
  //   }
  // };

  // const createTables = async () => {
  //   let tablenames = ["users", "products", "daterecords", "orders", "ordercomponents", "stocks", "stockscomponents"]
  //   let tablescripts = [
  //     "CREATE TABLE users (Id int NOT NULL IDENTITY(1, 1) PRIMARY KEY, login varchar(255) UNIQUE NOT NULL, password varchar(255) NOT NULL, email varchar(255) NOT NULL, adds varchar(255) NOT NULL);",
  //     "CREATE TABLE products (Id int NOT NULL IDENTITY(1, 1) PRIMARY KEY, name varchar(255) UNIQUE NOT NULL, type varchar(255) NOT NULL, price varchar(255) NOT NULL, img varchar(255) NOT NULL);",
  //     "CREATE TABLE daterecords (Id int NOT NULL IDENTITY(1, 1) PRIMARY KEY, day varchar(255) NOT NULL, month varchar(255) NOT NULL, year varchar(255) NOT NULL);",
  //     "CREATE TABLE orders (Id int NOT NULL IDENTITY(1, 1) PRIMARY KEY, dateId INT, FOREIGN KEY (dateId) REFERENCES daterecords(Id));",
  //     "CREATE TABLE ordercomponents (Id int NOT NULL IDENTITY(1, 1) PRIMARY KEY, prodname varchar(255) NOT NULL, prodprice varchar(255) NOT NULL, orderId INT, FOREIGN KEY (orderId) REFERENCES orders(Id));",
  //     "CREATE TABLE stocks (Id int NOT NULL IDENTITY(1, 1) PRIMARY KEY, type varchar(255) NOT NULL, discount varchar(255) NOT NULL, days varchar(255) NOT NULL);",
  //     "CREATE TABLE stockscomponents (Id int NOT NULL IDENTITY(1, 1) PRIMARY KEY, prodname varchar(255) NOT NULL, prodcount varchar(255) NOT NULL, stockId INT, FOREIGN KEY (stockId) REFERENCES stocks(Id));",
  //   ]

  //   for (let i = 0; i < tablenames.length; i++) {
  //     const exists = await tableExists(tablenames[i]);

  //     if (exists) {
  //       break;
  //     }
  //     else{
  //       try {
  //         await conn.connect(config);

  //         const createTableQuery = `
  //     ${tablescripts[i]}
  //   `;

  //         const result = await conn.query(createTableQuery);
  //         console.log('Table created successfully:', result);
  //       } catch (err) {
  //         console.error('Error creating table:', err);
  //       } finally {
  //         await conn.close();
  //       }
  //     }
  //   }
  // };

  // createTables();
}

export default { config }