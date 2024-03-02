import mongoose from "mongoose";
import config from "./config";
import Category from "./models/Category";
import Item from "./models/Item";
import User from "./models/User";

const dropCollection = async (
    db: mongoose.Connection,
    collectionName: string,
) => {
    try {
        await db.dropCollection(collectionName);
    } catch (e) {
        console.log(`Collection ${collectionName} was missing, skipping drop...`);
    }
};
const run = async () => {
    await mongoose.connect(config.mongoose.db);
    const db = mongoose.connection;
    const collections = ['categories', 'items', 'users'];

    for (const collectionName of collections) {
        await dropCollection(db, collectionName);
    }

    const [accessories, gadgets,technics] = await Category.create(
        {
            title: 'Accessories',
        },
        {
            title: 'Gadgets',
        },
        {
            title: 'Technics',
        },
    );
    const user = await User.create({
        username: 'userZh',
        displayName: 'Zhanyl',
        phone:'+995778163537',
        password: '111',
        token: '3f3226f7-84fd-4b9a-a7c0-16802e6aaa7f',
    });
    await Item.create(
        {
            user: user,
            title: 'Magic Trackpad',
            description: 'It features a large edge-to-edge glass surface area, making scrolling and swiping through your favorite content more productive and comfortable than ever. Magic Trackpad pairs automatically with your Mac, so you can get to work right away.',
            price: 150,
            category: accessories,
            image: 'fixtures/MMMP3.png',
        },
        {
            user: user,
            title: 'MacBook Air 13” with M1 chip',
            description: 'MacBook Air with M1 is an incredibly portable laptop — it\'s nimble and quick, with a silent, fanless design and a beautiful Retina display. Thanks to its slim profile and all‑day battery life, this Air moves at the speed of lightness. Small chip. Giant leap.',
            price: 800,
            category: technics,
            image: 'fixtures/macbook.png',
        },
        {
            user: user,
            title: 'Apple Watch Ultra 2',
            description: 'Custom Apple silicon makes Apple Watch Ultra 2 more capable, easier to use, and faster. The new dual-core CPU has 5.6 billion transistors — 60 percent more than the previous generation. A new four-core Neural Engine processes machine learning tasks up to two times faster.',
            price: 220,
            category: gadgets,
            image: 'fixtures/food.png',
        },
    );

    await db.close();
};

void run();