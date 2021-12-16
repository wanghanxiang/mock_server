import * as glob from 'glob'
import path from 'path'
import * as fs from 'fs'
import { mapPath, prefix } from '../constant/constants';

const routerMap = new Object({});

export const mockRouter = (router: any) => {
    let mockPath = path.resolve(__dirname, '.././mockdata', "**/*.json");
    // 注册路由
    glob.sync(mockPath).forEach((item, i) => {
        let mockJsonPath = item && item.split(prefix)[1];
        let mockPath = mockJsonPath.replace('.json', '');

        let jsonStr = fs.readFileSync(item).toString();
        const { mockdata, method } = JSON.parse(jsonStr);

        if (method == 'GET') {
            router.get(mockPath, (ctx: any, next: any) => {
                try {
                    ctx.body = mockdata;
                } catch (err) {
                    ctx.throw('服务器错误', 500);
                }
            });
        } else if (method == 'POST') {
            router.post(mockPath, (ctx: any, next: any) => {
                try {
                    ctx.body = mockdata;
                } catch (err) {
                    ctx.throw('服务器错误', 500);
                }
            });
        } else {
            console.info(`暂不支持类型`);
        }
        console.info(`注册的url ${mockPath}, 请求方法: ${method}`);

        // 记录路由
        //@ts-ignore
        routerMap[prefix + mockJsonPath] = prefix + mockPath;
    });
    createRouterMap(routerMap);
}

const createRouterMap = (routerMap_data: any) => {
    fs.writeFile(mapPath, JSON.stringify(routerMap_data, null, 2), err => {
        if (err) {
            console.log(err);
        } else {
            console.log('路由地图生成成功...')
        }
    });
}