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
const {getBusiness, getTipoConsultas} = require('../controllers/business.controller');
const {statusServices} = require('../controllers/statusservices.controller');
const {getClients} = require('../controllers/clients.controller');
const {getCategorias} = require('../controllers/categorias.controller');
const {backupventas} = require('../controllers/backupventas.controller');

router.get('/users', getUsers );
router.get('/users/:id', getUsersById );
router.get('/productos',getProducts);
router.get('/categorias',getCategorias);
router.get('/empresa',getBusiness);
router.get('/clientes',getClients);
router.get('/tipos_consultas',getTipoConsultas);

router.post('/statusservices',statusServices)
//
router.post('/login', authSocketToken);
// 
router.post('/backupventas',backupventas);

module.exports = router;
