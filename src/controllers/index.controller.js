const {Pool} = require('pg');

const pool = new Pool({
    host : 'localhost',
    user: 'keepout_Project',
    password : 'LuProject%97&79',
    database: 'rest-api01',
    port : ''
});

const deleteUserById = async (req,res)=>{
    const id = req.params.id;
    const response = await pool.query('DELETE FROM tb_users WHERE id = $1',[id]);
    console.log(response);
    res.json(`User ${id} deletes successfully`);
}

const getAuthEmail = async (req,res)=>{
    const {password,email} = req.body;
    const response = await pool.query('SELECT * FROM tb_users u INNER JOIN tb_contractor cr ON u.u_cr_id = cr.cr_id INNER JOIN tb_business bs on cr.cr_bs_id = bs.bs_id INNER JOIN tb_cargo cg on cg.cg_bs_id = bs.bs_id WHERE u_email = $1 and u_password = $2 LIMIT 1',[email,password]);
    if(response.rows.length >0){
        res.status(200).json(response.rows);
    }else{
        res.status(200).json({"status":0});
    }
}



module.exports = {
    deleteUserById,
    getAuthEmail
}