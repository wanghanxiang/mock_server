import * as glob from 'glob'
import path from 'path'
import * as fs from 'fs'
import { mapPath, prefix } from '../constant/constants';

const routerMap = new Object({});

export const mockRouter = (router: any) => {
    let mockPath = path.resolve(__dirname, '.././mockdata', "**/*.json");
    console.info(mockPath)
    // 注册路由
    glob.sync(mockPath).forEach((item, i) => {
        let mockJsonPath = item && item.split(prefix)[1];
        let mockPath = mockJsonPath.replace('.json', '');

        router.get(mockPath, (ctx: any, next: any) => {
            try {
                let jsonStr = fs.readFileSync(item).toString();
                // ctx.body = {
                //   data: JSON.parse(jsonStr),
                //   state: 200,
                //   msg: 'success' // 自定义响应体
                // }
                ctx.body = JSON.parse(jsonStr);
            } catch (err) {
                ctx.throw('服务器错误', 500);
            }
        });

        // 记录路由
        //@ts-ignore
        routerMap[prefix + mockJsonPath] = prefix + mockPath;
    });
    console.info(`routerMap====>`, routerMap);
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