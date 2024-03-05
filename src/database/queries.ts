
import { PrismaClient } from "@prisma/client";
import { EventEmitter } from "events";

export default class Queries {
    private prisma: PrismaClient;
    private lastLogId: number | null;
    private static eventEmitter = new EventEmitter();

    constructor() {
        this.prisma = new PrismaClient();
        this.lastLogId = null;
        setInterval(() => this.logNewLogs(), 5000);
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

                    // Check if the log has already been processed
                    if (typeof log.id === 'number' && typeof this.lastLogId === 'number' && log.id <= this.lastLogId) {
                        continue;
                    }

                    console.log('New log:', log);

                    // Emit an event for each new log
                    Queries.eventEmitter.emit('newLog', log);

                    // Update lastLogId to the latest log ID
                    this.lastLogId = log.id;
                }
            } else {
                console.log('No new logs');
            }
        } catch (error) {
            console.log('Error checking logs table', error);
        } finally {
            await this.prisma.$disconnect();
        }
    }

    // Subscribe to the 'newLog' event
    static subscribeToNewLog(callback: (log: any) => void): void {
        this.eventEmitter.on('newLog', callback);
    }
};
