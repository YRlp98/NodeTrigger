import DatabaseService from "./services/databaseService";
import queries from "./database/queries";

class App {
    private databaseService: DatabaseService;
    private userInfoQueries: queries;
    private insertData: queries;

    constructor() {
        this.databaseService = new DatabaseService();
        this.userInfoQueries = new queries();
        this.insertData = new queries();
    };

    private async logUserInfo() {
        try {
            await this.userInfoQueries.logLastInfoTableRow();
        } catch (error) {
            console.error('Error logging user info:', error);
        } finally {
            await this.databaseService.disconnect();
        }
    };

    private async insertNewData() {
        try {
            await this.userInfoQueries.insertData();
        } catch (error) {
            console.error('Error inserting new data:', error);
        } finally {
            await this.databaseService.disconnect();
        }
    };

    async run() {
        console.log('Running app...');

        await this.logUserInfo();
        // await this.insertNewData();
    };
}

const app = new App();
app.run();