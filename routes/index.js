const express = require("express");
const cors = require("cors");
const morgan = require("morgan");


module.exports = function ({
  UserRoutes,
  LocationRoutes,
  PropertyRoutes,
  ReservationRoutes,
  ReviewRoutes,
}) {
  const router = express.Router();
  const apiRouter = express.Router();

  // Configuración de CORS
  apiRouter.use(
    cors({
      origin: "http://localhost:3000", // Dirección del frontend
      methods: ["GET", "POST", "PUT", "DELETE"],    
      allowedHeaders: ["Content-Type", "Authorization"], 
    })
  );

  // Middlewares generales
  apiRouter
    .use(express.json()) 
    .use(morgan("dev")) 
    .use(express.urlencoded({ extended: true })); 

  // Rutas de la API
  apiRouter.use("/user", UserRoutes);
  apiRouter.use("/location", LocationRoutes);
  apiRouter.use("/property", PropertyRoutes);
  apiRouter.use("/reservation", ReservationRoutes);
  apiRouter.use("/review", ReviewRoutes);


  router.use("/v1/api", apiRouter);

  router.use("/", (req, res) => {
    res.send("v.0.1.0.3");
  });

  return router;
};
