/**
 * 自动根据mockdata生成markdown接口文档
 */
import json2md = require('json2md');
import * as glob from 'glob'
import path from 'path'
import * as fs from 'fs'
import { prefix } from '../constant/constants';
import { readFileSync, writeFileSync } from 'fs';


const MOCK_PATH = path.resolve(__dirname, '.././mockdata', "**/*.json");

//https://github.com/IonicaBizau/json2md
function obj2md() {
    let mdData = '## 接口文档  \n\n';
    glob.sync(MOCK_PATH).forEach((item, i) => {
        let mockJsonPath = item && item.split(prefix)[1];
        let mockPath = mockJsonPath.replace('.json', '');

        let jsonStr = fs.readFileSync(item).toString();
        const { mockdata, method, note, name } = JSON.parse(jsonStr);
        mdData += json2md([
            { h3: `${i + 1}. ${name} ` },
            { p: `**path**:  ${mockPath}` },
            { p: `**请求方式**:  ${method}` },
            { p: `**请求参数**:` },
            { p: `**备注**: \n ${note}` },
            { p: "**返回值**:" },
            { code: { "language": "javascript", "content": JSON.stringify(mockdata, null, "\t") } }
        ]);
    });
    writeFileSync(
        process.cwd() + '/src/util/接口文档.md',
        mdData
    );
}
