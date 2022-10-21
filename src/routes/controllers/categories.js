const { Category, Product } = require('../../db');

module.exports = {

    getAll: async (req, res) => {
        const categories = await Category.findAll();
        if(!categories.length) res.status(404).send('There are no registered categories');
        else {
            const categorySort = categories.sort((a, b) => {
                return a.id - b.id;
            });

            const categoriesFinal = categorySort.map(category => {
                return {
                    id: category.id,
                    name: category.name,
                    description: category.description,
                    img: category.img,
                    backgroundColor: category.backgroundColor,
                    color: category.color
                }});
            res.status(200).json(categoriesFinal);
        }        
    },

    get: async (req, res) => {
        const { id } = req.params;
        if(!id) res.status(400).send('Missing id');
        else{
            try {
                const category = await Category.findByPk(id);
                if(!category) res.status(404).send('There is no registered categories with that id');
                else {
                    const categoryFinal = {
                        id: category.id,
                        name: category.name,
                        description: category.description,
                        img: category.img,
                        backgroundColor: category.backgroundColor,
                        color: category.color
                    }
                    res.json(categoryFinal);
                }
            } catch (error) {
                res.status(500).send(error);
            }
        }
    },
     
    getByName: async (req, res) => {
        const { name } = req.query;
        if(!name) res.status(400).send('Missing name');
        else{
            try {
                const category = await Category.findOne({
                    where: {
                        name: name.trim().toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
                    }
                });
                if(!category) res.status(404).send('There is no registered category with that name');
                else res.json(category);
            } catch (error) {
                res.status(500).send(error);
            }
        }
    },

    getWithProducts: async (req, res) => {
        const { id } = req.params;
        if(!id) res.status(400).send('Missing id');
        else{
            try {
                const category = await Category.findOne({
                    where: {id},
                    include: Product
                })
                if(!category) res.status(404).send('There is no registered category with that id');
                else res.json(category);
            } catch (error) {
                res.status(500).send(error);
            }
        }
    },

    post: async ( req, res ) =>  {
        const { name, description, img, backgroundColor, color } = req.body;

        if(!name || !description || !img || !backgroundColor || !color ) res.status(400).send('Missing parameters');
        else{
            const categoryReady = await Category.findOne({
                where: {
                    name: name.trim().toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
                }
            })
            if(!categoryReady){
                try {
                    const category = await Category.create({
                        name: name.trim().toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
                        description: description.trim(),
                        img: img.trim(),
                        backgroundColor: backgroundColor,
                        color: color
                    });
                    res.status(200).json(category);
                } catch (error) {
                    console.log(error);
                    res.status(500).send(error);
                }
            }else{
                res.status(400).json({
                    message: 'The category already exists'
                })
            }

        }
    },

    put: async (req, res) => {
        const { id } = req.params;
        const { name, description, img, backgroundColor, color } = req.body;

        if(!id || !name || !description || !img || !backgroundColor || !color ) res.status(400).send('Missing parameters');
        else{
            try {
                const category = await Category.findByPk(id);
                const categoryName = await Category.findAll({
                    where: {
                        name: name.trim().toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
                    }
                })
                categoryName.forEach(category => {
                    if(category.id != id) throw('There is allready a category with that name');
                });
                if(!category) res.status(404).send('There is no registered category with that id');
                else{
                    await Category.update({
                        name: name.trim().toLowerCase().replace(/\b\w/g, l => l.toUpperCase()),
                        description: description.trim(),
                        img: img,
                        backgroundColor: backgroundColor,
                        color: color
                    },{
                        where: { id }
                    })
                    res.status(200).send('Category updated');
                }
            } catch (error) {
                console.log(error);
                res.status(500).send(error);
            }
        }
    },

    delete: async (req, res) => {
        const { id } = req.params;
        if(!id) res.status(400).send('Missing id');
        else{
            try {
                const category = await Category.findByPk(id);
                if(!category) res.status(404).send('There is no registered category with that id');
                else{
                    await Category.destroy({
                        where: { id }
                    })
                    res.status(200).send('Category deleted');
                }
            } catch (error) {
                res.status(500).send(error);
            }
        }
    }
}