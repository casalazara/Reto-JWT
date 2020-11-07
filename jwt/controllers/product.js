const { mongoUtils, dataBase } = require("../lib/utils/mongo.js");
const COLLECTION_NAME = "productos";

async function getProducts() {
  const client = await mongoUtils.conn();
  const products = await client
    .db(dataBase)
    .collection(COLLECTION_NAME)
    .find({})
    .toArray()
    .finally(() => client.close());
  return products;
}

function insertProduct(product) {
  return mongoUtils.conn().then((client) => {
    return client
      .db(dataBase)
      .collection(COLLECTION_NAME)
      .insertOne(product)
      .finally(() => client.close());
  });
}

function updateProduct(product) {
  return mongoUtils.conn().then(async (client) => {
    return client
    .db(dataBase)
    .collection(COLLECTION_NAME)
    .updateOne({ idproducto: product.idproducto}, 
      {
        $set:{nombreProducto: product.nombreProducto,
              idProveedor: product.idProveedor,
              idCategoria: product.idCategoria,
              cantidadPorUnidad: product.cantidadPorUnidad,
              precioUnidad: product.precioUnidad,
              unidadesEnExistencia: product.unidadesEnExistencia,
              unidadesEnPedido: product.unidadesEnPedido,
              nivelNuevoPedido: product.nivelNuevoPedido,
              suspendido: product.suspendido,
              categoriaProducto: product.categoriaProducto
         },
      },
      )
    .finally(() => client.close());
  });
}

module.exports = [getProducts, insertProduct, updateProduct];
