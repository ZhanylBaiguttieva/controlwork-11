import {Router} from "express";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import Item from "../models/Item";
import item from "../models/Item";
import {Types} from "mongoose";

const itemsRouter = Router();

itemsRouter.post(
    '/',
    auth,
    imagesUpload.single('image'),
    async(req: RequestWithUser,res, next) => {
        try {
            const itemData = new Item( {
                user: req.user?._id,
                category: req.body.category,
                title: req.body.title,
                description: req.body.description,
                price: parseFloat(req.body.price),
                image: req.file ? req.file.filename : null,
            });

            await itemData.save();
            res.send({itemData});
        }   catch(e) {
            next(e);
        }
});

itemsRouter.get('/', async(req,res,next) => {
    const items = await Item.find();
    res.send(items);
});

itemsRouter.get('/:id', async(req,res, next) => {
    try {
        let _id: Types.ObjectId;
        try {
            _id = new Types.ObjectId(req.params.id);
        } catch {
            return res.status(404).send({error: 'Wrong ObjectId!'});
        }
        const item = await Item.findById(_id).populate('user', 'username displayName phone');

        if (!item) {
            return res.status(404).send({error: 'Not found!'});
        }

        res.send(item);
    } catch(e) {
        next(e);
    }
});

export default itemsRouter;