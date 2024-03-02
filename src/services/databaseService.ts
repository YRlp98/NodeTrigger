import { PrismaClient } from "@prisma/client";
import * as dotenv from 'dotenv';

dotenv.config();

export default class DatabaseService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async connect(): Promise<void> {
        await this.prisma.$connect();
    }

    async disconnect(): Promise<void> {
        await this.prisma.$disconnect();
    }
};