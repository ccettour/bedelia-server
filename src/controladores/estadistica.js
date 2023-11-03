const estadisticaBD = require('../baseDeDatos/estadisticaBD');

estadistica = async (req, res) => {
    const estadistica = await estadisticaBD.estadistica();
    res.status(200).json({estado:'OK', dato:estadistica});
}

module.exports = {
    estadistica
}