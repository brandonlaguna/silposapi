var nodemailer = require('nodemailer');
var handlebars = require('handlebars');
var fs = require('fs');
var path = require('path');

// email sender function

const sendMail = async (req, res) => {
    // Definimos el transporter
    const filePath = path.join(__dirname, 'views/mailStructure.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    const { inspection, articles } = req.body;
    var listArticles = [];
    var pricetotal = 0;
    var articlulototal = 0;
    // const articles = [
    //     { name: 'alcanfor', count: '2', price: '1900', imp: 19, total:3800}

    // ]


    articles.forEach(element => {
        listArticles.push({ name: element.ar_name, count: element.ia_a_count, price: element.ar_value * ((element.ar_imp / 100) + 1), imp: element.ar_imp + "%", total: (element.ar_value * ((element.ar_imp / 100) + 1) * element.ia_a_count) })
        pricetotal += (element.ar_value * ((element.ar_imp / 100) + 1) * element.ia_a_count);
        articlulototal += element.ia_a_count;
    });

    listArticles.push({ name: '', count: articlulototal, price: '', imp: '', total: pricetotal });
    var myObj = JSON.parse('{"date_created":"' + inspection.i_date + '"}'),
        myDate = new Date(parseInt(myObj.date_created, 10));
    var dateString = myDate.toDateString('es-CO', { timeZone: 'UTC' }) + " " + myDate.toLocaleTimeString('es-CO');
    const replacements = {
        businessName: "Copalcol",
        userName: inspection.u_name,
        tipoVisita: inspection.it_inspection_name,
        dateVisita: dateString,
        asociadoName: inspection.a_name,
        detalleVisita: inspection.i_detalle,
        recomendacionVisita: inspection.i_recomendaciones,
        diagnostcoVisita: inspection.i_diagnostico,
        artilceCount: listArticles.length - 1,
        listArticles: listArticles,
    };
    const htmlToSend = template(replacements);
    var transporter = nodemailer.createTransport({
        secure: true, // use TLS
        host: 'restapi.psi-web.co',
        auth: {
            user: 'emailservice@restapi.psi-web.co',
            pass: 'Niniyojana55284433'
        },
        tls: {
            // do not fail on invalid certs
            rejectUnauthorized: false
        }
    });

    // gerencia@copalcol.com
    // comercial@copalcol.com
    // info@psi-web.co
    var mailOptions = {
        from: 'emailservice@restapi.psi-web.co',
        to: ['gerencia@copalcol.com','info@psi-web.co','comercial@copalcol.com'],
        cc:['brandonlagunarl@gmail.com'],
        subject: 'Visita de ' + inspection.it_inspection_name + ' Asociado ' + inspection.a_name,
        html: htmlToSend
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.status(500).json("name error" + err.message)
        } else {
            console.log("Email sent");
            res.status(200).json(listArticles)

        }
    });


}

module.exports = {
    sendMail
}