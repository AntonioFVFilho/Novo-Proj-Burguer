import Sequelize, { Model } from "sequelize";

class Product extends Model {
   static init(sequelize) {
        super.init({
            nome: Sequelize.STRING,
            price: Sequelize.INTEGER,
            category: Sequelize.STRING,
            path: Sequelize.STRING,
        },
    {
        sequelize,
    },
    );
    }
}

export default Product;