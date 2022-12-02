"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductsByMain = void 0;
const filterQuery = (filter, branch) => {
    let q = " ";
    if (filter == "branch") {
        q = ` WHERE branch = '${branch}' ORDER BY RANDOM() `;
    }
    else if (filter == "main_branch") {
        q = `SELECT products.id, products.title,
                   products.price, products.branch, products.isonsale,
                   products.images, products.countinstroke,
                    products.saleprice, branches.name AS branch_name
                    from products, branches
                    WHERE 
                    products.branch=branches.id AND branches.main='${branch}' `;
    }
    else if (filter == "titlez") {
        q = ` ORDER BY title DESC `;
    }
    else if (filter == "titlea") {
        q = ` ORDER BY title ASC `;
    }
    else if (filter == "price+") {
        q = ` ORDER BY price DESC `;
    }
    else if (filter == "price-") {
        q = ` ORDER BY price ASC `;
    }
    else if (filter == "branch_price-") {
        q = ` WHERE branch = '${branch}' ORDER BY price ASC `;
    }
    else if (filter == "branch_price+") {
        q = ` WHERE branch = '${branch}' ORDER BY price DESC `;
    }
    else if (filter == "sale") {
        q = ` WHERE isonSale = 'true' ORDER BY RANDOM() `;
    }
    else if (filter == "branch_sale+") {
        q = ` WHERE isonSale = 'true' AND branch = '${branch}' ORDER BY salePrice DESC `;
    }
    else if (filter == "branch_sale-") {
        q = ` WHERE isonSale = 'true' AND branch = '${branch}' ORDER BY salePrice ASC `;
    }
    else if (filter == "random") {
        q = ` ORDER BY RANDOM() `;
    }
    else {
        q = ` `;
    }
    return q;
};
const getProductsByMain = () => {
    const query = `SELECT products.id, products.title,
                   products.price, products.branch, products.isonsale,
                    products.saleprice, branches.name, branches.id
                    from products, branches
                    WHERE 
                    products.branch=branches.id AND branches.main=$1`;
    return query;
};
exports.getProductsByMain = getProductsByMain;
exports.default = filterQuery;
