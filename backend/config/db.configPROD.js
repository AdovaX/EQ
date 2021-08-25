module.exports = {
    HOST: "eq.cq09tytvfzpb.ap-south-1.rds.amazonaws.com",
    USER: "root",
    PASSWORD: "OM3IeSgqscvJtIFZGrlL",
    DB: "eq",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };