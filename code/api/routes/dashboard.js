import express from "express";
import {
  hotelRevenueLast12Month,
  lastMonthRevenueCategory,
  lastMonthRevenueRoomType,
  revenueLast12Month,
  totalMonthlyUsersLast12Month,
  totalNewUsersLastMonth,
  totalOldUsersLastMonth,
} from "../controllers/dashboard.js";

const DashboardRouter = express.Router();

// revenue for the last 12 months
DashboardRouter.get("/revenueLast12Month", revenueLast12Month);

// Last 1 month revenue of each type of hotel
DashboardRouter.get("/lastMonthRevenueCategory", lastMonthRevenueCategory);

// Revenue of a hotel in the last 12 months
DashboardRouter.get("/hotelRevenueLast12Month/:id", hotelRevenueLast12Month);

// List the revenue of room types in the last 1 month
DashboardRouter.get("/lastMonthRevenueRoomType", lastMonthRevenueRoomType);

// Total monthly users of the hotel system in the last 12 months
DashboardRouter.get(
  "/totalMonthlyUsersLast12Month",
  totalMonthlyUsersLast12Month
);

// Total new users in each hotel last month
DashboardRouter.get("/totalNewUsersLastMonth", totalNewUsersLastMonth);

// Total old users in each hotel last month (user has at least 2 reservation)
DashboardRouter.get("/totalOldUsersLastMonth", totalOldUsersLastMonth);

export default DashboardRouter;
