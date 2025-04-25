import { Router } from "express";
import userRoutes from "../../modules/user/routes/userRoutes";

const routes = Router();
routes.use('/users', userRoutes);

export default routes;