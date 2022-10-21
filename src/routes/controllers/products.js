const { Category, Product } = require('../../db');

module.exports = {

    getAllByCategory: async (req, res) => {
        const { idCategory } = req.params;
        if(!idCategory) res.status(400).send('Missing id Service');
        else{
            try {
                const category = await Category.findOne({
                    where: {id: idCategory},
                    include: Product
                })
                if(!category) res.status(404).send('There is no registered category with that id');
                else {
                    if(!category.Products.length) res.status(404).send('There is no registered products');
                    else res.status(200).send(category.Products);
                }
            } catch (error) {
                res.status(500).send(error);
            }
        }
    },

    get: async (req, res) => {
        const { idCategory,  id } = req.params;
        if(!idCategory || !id) res.status(400).send('Missing id Service or name');
        else{
            try {
                const category = await Category.findOne({
                    where: {id: idCategory},
                    include: Product
                })
                if(!category) res.status(404).send('There is no registered category with that id');
                else {
                    const product = category.Products.find(product => product.id == id);
                    if(!product) res.status(404).send('There is no registered product with that name');
                    else res.status(200).send(product);
                }
            } catch (error) {
                console.log(error);
                res.status(500).send(error);
            }
        }
    },

    getByName: async (req, res) => {
        const { idCategory, name } = req.params;
        if(!idCategory || !name) res.status(400).send('Missing id Service or name');
        else{
            try {
                const category = await Category.findOne({
                    where: {id: idCategory},
                    include: Product
                })
                if(!category) res.status(404).send('There is no registered category with that id');
                else {
                    const finalName = name.replaceAll('-', ' ');
                    const product = category.Products.find(product => product.name.toLowerCase() == finalName.toLowerCase());
                    if(!product) res.status(404).send('There is no registered product with that name');
                    else res.status(200).send(product);
                }
            } catch (error) {
                console.log(error);
                res.status(500).send(error);
            }
        }
    },
    post: async (req, res) => {
        const { idCategory } = req.params;
        const {name, descriptionModal, description, img, link, price, examplesDescription} = req.body;
        if(!name || !descriptionModal || !description || !img || !link || !price) res.status(400).send('Missing parameters');
        else{
            try {
                const productExists = await Category.findOne({
                    where: {id: idCategory},
                    include: Product
                })
                const yesOrNo = productExists?.Products.some(product => product.name === name);
                if(yesOrNo) res.status(400).send('Product already exists');
                else{
                    const product = await Product.create({
                        name: name.trim().toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
                        descriptionModal: descriptionModal.trim(),
                        description: description.trim(),
                        img: img.trim(),
                        link: link.trim(),
                        price: price,
                        examplesDescription: examplesDescription?.trim(),
                    });
                    await product.setCategory(idCategory);
                    res.status(201).send(product);
                }
            } catch (error) {
                console.log(error);
                res.status(500).send('Error creating product, category not found');
            }
        }
    },

    postExamplesDescription: async (req, res) => {
        const { idCategory, id } = req.params;
        const { examplesDescription } = req.body;
        if(!idCategory || !id || !examplesDescription) res.status(400).send('Missing parameters');
        else{
            try {
                const productExists = await Category.findOne({
                    where: {id: idCategory},
                    include: Product
                })
                const product = productExists?.Products.find(product => product.id == id);
                if(!product) res.status(404).send('Product not found');
                else{
                    product.examplesDescription = examplesDescription;
                    await product.save();
                    res.status(200).send(product);
                }
            } catch (error) {
                console.log(error);
                res.status(500).send('Error creating product, category not found');
            }
        }

    },

    put: async (req, res) => {
        const { idCategory, id } = req.params;
        const {name, descriptionModal, description, img, link, price, examplesDescription} = req.body;
        if(!name || !descriptionModal || !description || !img || !link || !price || !idCategory || !id) res.status(400).send('Missing parameters');
        else{
            try {
                const category = await Category.findOne({
                    where: {id: idCategory},
                    include: Product
                })
                if(!category) res.status(404).send('There is no registered category with that id');
                else {
                    const product = category.Products.find(category => category.id == id);
                    category.Products.forEach(product => {
                        if(product.id != id && product.name === name) throw ('Product already exists');
                    });
                    if(!product) res.status(404).send('There is no registered product with that id');
                    else {
                        product.name = name.trim().toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
                        product.descriptionModal = descriptionModal.trim();
                        product.description = description.trim();
                        product.img = img.trim();
                        product.link = link.trim();
                        product.price = price;
                        product.examplesDescription = examplesDescription?.trim();
                        await product.save();
                        res.status(200).send('Product updated');
                    }
                }
            } catch (error) {
                console.log(error);
                res.status(500).send(error);
            }
        }
    },

    delete: async (req, res) => {
        const { idCategory, id } = req.params;
        if(!idCategory || !id) res.status(400).send('Missing parameters');
        else{
            try {
                const category = await Category.findOne({
                    where: {id: idCategory},
                    include: Product
                })
                if(!category) res.status(404).send('There is no registered category with that id');
                else {
                    const product = category.Products.find(product => product.id == id);
                    if(!product) res.status(404).send('There is no registered product with that id');
                    else {
                        await product.destroy();
                        res.status(200).send('Product deleted');
                    }
                }
            } catch (error) {
                res.status(500).send(error);
            }
        }
    },
}