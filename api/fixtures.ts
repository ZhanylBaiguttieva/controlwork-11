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
    const [user, user2] = await User.create(
        {
            username: 'userZh',
            displayName: 'Zhanyl',
            phone:'+995778163537',
            password: '111',
            token: '3f3226f7-84fd-4b9a-a7c0-16802e6aaa7f',
        },
        {
            username: 'user2',
            displayName: 'TestUser',
            phone:'+995778193500',
            password: '222',
            token: 'aa16e0a5-c260-48cb-914a-5ebc7803db88',
        }
    );
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
            user: user2,
            title: 'Apple Watch Ultra 2',
            description: 'Custom Apple silicon makes Apple Watch Ultra 2 more capable, easier to use, and faster. The new dual-core CPU has 5.6 billion transistors — 60 percent more than the previous generation. A new four-core Neural Engine processes machine learning tasks up to two times faster.',
            price: 220,
            category: gadgets,
            image: 'fixtures/watch.png',
        },
        {
            user: user2,
            title:'Sumsung S22',
            description: 'The Samsung Galaxy S22 specs are top-notch including a Snapdragon 8 Gen 1 chipset, 8GB RAM coupled with 128/256GB storage, and a 3700mAh battery with 25W charging speed. ',
            price: 320,
            category: technics,
            image: 'fixtures/galaxy22.png',
        }
    );

    await db.close();
};

void run();