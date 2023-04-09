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
const { addProduct, getProducts2, updateProduct, removeProduct} = require('../controllers/productos.controller');
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
  updatePrinter,
  deletePrinter
} = require("../controllers/printers.controller");

const { getAllUsers } = require("../controllers/users.controller");
const { authLogin } = require("../controllers/logInv2.controller");
const {
  getLaboratoriosProducto,
  getUbicacionProducto,
  getMedidasProducto,
  getIVAProducto,
} = require("../controllers/parametros.controller");

router.get('/users', getUsers );
router.get('/users/:id', getUsersById );
/*Products*/
router.get('/productos', verifyJWTToken, getProducts2);
router.post('/productos', verifyJWTToken, addProduct);
router.put('/productos', verifyJWTToken, updateProduct);
router.delete('/productos', verifyJWTToken, removeProduct);

/*Parametros de Productos */
router.get('/productos/laboratorios', verifyJWTToken, getLaboratoriosProducto);
router.get('/productos/ubicacion', verifyJWTToken, getUbicacionProducto);
router.get('/productos/medidas', verifyJWTToken, getMedidasProducto);
router.get('/productos/iva', verifyJWTToken, getIVAProducto);


/*categorias */
router.get('/categorias', verifyJWTToken, getCategorias);
// router.post('/categorias', verifyJWTToken, getCategorias);
// router.put('/categorias', verifyJWTToken, getCategorias);
// router.delete('/categorias', verifyJWTToken, getCategorias);

router.get('/empresa',getBusiness);
router.get('/tipos_consultas',getTipoConsultas);
router.get('/tipos_transacciones', getTiposTransacciones);

/* metdos de pago*/
router.get('/metodos_pago', verifyJWTToken, getMetodosPago);

router.post('/statusservices', statusServices)
//
router.post('/login', authSocketToken);
router.post('/checkAuthStatus', checkAuthStates)
router.post('/loginv2', authLogin);
//
router.post('/backupventas',backupventas);
//clients
router.get('/clientes', verifyJWTToken, getClients);
router.post('/clients/store', verifyJWTToken, createClients);
// printers
router.get('/printers', verifyJWTToken, getPrinters);
router.post('/printers', verifyJWTToken, createPrinter);
router.put('/printers', verifyJWTToken, updatePrinter);
router.delete('/printers', verifyJWTToken, deletePrinter);

//users
router.get('/allUsers', verifyJWTToken, getAllUsers);

module.exports = router;
