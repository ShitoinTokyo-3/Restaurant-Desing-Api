const { Category } = require('../../db');

module.exports = {

    getCarousel: async (req, res) => {
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
};