const { Examples, Product } = require('../../db');

module.exports = {

    getAllByProduct: async (req, res) => {
        console.log('Get all examples by product');
        const { idProduct } = req.params;
        if(!idProduct) res.status(400).send('Missing id Product');
        else{
            try {
                const product = await Product.findByPk(idProduct);
                if(!product) res.status(404).send('There is no registered product with that id');
                else {
                    const examples = await Examples.findAll({
                        where: {
                            ProductId: idProduct
                        }
                    });
                    if(!examples.length) res.status(404).send('There are no registered examples for that product');
                    else {
                        const examplesFinal = examples.map(example => {
                            return {
                                id: example.id,
                                name: example.name,
                                description: example.description,
                                img: example.img,
                                ProductId: example.ProductId
                            }
                        });
                        res.json(examplesFinal);
                    }
                }
            } catch (error) {
                res.status(500).send(error);
            }
        }     
    },

    get: async (req, res) => {
        const { idProduct, idExample } = req.params;
        if(!idProduct) res.status(400).send('Missing id Product');
        else if(!idExample) res.status(400).send('Missing id Example');
        else{
            try {
                const product = await Product.findByPk(idProduct);
                if(!product) res.status(404).send('There is no registered product with that id');
                else {
                    const example = await Examples.findByPk(idExample);
                    if(!example) res.status(404).send('There is no registered example with that id');
                    else {
                        const exampleFinal = {
                            id: example.id,
                            name: example.name,
                            description: example.description,
                            img: example.img,
                            ProductId: example.ProductId
                        }
                        res.json(exampleFinal);
                    }
                }
            } catch (error) {
                res.status(500).send(error);
            }
        }     
    },
     
    getByName: async (req, res) => {
        const { idProduct } = req.params;
        const { name } = req.query;
        if(!idProduct) res.status(400).send('Missing id Product');
        else if(!name) res.status(400).send('Missing name Example');
        else{
            try {
                const product = await Product.findByPk(idProduct);
                if(!product) res.status(404).send('There is no registered product with that id');
                else {
                    const example = await Examples.findOne({
                        where: {
                            name: name.trim().toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
                            ProductId: idProduct
                        }
                    });
                    if(!example) res.status(404).send('There is no registered example with that name');
                    else {
                        const exampleFinal = {
                            id: example.id,
                            name: example.name,
                            description: example.description,
                            img: example.img,
                            ProductId: example.ProductId
                        }
                        res.json(exampleFinal);
                    }
                }
            } catch (error) {
                res.status(500).send(error);
            }
        }     
    },

    post: async ( req, res ) =>  {
        const { idProduct } = req.params;
        const { title, description, img } = req.body;
        if(!idProduct) res.status(400).send('Missing id Product');
        else if(!title) res.status(400).send('Missing name Example');
        else if(!description) res.status(400).send('Missing description Example');
        else if(!img) res.status(400).send('Missing img Example');
        else{
            try {
                const product = await Product.findByPk(idProduct);
                if(!product) res.status(404).send('There is no registered product with that id');
                else {
                    const example = await Examples.create({
                        name: title.trim().toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
                        description,
                        img,
                        ProductId: idProduct
                    });
                    res.json(example);
                }
            } catch (error) {
                console.log(error);
                res.status(500).send(error);
            }
        }     
    },

    put: async (req, res) => {
        const { idProduct, idExample } = req.params;
        const { name, description, img } = req.body;
        if(!idProduct) res.status(400).send('Missing id Product');
        else if(!idExample) res.status(400).send('Missing id Example');
        else if(!name) res.status(400).send('Missing name Example');
        else if(!description) res.status(400).send('Missing description Example');
        else if(!img) res.status(400).send('Missing img Example');
        else{
            try {
                const product = await Product.findByPk(idProduct);
                if(!product) res.status(404).send('There is no registered product with that id');
                else {
                    const example = await Examples.findByPk(idExample);
                    if(!example) res.status(404).send('There is no registered example with that id');
                    else {
                        await Examples.update({
                            name: name.trim().toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
                            description,
                            img
                        }, {
                            where: {
                                id: idExample
                            }
                        });
                        res.status(200).send('Example updated');
                    }
                }
            } catch (error) {
                res.status(500).send(error);
            }
        }     
    },

    delete: async (req, res) => {
        const { idProduct, idExample } = req.params;
        if(!idProduct) res.status(400).send('Missing id Product');
        else if(!idExample) res.status(400).send('Missing id Example');
        else{
            try {
                const product = await Product.findByPk(idProduct);
                if(!product) res.status(404).send('There is no registered product with that id');
                else {
                    const example = await Examples.findByPk(idExample);
                    if(!example) res.status(404).send('There is no registered example with that id');
                    else {
                        await Examples.destroy({
                            where: {
                                id: idExample
                            }
                        });
                        res.status(200).send('Example deleted');
                    }
                }
            } catch (error) {
                res.status(500).send(error);
            }
        }     
    }
}