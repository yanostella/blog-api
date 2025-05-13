import { Router } from "express";
import userRoutes from "../../modules/user/routes/userRoutes";
import postRoutes from "../../modules/post/routes/postRoutes";

const routes = Router();
routes.use('/users', userRoutes);
routes.use('/posts', postRoutes)

export default routes;