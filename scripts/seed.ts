const { PrismaClient } = require('@prisma/client')
const database = new PrismaClient();

async function main(){
    try{
        const categories = [
            {
                name: "IT & Software",
                subCategories: {
                    create:[
                        {name: "Web Development"},
                        {name: "Data Science"},
                        {name: "CyberSecurity"},
                        {name: "Others"}
                    ]
                }
            },
            {
                name: "Business",
                subCategories: {
                    create:[
                        {name: "E-Commerce"},
                        {name: "Marketing"},
                        {name: "Finance"},
                        {name: "Others"}                        
                    ],
                },
            },
            {
                name: "Design",
                subCategories: {
                    create: [
                        {name: "Interior Design"},
                        {name: "Graphic Design"},
                        {name: "3D & Animation"},
                        {name: "Others"}
                    ],
                },
            },
            {
                name: "Health",
                subCategories: {
                    create: [
                        {name: "Fitness"},
                        {name: "Yoga"},
                        {name: "Nutrition"},
                        {name: "Others"}
                    ],
                },
            },
        ];

        //Sequentially create each category with its subcategories
        for(const category of categories){
            await database.category.create({
                data:{
                    name: category.name,
                    subCategories: category.subCategories,
                },
                include: {
                    subCategories: true
                },
            });
        }

        await database.level.createMany({
            data:[
                {name: "Beginner"},
                {name: "Intermediate"},
                {name: "Advance"},
                {name: "All levels"}
            ],
        });
        console.log("Seeding Successfully")
    }catch(error){
        console.log("Seeding failed", error)
    } finally {
        await database.$disconnect();
    }
}

main();