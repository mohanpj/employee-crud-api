import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as cors from 'cors';

import { IAppConfig, IRouteDescription } from './interfaces/index.d';

export default class Application {
    private app: express.Express = express();
    constructor(
        private config: IAppConfig,
        private routes: IRouteDescription[],
    ) { }

    public start(): void {
        this.initMiddleware();
        this.initRoutes(this.routes);

        // 404 handler (should be the last middleware)
        this.app.use((req, res, next) => {
            res.status(404).send("Sorry can't find that!");
        });

        this.app.listen(this.config.port, 'localhost', () => {
            // tslint:disable-next-line:no-console
            console.log(`Server is runing on port ${this.config.port}`);
        });
    }

    private initMiddleware(): void {
        this.app.options('*', cors());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
    }

    private initRoutes(routes: IRouteDescription[]): void {
        routes.forEach((route) => {
            this.app.use(route.path, route.router);
        });
    }
}