const { createContainer, asClass, asValue, asFunction } = require("awilix");

// Configuración principal
const config = require("../config");
const { Database, Server } = require("../startup");
const Routes = require("../routes");
const { protect } = require("../middleware/authMiddleware");

// Servicios
const {
  UserService,
  PropertyService,
  LocationService,
  ReservationService,
  ReviewService,
} = require("../services");

// Controladores
const {
  UserController,
  PropertyController,
  LocationController,
  ReservationController,
  ReviewController,
} = require("../controllers");

// Rutas
const {
  UserRoutes,
  PropertyRoutes,
  LocationRoutes,
  ReservationRoutes,
  ReviewRoutes,
} = require("../routes/api");

// Modelos
const { User, Property, Location, Reservation, Review } = require("../models");

// Utils
const AuthUtils = require("../utils/auth");

const container = createContainer();

container
  // Configuración principal
  .register({
    config: asValue(config),
    Database: asClass(Database).singleton(),
    Server: asClass(Server).singleton(),
    router: asFunction(Routes).singleton(),
    AuthUtils: asClass(AuthUtils).singleton(),
  })

  // Servicios
  .register({
    UserService: asClass(UserService).singleton(),
    PropertyService: asClass(PropertyService).singleton(),
    LocationService: asClass(LocationService).singleton(),
    ReservationService: asClass(ReservationService).singleton(),
    ReviewService: asClass(ReviewService).singleton(),
  })

  // Controladores
  .register({
    UserController: asClass(UserController.bind(UserController)).singleton(),
    PropertyController: asClass(PropertyController.bind(PropertyController)).singleton(),
    LocationController: asClass(LocationController.bind(LocationController)).singleton(),
    ReservationController: asClass(ReservationController.bind(ReservationController)).singleton(),
    ReviewController: asClass(ReviewController.bind(ReviewController)).singleton(),
  })

  // Rutas
  .register({
    UserRoutes: asFunction(UserRoutes).singleton(),
    PropertyRoutes: asFunction(PropertyRoutes).singleton(),
    LocationRoutes: asFunction(LocationRoutes).singleton(),
    ReservationRoutes: asFunction(ReservationRoutes).singleton(),
    ReviewRoutes: asFunction(ReviewRoutes).singleton(),
  })

  // Modelos
  .register({
    User: asValue(User),
    Property: asValue(Property),
    Location: asValue(Location),
    Reservation: asValue(Reservation),
    Review: asValue(Review),
  })

  // Middleware
  .register({
    AuthMiddleware: asFunction(protect).singleton(),
  });

module.exports = container;
