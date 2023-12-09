import sql from "mssql/msnodesqlv8.js";

const config = {
  server: "localhost, 1433",
  user: "sa",
  password: "Vva.fdtsom993@",
  database: "BookingHotel",
  driver: "msnodesqlv8",
};

// const config = {
//   server: "localhost",
//   database: "BookingHotel",
//   driver: "msnodesqlv8",
//   user: "sa",
//   password: "tientuu22",
//   options: {
//       trustedConnection: true
//   }
// };

const connect = new sql.ConnectionPool(config).connect().then((pool) => {
  return pool;
});

export { connect, sql };
