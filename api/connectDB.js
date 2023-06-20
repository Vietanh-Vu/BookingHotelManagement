import sql from "mssql/msnodesqlv8.js";

const config = {
  server: "localhost, 1433",
  user: "sa",
  password: "vuvietanh993",
  database: "BookingHotel",
  driver: "msnodesqlv8",
};

const connect = new sql.ConnectionPool(config).connect().then((pool) => {
  return pool;
});

export { connect, sql };
