#!/usr/bin/env node
import axios from "axios";
import argParse from "minimist";
import {should,expect,assert} from "chai";
import * as fs from "fs";
import {join} from "path";
should();
const args = argParse((process.argv.slice(2) ),{alias:{a:'api',u:'url',file:'body',post:'body' , p:'body',b:'body'}})
const {log, error: err} = console
args.url = args.url || `http://localhost:4000`
args.should.have.property('api')
args.should.have.property('body')

const requestUrl=`${args.url}${args.api}/${args.id}`

const file= args.body
const body = JSON.parse(fs.readFileSync(file, 'utf-8').toString())

;(async ()=>
{
    const response = await axios.post(requestUrl,body)
    log(`Request: PUT ${requestUrl} on data: \n${JSON.stringify(body,null,3)}`)
    log(`Response status: ${response.status}`)
    log(`Response data: ${JSON.stringify(response.data,null,3)}`)
})()