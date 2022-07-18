const {Router} = require('express');
const router = Router();
const multer = require('multer')
const jwt = require('jsonwebtoken');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.uri)
  }
})

const upload = multer({storage: storage});
const { verifyJWTToken } = require("../controllers/auth.controller");
const {
  getUsers,
  getUsersById,
} =require('../controllers/usuario.controller');
const { getProducts } = require('../controllers/productos.controller');
const {
  authSocketToken,
  checkAuthStates,
} =  require('../controllers/logIn.controller');
const { getBusiness, getTipoConsultas } = require('../controllers/business.controller');
const { statusServices } = require('../controllers/statusservices.controller');
const { getClients, createClients } = require('../controllers/clients.controller');
const { getCategorias } = require('../controllers/categorias.controller');
const { backupventas } = require('../controllers/backupventas.controller');
const { getTiposTransacciones } = require("../controllers/tiposTransacciones.controller");
const { getMetodosPago } = require("../controllers/metodosPago.controller");
const {
  getPrinters,
  createPrinter,
} = require("../controllers/printers.controller");

const { getAllUsers } = require("../controllers/users.controller");

router.get('/users', getUsers );
router.get('/users/:id', getUsersById );
router.get('/productos',getProducts);
router.get('/categorias',getCategorias);
router.get('/empresa',getBusiness);
router.get('/tipos_consultas',getTipoConsultas);
router.get('/tipos_transacciones', getTiposTransacciones);
router.get('/metodos_pago', getMetodosPago);

router.post('/statusservices', statusServices)
//
router.post('/login', authSocketToken);
router.post('/checkAuthStatus', checkAuthStates)
//
router.post('/backupventas',backupventas);
//clients
router.get('/clientes', verifyJWTToken, getClients);
router.post('/clients/store', verifyJWTToken, createClients);
// printers
router.get('/printers', verifyJWTToken, getPrinters);
router.post('/printers/store', verifyJWTToken, createPrinter);
//users
router.get('/allUsers', verifyJWTToken, getAllUsers);

module.exports = router;
