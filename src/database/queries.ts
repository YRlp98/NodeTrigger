
import { PrismaClient } from "@prisma/client";

export default class Queries {
    private prisma: PrismaClient;
    private lastLogId: number | null

    constructor() {
        this.prisma = new PrismaClient();
        this.lastLogId = null;
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

    // Log the last row of the logs table
    async logLastLogTableRow(): Promise<void> {
        try {
            const lastLogRow = await this.prisma.logs.findFirst({
                orderBy: {
                    id: 'desc',
                }
            });

            if (lastLogRow) {
                console.log('Last log table row:', lastLogRow);
                this.lastLogId = lastLogRow.id;
            } else {
                console.log('Log table is empty');
            }
        } catch (error) {
            console.log(error);
        } finally {
            await this.prisma.$disconnect();
        }
    };

    // Log the logs table, only new entries since the last check
    async logNewLogs(): Promise<void> {
        try {
            let logsTableData = [];

            if (this.lastLogId !== null) {
                logsTableData = await this.prisma.logs.findMany({
                    where: {
                        id: {
                            gt: this.lastLogId,
                        },
                    },
                });
            } else {
                // If lastLogId is null, log all entries
                logsTableData = await this.prisma.logs.findMany();
            }

            if (logsTableData.length > 0) {
                for (const log of logsTableData) {
                    console.log('New log:', log);

                    // Update lastLogId to the latest log ID
                    this.lastLogId = log.id;
                }
            } else {
                console.log('No new logs');
            }
        } catch (error) {
            console.log('Error checking logs table', error);
        }
    };

    // insert a new data for info table and related tables
    async insertData(): Promise<void> {
        try {
            const newInfoData = {
                first_name: 'Yousef',
                last_name: 'Roshandel',
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