import DatabaseService from "./services/databaseService";
import Queries from "./database/queries";

class App {
    private databaseService: DatabaseService;
    private queries: Queries;

    constructor() {
        this.databaseService = new DatabaseService();
        this.queries = new Queries();
    };

    private async logUserInfo() {
        try {
            await this.queries.logLastInfoTableRow();
        } catch (error) {
            console.error('Error logging user info:', error);
        } finally {
            await this.databaseService.disconnect();
        }
    };


    private async logLastLogTableRow() {
        try {
            await this.queries.logLastLogTableRow();
        } catch (error) {
            console.error('Error logging last log table row:', error);
        } finally {
            await this.databaseService.disconnect();
        }
    }

    private async logNewLogs() {
        try {
            await this.queries.logNewLogs();
        } catch (error) {
            console.error('Error logging new logs:', error);
        } finally {
            await this.databaseService.disconnect();
        }
    }

    private async insertNewData() {
        try {
            await this.queries.insertData();
        } catch (error) {
            console.error('Error inserting new data:', error);
        } finally {
            await this.databaseService.disconnect();
        }
    };

    async run() {
        console.log('Running app...');

        // await this.logUserInfo();

        setInterval(async () => {
            await this.logLastLogTableRow();
        }, 30000);

        // await this.insertNewData();
    };
}

const app = new App();
app.run();