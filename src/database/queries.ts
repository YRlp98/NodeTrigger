
import { PrismaClient } from "@prisma/client";

export default class queries {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    };

    // Log the last row of the info table
    async logLastInfoTableRow(): Promise<void> {
        try {
            const lastInfoRow = await this.prisma.info.findFirst({
                orderBy: {
                    id: 'desc',
                }
            });
            console.log('Info table values:', lastInfoRow);
        } catch (error) {
            console.log(error);
        } finally {
            await this.prisma.$disconnect();
        }
    };

    // insert a new data for info table and related tables
    async insertData(): Promise<void> {
        try {
            const newInfoData = {
                name: 'Yousef',
                family: 'Roshandel',
                sex: 'Male',
                age: 25,
                pic: 'https://lixbjgupmbwyplqhzkde.supabase.in/storage/v1/object/sign/yrlp-storage/Images/Yousef_Roshandel.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ5cmxwLXN0b3JhZ2UvSW1hZ2VzL1lvdXNlZl9Sb3NoYW5kZWwud2VicCIsImlhdCI6MTYzODE5OTg4NSwiZXhwIjoxOTUzNTU5ODg1fQ.VKVFopNxk-Ewlr32JwQdmybEs9oPvsxP5OXNZrxjBNs',
                bio: '🚀',

                // Related tables
                contact_info: {
                    create: {
                        phone: '123-456-7890',
                        email: 'hello@yrlp.ir',
                    },
                },
                skills: {
                    create: {
                        name: 'Programming',
                        level: 1,
                        start_at: "1999-01-01T00:00:00Z"
                    },
                },
                links: {
                    create: {
                        name: 'LinkedIn',
                        url: 'https://www.linkedin.com/in/yrlp98',
                        about: 'Professional profile',
                    },
                },
                hobbies: {
                    create: {
                        name: 'Reading',
                    },
                },
            };

            // Insert a new entry for the info table
            await this.prisma.info.create({
                data: newInfoData,
            });

            console.log('New entry added to the info table:', newInfoData);
        } catch (error) {
            console.error(error);
        } finally {
            await this.prisma.$disconnect();
        }
    };
};