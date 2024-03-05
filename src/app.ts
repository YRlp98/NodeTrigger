import DatabaseService from "./services/databaseService";
import Queries from "./database/queries";

class App {
    private databaseService: DatabaseService;
    private queries: Queries;

    constructor() {
        this.databaseService = new DatabaseService();
        this.queries = new Queries();
        Queries.subscribeToNewLog(this.logNewLogs.bind(this));
    };

    private async logNewLogs() {
        try {
            await this.queries.logNewLogs();
        } catch (error) {
            console.error('Error logging new logs:', error);
        } finally {
            await this.databaseService.disconnect();
        }
    };

    async run() {
        console.log('Running app...');

        // Subscribe to the 'newLog' event
        Queries.subscribeToNewLog(this.logNewLogs.bind(this));
    };
}

const app = new App();
app.run();