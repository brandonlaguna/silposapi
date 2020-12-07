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

const upload = multer({storage: storage})
const {getUsers,getUsersById} =require('../controllers/usuario.controller');
const {getProducts} = require('../controllers/productos.controller');
const {authSocketToken} =  require('../controllers/logIn.controller');
const {getBusiness} = require('../controllers/business.controller');
const {statusServices} = require('../controllers/statusservices.controller');
const {getClients} = require('../controllers/clients.controller');
const {getCategorias} = require('../controllers/categorias.controller');
router.get('/users', getUsers );
router.get('/users/:id', getUsersById );
router.get('/productos',getProducts);
router.get('/categorias',getCategorias);
router.get('/empresa',getBusiness);
router.get('/clientes',getClients);

router.post('/statusservices',statusServices)
//
router.post('/login', authSocketToken);

module.exports = router;